<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog | Login</title>
</head>
<body>
    <div class="login">
        <h2>Login</h2>
        <form action="../backend/login_handler.php" method="post" style="display:flex; flex-direction:column; gap:15px;" >
            <input type="email" placeholder="email" name="email" id="email" >
            <input type="password" placeholder="enter password" name="password" id="password" >

            <button type="submit" id="loginBtn">Login</button>
             <p id="emailError" style="color:red; display:none;">
                Invalid email
            </p>
        </form>
        <p style="font-size: 0.8rem;">don't have an account ? <a href="register.php">Register</a></p>
    </div>
<!--
<script>
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const errorMsg = document.getElementById('emailError');

function checkFields(){
    //if password field is empty don't submit the form
    if(passwordInput.style.display === 'none'){
        return false;
    }
    return true;
}

emailInput.addEventListener('blur', async () => {
    const email = emailInput.value.trim();

    if (!email) return;

    const res = await fetch('../backend/check_email.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `email=${encodeURIComponent(email)}`
    });

    const data = await res.json();

    if (data.exists) {
        passwordInput.style.display = 'block';
        loginBtn.style.display = 'block';
        errorMsg.style.display = 'none';
    } else {
        passwordInput.style.display = 'none';
        loginBtn.style.display = 'none';
        errorMsg.style.display = 'block';
    }
});
</script>-->
</body>
</html>