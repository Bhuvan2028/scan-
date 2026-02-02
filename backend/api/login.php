<?php
session_start();
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "cyber_assessment");

$data = json_decode(file_get_contents("php://input"), true);

$email = $data["email"] ?? "";
$password = $data["password"] ?? "";

$stmt = $conn->prepare("SELECT id, password_hash, role FROM users WHERE email=? AND is_active=1");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($user = $result->fetch_assoc()) {
  if (password_verify($password, $user["password_hash"])) {
    $_SESSION["user_id"] = $user["id"];
    $_SESSION["role"] = $user["role"];

    echo json_encode(["success" => true]);
    exit;
  }
}

echo json_encode([
  "success" => false,
  "message" => "Invalid email or password"
]);
