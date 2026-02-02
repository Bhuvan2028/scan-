<?php
// backend/api/get-assessment-details.php

header("Content-Type: application/json");

require_once __DIR__ . '/../config/db.php';

$id = $_GET["id"] ?? null;

// ==========================
// Validate Input
// ==========================
if (!$id || !ctype_digit($id)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Invalid or missing assessment ID"
    ]);
    exit;
}

// ==========================
// Fetch Assessment
// ==========================
try {
    $stmt = $pdo->prepare(
        "SELECT id, score, details, created_at
         FROM assessments
         WHERE id = :id"
    );

    $stmt->execute([":id" => $id]);
    $row = $stmt->fetch();

    if (!$row) {
        http_response_code(404);
        echo json_encode([
            "success" => false,
            "message" => "Assessment not found"
        ]);
        exit;
    }

    echo json_encode([
        "success" => true,
        "assessment" => [
            "id" => (int)$row["id"],
            "score" => (int)$row["score"],
            "details" => json_decode($row["details"], true),
            "created_at" => $row["created_at"]
        ]
    ]);

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to load assessment"
    ]);
}
