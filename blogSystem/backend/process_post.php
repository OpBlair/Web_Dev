<?php 
require_once 'db_logic.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST'){
    die("Invalid Request Method");
}

$title = htmlspecialchars($_POST['title']);
$content = htmlspecialchars($_POST['content']);
$author_id = $_SESSION['user']['user_id'] ?? null;

// ----- USER MUST BE LOGGED IN 
if(!$author_id){
    die('Error: You must be logged in to post');
}

if(!empty($title) && !empty($content)){
    try{
        $stmt = $pdo->prepare(
        "INSERT INTO posts(author_id, title, content, status) VALUES (?, ?, ?, 'published')"
        );
        if ($stmt->execute([$author_id, $title, $content])){
            header("Location: ../frontend/index.php?view=notifications");
            exit();
        }
    } catch(PDOException $e){
        die("Database error: " . $e->getMessage());
    }
}else{
    echo("All fields are required");
}

?>

 
