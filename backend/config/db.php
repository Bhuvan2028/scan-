<?php
// backend/config/db.php

header("Content-Type: application/json");

// ==========================
// Environment Configuration
// ==========================

$host     = getenv("DB_HOST") ?: "127.0.0.1";
$dbname   = getenv("DB_NAME") ?: "cyber_assessment";
$username = getenv("DB_USER") ?: "root";      // local fallback
$password = getenv("DB_PASS") ?: "";          // local fallback

// ==========================
// Database Connection
// ==========================

try {
    $pdo = new PDO(
        "mysql:host={$host};dbname={$dbname};charset=utf8mb4",
        $username,
        $password,
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed"
    ]);
    exit;
}
