<?php 
ini_set('display_errors', 1);
error_reporting(E_ALL);

ini_set('display_errors', 1);
error_reporting(E_ALL);
$host = "localhost"; // where MySQL is running
$db = "BLOG";        // database name in MySQL
$user = "root";      // MySQL username
$pass = "";          // password for MySQL

// ----- CREATING THE CONNECTION -----
try{
    // pdo -> php data objects
    $pdo = new PDO(
        "mysql:host=$host;dbname=$db;charset=utf8", // DSN(Data Source Name)
        $user,
        $pass
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query("SELECT 1");
} catch (PDOException $e){
    die("Database connection failed :(".$e->getMessage());
}
?>
