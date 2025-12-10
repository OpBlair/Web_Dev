<?php
session_start();

$email = trim($_POST['email']);
$username = trim($_POST['username']);
$password = trim($_POST['password']);

// Basic validation
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $_SESSION['reg_error'] = "Invalid email format.";
    header("Location: register.php");
    exit();
}

if (strlen($password) < 6) {
    $_SESSION['reg_error'] = "Password must be at least 6 characters.";
    header("Location: register.php");
    exit();
}

// Load existing users
$users = json_decode(file_get_contents("users.json"), true);

// Check if user exists
foreach ($users as $user) {
    if ($user['email'] === $email) {
        $_SESSION['reg_error'] = "Email is already registered.";
        header("Location: register.php");
        exit();
    }
}

// Add new user
$newUser = [
    "email" => $email,
    "username" => $username,
    "password" => password_hash($password, PASSWORD_DEFAULT)
];

$users[] = $newUser;

// Save to JSON file
file_put_contents("users.json", json_encode($users, JSON_PRETTY_PRINT));

$_SESSION['reg_success'] = "Registration successful! You can now log in.";
header("Location: login.php");
exit();
