<?php
// backend/api/save-assessment.php

header("Content-Type: application/json");

require_once __DIR__ . '/../config/db.php';

// ==========================
// Read JSON Input Safely
// ==========================
$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Invalid JSON payload"
    ]);
    exit;
}

$answers = $data["answers"] ?? null;

if (!is_array($answers) || count($answers) === 0) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "No answers provided"
    ]);
    exit;
}

// ==========================
// Calculate Score Safely
// ==========================
$score = 0;
$validAnswers = ["Yes" => 3, "Mostly" => 2, "Sometimes" => 1, "No" => 0];

foreach ($answers as $ans) {
    if (!isset($validAnswers[$ans])) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "Invalid answer value detected"
        ]);
        exit;
    }
    $score += $validAnswers[$ans];
}

$maxScore = count($answers) * 3;
$percentage = (int) round(($score / $maxScore) * 100);

// ==========================
// Insert into Database (Safe)
// ==========================
try {
    $pdo->beginTransaction();

    $stmt = $pdo->prepare("
        INSERT INTO assessments (score, details)
        VALUES (:score, :details)
    ");

    $stmt->execute([
        ":score" => $percentage,
        ":details" => json_encode($answers, JSON_THROW_ON_ERROR)
    ]);

    $assessment_id = $pdo->lastInsertId();
    $pdo->commit();

    echo json_encode([
        "success" => true,
        "score" => $percentage,
        "assessment_id" => (int) $assessment_id
    ]);

} catch (Throwable $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to save assessment"
    ]);
}
