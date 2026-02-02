<?php
// backend/api/get-stats.php

header("Content-Type: application/json");

require_once __DIR__ . '/../config/db.php';

// ==========================
// Validate Input
// ==========================
$userId = isset($_GET["user_id"]) ? (int)$_GET["user_id"] : 0;

if ($userId <= 0) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Invalid or missing user_id"
    ]);
    exit;
}

try {
    // ----------------------
    // Total Scans
    // ----------------------
    $stmt = $pdo->prepare(
        "SELECT COUNT(*) FROM scans WHERE user_id = ?"
    );
    $stmt->execute([$userId]);
    $totalScans = (int)$stmt->fetchColumn();

    // ----------------------
    // Active Scans
    // ----------------------
    $stmt = $pdo->prepare(
        "SELECT COUNT(*) FROM scans 
         WHERE user_id = ? AND status = 'active'"
    );
    $stmt->execute([$userId]);
    $activeScans = (int)$stmt->fetchColumn();

    // ----------------------
    // Completed Scans
    // ----------------------
    $stmt = $pdo->prepare(
        "SELECT COUNT(*) FROM scans 
         WHERE user_id = ? AND status = 'completed'"
    );
    $stmt->execute([$userId]);
    $completed = (int)$stmt->fetchColumn();

    // ----------------------
    // Assessments
    // ----------------------
    $stmt = $pdo->prepare(
        "SELECT COUNT(*) FROM assessments WHERE user_id = ?"
    );
    $stmt->execute([$userId]);
    $assessments = (int)$stmt->fetchColumn();

    // ----------------------
    // Security Score
    // ----------------------
    $stmt = $pdo->prepare(
        "SELECT AVG(score) FROM assessments WHERE user_id = ?"
    );
    $stmt->execute([$userId]);
    $score = (int) round($stmt->fetchColumn() ?: 0);

    echo json_encode([
        "success" => true,
        "data" => [
            "total_scans"    => $totalScans,
            "active_scans"   => $activeScans,
            "completed"      => $completed,
            "assessments"    => $assessments,
            "security_score" => $score
        ]
    ]);

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to load stats"
    ]);
}
