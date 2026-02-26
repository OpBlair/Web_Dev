<?php 
require_once 'db_logic.php';

// Fetch posts with author names
function fetchPosts($view = 'posts', $user = null){
    global $pdo;

    // Adjust the query based on the view
    if($view === 'my_posts' && $user) {
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

    $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // RETRIEVE COMMENTS FOR EACH POST
    foreach($posts as &$post){
        $commentStmt = $pdo->prepare("SELECT comments.*, users.first_name 
            FROM comments 
            JOIN users ON comments.user_id = users.user_id 
            WHERE comments.post_id = ? 
            ORDER BY comments.created_at ASC"
        );
        $commentStmt->execute([$post['post_id']]);
        $post['comments'] = $commentStmt->fetchAll(PDO::FETCH_ASSOC);
    }
    return $posts;
}
?>
