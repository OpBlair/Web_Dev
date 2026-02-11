<?php
// Start the session so PHP knows which one to kill
session_start();

// 1. Unset all session variables
$_SESSION = array();

// 2. Kill the session cookie
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// 3. Destroy the session on the server
session_destroy();

// 4. Redirect to the login page or homepage
header("Location: login.php");
exit;
?>
