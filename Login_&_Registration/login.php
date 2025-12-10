<?php session_start(); ?>
<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
</head>
<body>

<h2>Login</h2>

<?php
if (isset($_SESSION['error'])) {
    echo "<p style='color:red'>" . $_SESSION['error'] . "</p>";
    unset($_SESSION['error']);
}

if (isset($_SESSION['reg_success'])) {
    echo "<p style='color:green'>" . $_SESSION['reg_success'] . "</p>";
    unset($_SESSION['reg_success']);
}
?>

<form method="POST" action="authenticate.php">
    <label>Email:</label><br>
    <input type="email" name="email" required><br><br>

    <label>Password:</label><br>
    <input type="password" name="password" required><br><br>

    <button type="submit">Login</button>
</form>

<p>Don't have an account? <a href="register.php">Register here</a></p>

</body>
</html>
