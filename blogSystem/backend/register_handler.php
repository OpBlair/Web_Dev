<?php 
require_once 'db_logic.php';

if($_SERVER['REQUEST_METHOD'] !== 'POST'){
    die("Invalid request method");
}

$firstName = trim($_POST['first_name'] ?? '');
$lastName = trim($_POST['last_name'] ?? '');
$email = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';
$confirm = $_POST['confirm_password'] ?? '';

// ----- VALIDATION OF FORM DATA ------
if(
    empty($firstName) || empty($lastName) || empty($email) || empty($password) || empty($confirm)
){
    die("All fields are required.");
}
//------ VALIDATE EMAIL FORMAT -------
if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
    die("Invalid email address.");
}

// ------ PASSWORD RULES ---------
if(strlen($password) < 6){
    die("Password must be at least 6 characters long");
}

if($password !== $confirm){
    die("Passwords do not match");
}

// ------- CHECK IF USER EXISTS ALREADY -------
$stmt = $pdo->prepare(
    "SELECT user_id FROM users WHERE email = ? LIMIT 1"
);

$stmt->execute([$email]);

if($stmt->fetch()){
    die("An account with email already exists.");
}

// ------- HASH PASSWORD -------
$passwordHash = password_hash($password, PASSWORD_DEFAULT);

// -------- INSERT USER INTO DATABASE ------
$stmt = $pdo->prepare(
    "INSERT INTO users(first_name, last_name, email, password_hash, role)
    VALUES (?, ?, ?, ?, 'reader')"
);

$stmt->execute([
    $firstName, $lastName, $email, $passwordHash
]);

echo "Registration successful. You can now log in.";
?>
