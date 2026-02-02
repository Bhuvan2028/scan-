<?php
// backend/index.php - Simple Router for the Assessment Backend

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

$request = $_SERVER['REQUEST_URI'];
$basePath = '/api';

// Strip query string
$request = explode('?', $request)[0];

// Remove base path from request if present
if (str_starts_with($request, $basePath)) {
    $request = substr($request, strlen($basePath));
}

// Route mapping
switch ($request) {
    case '/questions':
        require __DIR__ . '/api/get-questions.php';
        break;
        
    case '/assess':
        require __DIR__ . '/api/save-assessment.php';
        break;
        
    case '/assess/history':
        require __DIR__ . '/api/get-assessment-history.php';
        break;
        
    default:
        // Try to find the file directly in api folder if not matched above
        $filePath = __DIR__ . '/api' . $request;
        if (file_exists($filePath)) {
            require $filePath;
        } else if (file_exists($filePath . '.php')) {
            require $filePath . '.php';
        } else {
            http_response_code(404);
            echo json_encode(["success" => false, "message" => "Route not found: " . $request]);
        }
        break;
}
