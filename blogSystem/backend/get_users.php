<?php 
require_once 'db_logic.php';

function fetchUsers(){
    global $pdo;
    $sql = "SELECT users.*, COUNT(posts.post_id) as post_count, (SELECT COUNT(*) FROM comments WHERE comments.user_id = users.user_id) as comment_count
            FROM users
            LEFT JOIN posts ON users.user_id = posts.author_id
            GROUP BY users.user_id
            ORDER BY users.created_at DESC";
     $stmt = $pdo->query($sql);
     return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
?>
