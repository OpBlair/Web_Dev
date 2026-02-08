<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register | Blog</title>
    <link rel="stylesheet" href="blogSystem.css">
</head>
<body class="auth-wrapper">
    <div class="auth-card">
        <h2>Create Account</h2>
        <p>Join our community of writers and readers</p>
        <form action="../backend/register_handler.php" method="post" class="auth-form">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <input type="text" name="first_name" placeholder="first name">
                <input type="text" name="last_name" placeholder="last name">
            </div>
            <input type="email" name="email" placeholder="email">
            <input type="password" name="password" placeholder="enter new password">
            <input type="password" name="confirm_password" placeholder="confirm password">

            <button type="submit" class="auth-btn">Register</button>
        </form>
        <div class="auth-footer">
            Already have an account ? <a href="login.php">Login</a>
        </div>
    </div>
</body>
</html>
