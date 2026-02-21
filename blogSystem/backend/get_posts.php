<?php 
require_once 'db_logic.php';

// Fetch posts with author names
function fetchPosts($view = 'posts', $user = null){
    global $pdo;

    // Adjust the query based on the view
    if ($view === 'my_posts' && $user) {
        $sql = "SELECT posts.*, users.first_name FROM posts 
                JOIN users ON posts.author_id = users.user_id 
                WHERE posts.author_id = ? 
                ORDER BY posts.created_at DESC";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$user['user_id']]);
    } else {
        // Default: Fetch all published posts
        $sql = "SELECT posts.*, users.first_name FROM posts 
                JOIN users ON posts.author_id = users.user_id 
                WHERE posts.status = 'published' 
                ORDER BY posts.created_at DESC";
        $stmt = $pdo->query($sql);
    }

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

?>
