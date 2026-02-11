<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog | Login</title>
    <link rel="stylesheet" href="blogSystem.css">
</head>
<body class="auth-wrapper">
    <div class="auth-card">
        <h2>Welcome Back</h2>
        <p>Enter your credentials to access your account</p>
        <form action="../backend/login_handler.php" method="post" class="auth-form" >
            <input type="email" placeholder="email" name="email" id="email" >
            <input type="password" placeholder="enter password" name="password" id="password" >

            <button type="submit" id="loginBtn" class="auth-btn">Login</button>
             <p id="emailError" style="color:var(--danger); display:none; margin-top: 10px;">
                Invalid email or password
            </p>
        </form>
        <div class="auth-footer">
            Don't have an account ? <a href="register.php">Create Account</a>
        </div>
    </div>
</body>
</html>
