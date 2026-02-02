<?php
// backend/api/submit.php

header("Content-Type: application/json");

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../utils/score.php';

// ==========================
// Read Input Safely
// ==========================
$raw  = file_get_contents("php://input");
$data = json_decode($raw, true);

if (!is_array($data) || !isset($data["answers"]) || !is_array($data["answers"])) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Invalid payload. Expected { answers: [...] }"
    ]);
    exit;
}

$answers = $data["answers"];
if (count($answers) === 0) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "No answers submitted"
    ]);
    exit;
}

// ==========================
// Validate Answers Structure
// ==========================
$cleanAnswers = [];
$qids = [];

foreach ($answers as $a) {
    $qid = isset($a["question_id"]) ? (int)$a["question_id"] : 0;
    $sel = isset($a["selected"]) ? (int)$a["selected"] : 0;

    if ($qid <= 0 || $sel <= 0) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "Invalid answer format detected"
        ]);
        exit;
    }

    $cleanAnswers[] = [
        "question_id" => $qid,
        "selected"    => $sel
    ];

    $qids[$qid] = true;
}

$qids = array_keys($qids);

// ==========================
// Database Processing
// ==========================
try {
    $pdo->beginTransaction();

    // ---- Load Questions ----
    $placeholders = implode(",", array_fill(0, count($qids), "?"));

    $stmt = $pdo->prepare(
        "SELECT id, max_weight 
         FROM questions 
         WHERE id IN ($placeholders)"
    );
    $stmt->execute($qids);

    $qmap = [];
    foreach ($stmt->fetchAll() as $row) {
        $qmap[(int)$row["id"]] = (float)$row["max_weight"];
    }

    if (count($qmap) !== count($qids)) {
        throw new Exception("Some questions not found");
    }

    // ---- Load Options ----
    $optStmt = $pdo->prepare(
        "SELECT id, weight 
         FROM options 
         WHERE question_id = ?"
    );

    $optMap = [];
    foreach ($qids as $qid) {
        $optStmt->execute([$qid]);
        $rows = $optStmt->fetchAll();

        if (!$rows) {
            throw new Exception("Options missing for question");
        }

        foreach ($rows as $o) {
            $optMap[$qid][(int)$o["id"]] = (float)$o["weight"];
        }
    }

    // ---- Create Submission ----
    $pdo->prepare(
        "INSERT INTO submissions (user_id, total_score, percentage, grade)
         VALUES (0, 0, 0, '')"
    )->execute();

    $submissionId = (int)$pdo->lastInsertId();

    $insAns = $pdo->prepare(
        "INSERT INTO submission_answers
            (submission_id, question_id, selected_option_id, weight)
         VALUES (?, ?, ?, ?)"
    );

    // ---- Scoring ----
    $totalScore = 0.0;
    $maxTotal   = 0.0;
    $details    = [];

    foreach ($cleanAnswers as $a) {
        $qid = $a["question_id"];
        $sel = $a["selected"];

        if (!isset($optMap[$qid][$sel])) {
            throw new Exception("Invalid option selected");
        }

        $weight = $optMap[$qid][$sel];
        $max    = $qmap[$qid];

        $totalScore += $weight;
        $maxTotal   += $max;

        $insAns->execute([
            $submissionId,
            $qid,
            $sel,
            $weight
        ]);

        $details[] = [
            "qid"      => $qid,
            "selected" => $sel,
            "weight"   => $weight,
            "max"      => $max
        ];
    }

    $percentage = $maxTotal > 0 ? ($totalScore / $maxTotal) * 100 : 0;
    $percentage = max(0, min(100, round($percentage, 2)));
    $grade      = calculateGrade($percentage);

    // ---- Update Submission ----
    $pdo->prepare(
        "UPDATE submissions
         SET total_score = ?, percentage = ?, grade = ?
         WHERE id = ?"
    )->execute([
        $totalScore,
        $percentage,
        $grade,
        $submissionId
    ]);

    $pdo->commit();

    echo json_encode([
        "success"     => true,
        "result_id"   => $submissionId,
        "total_score" => $totalScore,
        "max_total"   => $maxTotal,
        "percentage"  => $percentage,
        "grade"       => $grade,
        "details"     => $details
    ]);

} catch (Throwable $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Submission failed"
    ]);
}
