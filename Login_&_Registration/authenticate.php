<?php
session_start();

$email = trim($_POST['email']);
$password = trim($_POST['password']);

// Load users
$users = json_decode(file_get_contents("users.json"), true);

$found = false;

foreach ($users as $user) {
    if ($user['email'] === $email && password_verify($password, $user['password'])) {
        $found = $user;
        break;
    }
}

if ($found) {
    $_SESSION['logged_in'] = true;
    $_SESSION['username'] = $found['username'];

    header("Location: dashboard.php");
    exit();
} else {
    $_SESSION['error'] = "Invalid email or password.";
    header("Location: login.php");
    exit();
}
