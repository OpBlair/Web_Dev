<?php session_start(); ?>
<!DOCTYPE html>
<html>
<head>
    <title>Register</title>
</head>
<body>

<h2>Register</h2>

<?php
if (isset($_SESSION['reg_error'])) {
    echo "<p style='color:red'>" . $_SESSION['reg_error'] . "</p>";
    unset($_SESSION['reg_error']);
}
?>

<form method="POST" action="save_user.php">
    <label>Email:</label><br>
    <input type="email" name="email" required><br><br>

    <label>Username:</label><br>
    <input type="text" name="username" required><br><br>

    <label>Password:</label><br>
    <input type="password" name="password" required><br><br>

    <button type="submit">Register</button>
</form>

<p>Already have an account? <a href="login.php">Login here</a></p>

</body>
</html>
