<?php 
header('Content-Type: application/json');
require_once 'db_logic.php';

if($_SERVER['REQUEST_METHOD'] !== 'POST'){
    die("Invalid request");
}

$email = trim($_POST['email'] ?? '');

if(empty($email)){
    echo json_encode(['exists' => false]);
    exit;
}

$stmt = $pdo->prepare(
    "SELECT user_id FROM users WHERE email = ? LIMIT 1"
);
$stmt->execute([$email]);

echo json_encode([
    'exists' => (bool) $stmt->fetch()
]);
?>
