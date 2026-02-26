<?php 
session_start();
require_once '../db_logic.php';

if($_SERVER['REQUEST_METHOD'] !== 'POST'){
    die("Invalid Request Method.");
}

if(!isset($_SESSION['user']['user_id'])){
    die("Error: You must be logged in to comment.");
}

$post_id = isset($_POST['post_id']) ? intval($_POST['post_id']) : 0;
$content = isset($_POST['comment-content']) ? trim($_POST['comment-content']) : '';

if($post_id <= 0 || empty($content)){
    die("Post Id and comment content are required.");
}

try{
    $stmt = $pdo->prepare(" INSERT INTO comments (post_id, user_id, content) VALUES (:post_id, :user_id, :content)");
    $stmt->execute([
        ':post_id' => $post_id,
        ':user_id' => $_SESSION['user']['user_id'],
        ':content' => $content
        ]);    
} catch (PDOException $e){
    die("Database error: " . $e->getMessage());
}

// REDIRECT BACK TO THE SAME PAGE
header("Location: " . $_SERVER['HTTP_REFERER'] . "$post-" . $post_id);
exit();
?>
