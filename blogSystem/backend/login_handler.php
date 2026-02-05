<?php 
require_once 'db_logic.php';

if($_SERVER['REQUEST_METHOD'] !== 'POST'){
    die("Invalid request method.");
}

$email = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';

if(empty($email) || empty($password)){
    die("All fields are required.");
}

// ---- FETCH USER BY EMAIL -----
$stmt = $pdo->prepare(
    "SELECT user_id, password_hash, role
    FROM users
    WHERE email = ?
    LIMIT 1"
);
$stmt->execute([$email]);

$user = $stmt->fetch(PDO::FETCH_ASSOC);

if(!$user){
    die("Invalid email or password");
}

if(!password_verify($password, $user['password_hash'])){
    die("Invalid email or password");
}

// ---- LOGIN USER BY STARTING SESSION -----
session_start();

$_SESSION['user'] = [
    'user_id' => $user['user_id'],
    'email' => $email,
    'role' => $user['role']
];

// ---- REDIRECT AFTER LOGIN ------
header("Location: ../frontend/index.php");
exit;
?>
