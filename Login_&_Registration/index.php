<?php
session_start();

//if logged in, redirect to dashboard
if(isset($_SESSION['username'])){
	header("Location: dashboard.php");
	exit();
}

?>
<!doctype html>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<style>
		body{font-family: arial;}
		.container{width: 300px; margin: auto;}
		.box {border: 1px solid #ddd; padding: 20px; margin-top: 20px;}
		input{width: 100%; margin-bottom: 10px}
	</style>
	<title>Login/Register</title>
</head>
<body>
	<div class="container">
		<h2>Login</h2>
		<div class="box">
			<form action="auth.php" method="post">
				<input type="hidden" name="action" value="login">
				<input type="text" name="username" placeholder="enter username" required>
				<input type="password" name="password" placeholder="enter password" required>
				<button type="submit">Login</button>
			</form>
		</div>
		<h2>Register</h2>
		<div class="box">
			<form action="auth.php" method="post">
				<input type="hidden" name="action" value="register">
				<input type="text" name="username" placeholder="create username" required>
				<input type="password" name="password" placeholder=" create new password" required>
				<button type="submit">Register</button>
			</form>
		</div>
	</div>
</body>
</html>
