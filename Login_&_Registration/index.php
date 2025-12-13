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
<!--
//<?php
// session_start();

// If logged in, redirect to dashboard
# if(isset($_SESSION['username'])){
#	header("Location: dashboard.php");
#	exit();
#}

#?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Trial Auth | Secure Login</title>
    <style>
        /* General Reset and Typography */
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Modern font stack */
            background-color: #2c3e50; /* Deep blue/charcoal background */
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            color: #333;
            line-height: 1.6;
        }
        h2 {
            text-align: center;
            color: #3498db; /* Professional blue for titles */
            margin-bottom: 25px;
            font-weight: 700;
            letter-spacing: 1px;
            font-size: 1.8em;
        }

        /* Container and Card Styling */
        .auth-container {
            width: 90%;
            max-width: 400px; /* Slightly wider */
            padding: 40px;
            background: #ffffff; /* White card background */
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25); /* Stronger shadow for aesthetic depth */
        }
        
        .form-box {
            padding: 20px 0; /* Padding inside the card */
        }

        h3 {
            color: #333;
            margin-top: 0;
            margin-bottom: 20px;
            font-weight: 600;
            font-size: 1.4em;
            text-align: center;
        }
        
        /* Form Elements */
        input[type="text"], 
        input[type="password"] {
            width: 100%;
            padding: 14px 15px;
            margin-bottom: 15px;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-sizing: border-box; 
            font-size: 1em;
            transition: all 0.3s;
            background-color: #f9f9f9;
        }
        
        input[type="text"]:focus, 
        input[type="password"]:focus {
            border-color: #3498db;
            outline: none;
            box-shadow: 0 0 8px rgba(52, 152, 219, 0.3);
            background-color: #fff;
        }

        /* Button Styling - Applied to both next and login */
        button {
            width: 100%;
            padding: 14px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 1.1em;
            font-weight: 700;
            color: white;
            transition: background-color 0.3s, transform 0.1s;
        }

        /* Specific Button Colors */
        #next-button {
            background-color: #2ecc71; /* Emerald Green */
        }
        #next-button:hover {
            background-color: #27ae60;
        }
        
        #login-button {
            background-color: #3498db; /* Primary Blue */
        }
        #login-button:hover {
            background-color: #2980b9;
        }
        
        /* Links and Register Text */
        p a {
            color: #3498db;
            text-decoration: none;
            font-weight: 600;
            transition: color 0.2s;
        }
        p a:hover {
            color: #2980b9;
            text-decoration: underline;
        }
        
        .step-two {
            display: none;
            margin-top: 15px;
            animation: fadeIn 0.5s ease-out; /* Added fade-in effect */
        }
        .separator {
            display: none !important; /* Hiding separator in the final aesthetic design */
        }
        
        /* CSS Animation */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        #registerBox {
            /* Making the register form visible only on click */
            display: none;
            padding-top: 20px;
            border-top: 1px solid #ecf0f1;
            margin-top: 25px;
        }

    </style>
</head>
<body>
    <div class="auth-container">
        <h2>Information Management System</h2>
        
        <div class="form-box" id="loginBox">
            <h3>Secure Login</h3>
            <form id="loginForm" action="auth.php" method="post">
                <input type="hidden" name="action" value="login">
                
                <div id="step-one">
                    <input type="text" name="username" id="usernameField" placeholder="Enter Username" required>
                    <button type="button" id="next-button">Continue</button>
                    <p style="text-align: center; margin-top: 20px; font-size: 0.9em;">
                        Don't have an account? <a href="#" id="showRegister">Register Now!</a>
                    </p>
                </div>
                
                <div id="step-two" class="step-two">
                    <input type="password" name="password" id="passwordField" placeholder="Enter Password" required>
                    <button type="submit" id="login-button">Log In Securely</button>
                </div>
            </form>
        </div>
        
        <div class="form-box" id="registerBox">
            <h3>Create Account</h3>
            <form action="auth.php" method="post">
                <input type="hidden" name="action" value="register">
                <input type="text" name="username" placeholder="Create Username" required>
                <input type="password" name="password" placeholder="Create Password" required>
                <input type="password" name="confirm_password" placeholder="Confirm Password" required>
                <button type="submit">Create Account</button>
            </form>
            <p style="text-align: center; margin-top: 20px; font-size: 0.9em;"><a href="#" id="showLogin">Already have an account? Login!</a></p>
        </div>
    </div>

    <script>
        document.getElementById('next-button').addEventListener('click', function() {
            const username = document.getElementById('usernameField').value;
            
            if (username.trim() === '') {
                alert('Please enter your username.');
                return;
            }

            // In a real application, an AJAX call would check the database for username existence here.
            
            // UI Transition: Show password field
            document.getElementById('step-one').style.display = 'none';
            document.getElementById('step-two').style.display = 'block';
            document.getElementById('passwordField').focus();
        });

        // Toggle between Login and Register views
        const loginBox = document.getElementById('loginBox');
        const registerBox = document.getElementById('registerBox');
        const mainTitle = document.querySelector('.auth-container h2');

        document.getElementById('showRegister').addEventListener('click', function(e) {
            e.preventDefault();
            mainTitle.innerText = 'Register for JoyLine';
            loginBox.style.display = 'none';
            registerBox.style.display = 'block';
        });

        document.getElementById('showLogin').addEventListener('click', function(e) {
            e.preventDefault();
            mainTitle.innerText = 'JoyLine Management System';
            loginBox.style.display = 'block';
            registerBox.style.display = 'none';
            
            // Reset to step one when switching back to login
            document.getElementById('step-one').style.display = 'block';
            document.getElementById('step-two').style.display = 'none';
        });

    </script>
</body>
</html>
-->
