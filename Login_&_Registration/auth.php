<?php
session_start();

//load users.json which is the database
$json = file_get_contents("users.json");
$data = json_decode($json, true);

//check if user exists
if(!isset($data['users'])){
	$data['users'] = [];
}

$action = $_POST['action'];

//Register
if($action === "register"){
	$username = trim($_POST["username"]);
	$password = trim($_POST["password"]);

	//check if username already exists
	foreach($data['users'] as $user){
		if($user['username'] === $username){
			echo "<script>alert('Username already exists'); window.location='index.php';</script>";
			exit();
		}
	}

	//hash the password and save user
	$data['users'][] = [
		"username" => $username,
		"password" => password_hash($password, PASSWORD_DEFAULT)
	];

	//save to json file
	file_put_contents("users.json", json_encode($data, JSON_PRETTY_PRINT));

	echo "<script>alert('Registration successful! You can now log in.'); window.location='index.php';</script>";
	exit();	
}

//LOGIN	
if($action === "login"){
	$username = $_POST["username"];
	$password = $_POST["password"];

	foreach($data['users'] as $user){
		if($user['username'] === $username && password_verify($password, $user['password'])){
			$_SESSION['username'] = $username;
			header("Location: dashboard.php");
			exit();
		}
	}
	echo "<script>alert('Invalid username or password!'); window.location='index.php';</script>";
	exit();
}
?>
