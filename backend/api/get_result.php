<?php
// backend/api/get_result.php

header("Content-Type: application/json");

require_once __DIR__ . '/../config/db.php';

// ==========================
// Validate Input
// ==========================
$id = isset($_GET["id"]) ? (int)$_GET["id"] : 0;

if ($id <= 0) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Invalid or missing result id"
    ]);
    exit;
}

// ==========================
// Fetch Result Safely
// ==========================
try {
    // ---- Load submission ----
    $stmt = $pdo->prepare(
        "SELECT 
            id,
            user_id,
            total_score,
            percentage,
            grade,
            created_at
         FROM submissions
         WHERE id = ?"
    );
    $stmt->execute([$id]);
    $submission = $stmt->fetch();

    if (!$submission) {
        http_response_code(404);
        echo json_encode([
            "success" => false,
            "message" => "Submission not found"
        ]);
        exit;
    }

    // ---- Load answers ----
    $ansStmt = $pdo->prepare(
        "SELECT 
            sa.question_id,
            sa.selected_option_id,
            sa.weight,
            o.option_text
         FROM submission_answers sa
         LEFT JOIN options o 
            ON sa.selected_option_id = o.id
         WHERE sa.submission_id = ?
         ORDER BY sa.id ASC"
    );

    $ansStmt->execute([$id]);
    $answers = $ansStmt->fetchAll();

    echo json_encode([
        "success"    => true,
        "submission" => [
            "id"          => (int)$submission["id"],
            "user_id"     => $submission["user_id"],
            "total_score" => (float)$submission["total_score"],
            "percentage"  => (float)$submission["percentage"],
            "grade"       => $submission["grade"],
            "created_at"  => $submission["created_at"]
        ],
        "answers" => array_map(function ($a) {
            return [
                "question_id"       => (int)$a["question_id"],
                "selected_option_id"=> (int)$a["selected_option_id"],
                "weight"            => (float)$a["weight"],
                "option_text"       => $a["option_text"]
            ];
        }, $answers)
    ]);

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to load result"
    ]);
}
