<?php
// backend/api/save-response.php

header("Content-Type: application/json");

require_once __DIR__ . '/../config/db.php';

// ==========================
// Read Input Safely
// ==========================
$raw  = file_get_contents("php://input");
$data = json_decode($raw, true);

if (!is_array($data)) {
    // fallback for form-encoded
    $data = $_POST;
}

$user_id     = isset($data["user_id"]) ? trim($data["user_id"]) : null;
$question_id = isset($data["question_id"]) ? (int)$data["question_id"] : 0;
$option_key  = isset($data["option_key"]) ? trim($data["option_key"]) : "";

// ==========================
// Validate Input
// ==========================
if ($question_id <= 0) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Invalid question_id"
    ]);
    exit;
}

if ($option_key === "" || strlen($option_key) > 32) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Invalid option_key"
    ]);
    exit;
}

// Normalize user_id
if ($user_id === "") {
    $user_id = null;
}

// ==========================
// DB Transaction
// ==========================
try {
    $pdo->beginTransaction();

    // Lookup option score
    $stmt = $pdo->prepare(
        "SELECT score 
         FROM options 
         WHERE question_id = :qid 
           AND option_key = :opt
         LIMIT 1"
    );

    $stmt->execute([
        ":qid" => $question_id,
        ":opt" => $option_key
    ]);

    $opt = $stmt->fetch();

    if (!$opt) {
        $pdo->rollBack();
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "Invalid question_id or option_key"
        ]);
        exit;
    }

    $score = (int)$opt["score"];

    // Insert response
    $stmt = $pdo->prepare(
        "INSERT INTO responses 
            (user_id, question_id, option_key, score)
         VALUES
            (:uid, :qid, :opt, :score)"
    );

    $stmt->execute([
        ":uid"   => $user_id,
        ":qid"   => $question_id,
        ":opt"   => $option_key,
        ":score" => $score
    ]);

    $responseId = (int)$pdo->lastInsertId();

    $pdo->commit();

    echo json_encode([
        "success"     => true,
        "score"       => $score,
        "response_id" => $responseId
    ]);

} catch (Throwable $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to save response"
    ]);
}
