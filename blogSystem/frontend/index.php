<?php
session_start();

require_once '../backend/db_logic.php';

// Fetch posts with author names
$view = $_GET['view'] ?? 'posts';
$user = $_SESSION['user'] ?? null;

// Adjust the query based on the view
if ($view === 'my_posts' && $user) {
    $sql = "SELECT posts.*, users.first_name FROM posts 
            JOIN users ON posts.author_id = users.user_id 
            WHERE posts.author_id = ? 
            ORDER BY posts.created_at DESC";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$user['user_d']]);
} else {
    // Default: Fetch all published posts
    $sql = "SELECT posts.*, users.first_name FROM posts 
            JOIN users ON posts.author_id = users.user_id 
            WHERE posts.status = 'published' 
            ORDER BY posts.created_at DESC";
    $stmt = $pdo->query($sql);
}
$posts = $stmt->fetchAll(PDO::FETCH_ASSOC);

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog | <?php echo ucfirst($user['role']); ?></title>
    <link rel="stylesheet" href="blogSystem.css">    
</head>
<body>
    <main>
        <!--- NAVIGATION BAR  ---> 
        <nav class="nav-bar">
            <div class="user-badge">
                <span style="display:block; font-size: 0.7rem; opacity: 0.7;">
                    <?php echo strtoupper($user['username'] ?? 'GUEST'); ?>
                </span>
                <small>(<?php echo strtoupper($user['role'] ?? 'visitor'); ?>)</small>
            </div>
            <ul>
                <?php if($user['role'] === 'reader'):?>
                    <li class="<?php echo ($view == 'home') ? 'active' : ''; ?>"><a href="?view=home">Home</a></li>
                    <li class="<?php echo ($view == 'comments') ? 'active' : ''; ?>"><a href="?view=comments">My comments</a></li>
                    <li class="<?php echo ($view == 'saved_posts') ? 'active' : ''; ?>"><a href="?view=saved_posts">Saved posts</a></li>
                <?php elseif($user['role'] === 'author'):?>
                    <li class="<?php echo ($view == 'home') ? 'active' : ''; ?>"><a href="?view=home">Home</a></li>
                    <li class="<?php echo ($view == "create") ? 'active' : ''; ?>"><a href="?view=create">Create new post</a></li>
                    <li class="<?php echo ($view == "my_posts") ? 'active' : ''; ?>"><a href="?view=my_posts">My posts</a></li>
                <?php elseif($user['role'] === 'admin'):?>
                    <li class="<?php echo ($view == 'overview') ? 'active' : ''; ?>"><a href="?view=overview">Dashboard Overview</a></li>
                    <li class="<?php echo ($view == 'posts') ? 'active' : ''; ?>"><a href="?view=posts">All Posts</a></li>
                    <li class="<?php echo($view == 'users' /*|| 'manage'*/) ? 'active' : ''; ?>"><a href="?view=users">Manage Users</a></li>
                    <li class="<?php echo ($view == 'settings') ? 'active' : ''; ?>"><a href="?view=settings">Site Settings</a></li>
                <?php endif;?>
                <li class="<?php echo ($view == 'notification') ? 'active' : ''; ?>"><a href="?view=notification">Notifications</a></li>
                <li><a href="logout.php">Logout</a></li>
            </ul>
        </nav>

        <div class="main-body">
            <header class="top-header">
                <div class="logo"><strong>Blog</strong>OS</div>
                <div class="search-area">
                    <input type="search" placeholder="Search users or posts...">
                </div>
                <div class="user-profile">
                    <span class="avatar-circle"><?php echo htmlspecialchars(mb_strtoupper(mb_substr($user['username'], 0, 1)) ?? 'Guest'); ?></span>
                </div>
            </header>
            
            <!-- CONTENT SECTION -->
            <section class="content">
                <?php 
                switch($view){
                    case 'overview':
                        //----- OVERALL OVERVIEW VIEW -----
                        if($user['role'] !== 'admin') break; ?>
                        <div class="overveiw">
                            <div class="stat-card">
                                <span>Authors</span>
                                <span>10</span>
                            </div>
                            <div class="stat-card">
                                <span>Readers</span>
                                <span>20</span>
                            </div>
                            <div class="stat-card">
                                <span>Posts</span>
                                <span>30</span>
                            </div>
                            <div class="stat-card">
                                <span>Comments</span>
                                <span>5</span>
                            </div>
                        </div>
                        <?php break;
                    case 'users':
                        //-----OVERVIEW OF USER DATA ------
                        if($user['role'] !== 'admin') break; ?>
                        <div class="users-data">
                            <table>
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Joined</th>
                                        <th>Posts</th>
                                        <th>Comments</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>John Doe</td>
                                        <td>jdoe@gmail.com</td>
                                        <td>Admin</td>
                                        <td>Feb 5, 2026</td>
                                        <td>5</td>
                                        <td>7</td>
                                        <td>
                                            <a href="?view=manage&id=1" class="btn-manage">Manage</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <?php break;

                    case 'manage':
                        //------- USER MANAGEMENT DASHBOARD   -------
                         if($user['role'] !== 'admin' && isset($_GET['manage_user'])) break; ?>
                        <section class="management-panel">
                            <header class="panel-header">
                                <h3>Managing User: John Doe</h3>
                                <div class="user-controls">
                                    <p>Role: Admin</p>
                                    <button class="btn-main">Update Role</button>
                                    <select name="role">
                                        <option value="reader">Reader</option>
                                        <option value="author">Author</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                    <button class="btn-danger">Suspend Account</button>
                                </div>
                            </header>

                            <div class="user-activity-grid">
                                <div class="activity-block">
                                    <h4>Recent Posts by this User</h4>
                                    <ul>
                                        <li>"PHP Logic" <button class="btn-sm btn-danger">Delete</button></li>
                                        <li>"My First Blog" <button class="btn-sm btn-danger">Delete</button></li>
                                    </ul>
                                </div>

                                <div class="activity-block">
                                    <h4>User Comments</h4>
                                    <div class="comment-item">
                                        <p>"This post is awesome!"</p>
                                        <small>On: The Future of Robotics</small>
                                        <button class="btn-sm btn-danger">Delete Comment</button>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <?php break;
                    case 'create':
                        if ($user['role'] === 'reader') break; ?>
                        <div class="create-post">
                            <h2>Create a New Post</h2>
                            <form action="../backend/process_post.php" method="POST">
                                <input type="text" name="title" placeholder="Post Title">
                                <textarea name="content" id="content" placeholder="What's on your mind ?"></textarea>
                                <button type="submit" class="btn-main">Publish Post</button>
                            </form>
                        </div>
                        <?php break;
                    case 'posts':
                    default: ?>
                    <!------- POSTS OVERVIEW ------>
                    <div class="posts-container">
                        <?php foreach($posts as $post): ?>
                            <div class="blog-content">
                                <h2><?php echo htmlspecialchars($post['title']); ?></h2>
                                <small>By <?php echo htmlspecialchars($post['first_name']); ?> | <?php echo date('M j, Y', strtotime($post['created_at'])); ?></small>
                                <p><?php echo htmlspecialchars(substr($post['content'], 0, 150)) . '...'; ?></p>

                                <!---- IF A USER ISN'T LOGGED IN ----->
                                <?php if(!$user): ?>
                                    <p><a href="login.php">Log in</a> to like or comment!</p>

                                <!------ USER REACTION FOR A READER ------>
                                <?php elseif($user['role'] === 'reader'): ?>
                                    <div class="actions">
                                        <button class="btn-alt like-btn">Like</button>
                                        <button class="btn-alt">Dislike</button>
                                        <button class="btn-alt comment-btn">Comment</button>
                                        <button class="btn-alt">Save</button>
                                    </div>
                                <!------ USER REACTION FOR AN ADMIN AND A AUTHOR ---->
                                <?php elseif($user['role'] === 'author' || $user['role'] === 'admin'): ?>
                                    <div class="actions">
                                        <button class="btn-alt like-btn">Like</button>
                                        <button class="btn-alt comment-btn">Comment</button>
                                        <button class="btn-main">Edit Post</button>
                                        <button class="btn-danger">Delete</button>
                                    </div>
                                <?php endif; ?>
                            </div>
                        <?php endforeach; ?>
                    </div>
                    <?php break;
                } ?>
            </section>
        </div>
    </main>
    <script>
    const currentUserId = <?php echo json_encode($user['user_id'] ?? 0); ?>;
    const userRole = <?php echo json_encode($user['role'] ?? 'guest'); ?>;

    console.log("Logged in user ID:", currentUserId);
    
    if (userRole === 'admin') {
        console.log("Welcome, Boss!");
    }
</script>

</body>
</html>
