<?php
// backend/api/get-assessment-history.php

header("Content-Type: application/json");

require_once __DIR__ . '/../config/db.php';

try {
    $sql = "
        SELECT id, score, details, created_at
        FROM assessments
        ORDER BY created_at DESC
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    $rows = $stmt->fetchAll();

    $assessments = [];

    foreach ($rows as $r) {
        $score = (int)$r["score"];

        $assessments[] = [
            "id" => (int)$r["id"],
            "overallScore" => $score,
            "overallGrade" =>
                $score >= 90 ? "A+" :
                ($score >= 80 ? "A" :
                ($score >= 70 ? "B" :
                ($score >= 60 ? "C" : "D"))),
            "completedAt" => $r["created_at"],
            "sections" => json_decode($r["details"], true),
        ];
    }

    echo json_encode([
        "success" => true,
        "assessments" => $assessments
    ]);

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to load assessments"
    ]);
}
