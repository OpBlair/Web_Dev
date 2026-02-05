<?php 
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register | Blog</title>
</head>
<body>
    <div class="register">
        <h2>Create Account</h2>
        <form action="../backend/register_handler.php" method="post" style="display:flex; flex-direction:column; gap:15px;">
            <input type="text" name="first_name" placeholder="first name">
            <input type="text" name="last_name" placeholder="last name">
            <input type="email" name="email" placeholder="email">
            <input type="password" name="password" placeholder="enter new password">
            <input type="password" name="confirm_password" placeholder="confirm password">

            <button type="submit">Register</button>
        </form>
        <p style="font-size: 0.8rem;">Already have an account ? <a href="login.php">Login</a></p>
    </div>
</body>
</html>
