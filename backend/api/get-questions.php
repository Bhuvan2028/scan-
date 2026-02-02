<?php
// backend/api/get-questions.php

header("Content-Type: application/json");

require_once __DIR__ . '/../config/db.php';

try {
    $sql = "
        SELECT 
            q.id,
            q.category_id,
            q.question_text,
            c.title AS category_title
        FROM questions q
        JOIN categories c 
            ON c.id = q.category_id
        ORDER BY q.id ASC
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    $rows = $stmt->fetchAll();

    $questions = array_map(function ($q) {
        return [
            "id"             => (int)$q["id"],
            "category_id"    => (int)$q["category_id"],
            "question_text"  => $q["question_text"],
            "category_title" => $q["category_title"]
        ];
    }, $rows);

    echo json_encode([
        "success"   => true,
        "questions" => $questions
    ]);

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to load questions"
    ]);
}
