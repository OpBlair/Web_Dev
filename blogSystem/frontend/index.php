<?php
session_start();

require_once '../backend/get_posts.php';
require_once '../backend/get_users.php';
$view = $_GET['view'] ?? 'posts';
$user = $_SESSION['user'] ?? null;

$posts = fetchPosts($view, $user);

?>

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
                        if($view === 'users' && $user['role'] === 'admin'): ?>
                            <?php $users = fetchUsers(); ?>
                        
                            <div class="users-data">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>User</th><th>Email</th><th>Role</th><th>Joined</th><th>Posts</th><th>Comments</th><th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php foreach($users as $u): ?>
                                        <tr>
                                            <td><?php echo htmlspecialchars($u['first_name'].' '.$u['last_name']); ?></td>
                                            <td><?php echo htmlspecialchars($u['email']); ?></td>
                                            <td><?php echo htmlspecialchars($u['role']); ?></td>
                                            <td><?php echo date('M j, Y', strtotime($u['created_at'])); ?></td>
                                            <td><?php echo $u['post_count']; ?></td>
                                            <td><?php echo $u['comment_count']; ?></td>
                                            <td>
                                                <a href="?view=manage&id=1" class="btn-manage">Manage</a>
                                            </td>
                                        </tr>
                                        <?php endforeach; ?>
                                    </tbody>
                                </table>
                            </div>
                        <?php endif; ?>
                        <?php break;

                   case 'manage':
                        if($user['role'] !== 'admin') break; 
                        // Mocking user data - in production, you'd fetch this via $_GET['id']
                        $managedUser = ['name' => 'John Doe', 'role' => 'Author', 'email' => 'john@example.com']; 
                        ?>
                        
                        <div class="management-panel">
                            <header class="management-header">
                                <div class="profile-summary">
                                    <div class="avatar-large">JD</div>
                                    <div class="profile-text">
                                        <h3><?php echo $managedUser['name']; ?></h3>
                                        <p><?php echo $managedUser['email']; ?> • <span class="badge"><?php echo $managedUser['role']; ?></span></p>
                                    </div>
                                </div>
                                
                                <div class="user-controls">
                                    <form class="control-group">
                                        <select name="role" class="select-input">
                                            <option value="reader">Change to Reader</option>
                                            <option value="author">Change to Author</option>
                                            <option value="admin">Change to Admin</option>
                                        </select>
                                        <button class="btn-main">Update</button>
                                    </form>
                                    <button class="btn-danger-outline">Suspend Account</button>
                                </div>
                            </header>

                            <div class="user-activity-grid">
                                <div class="activity-block">
                                    <div class="block-header">
                                        <h4>Recent Posts</h4>
                                        <span class="count-pill">2</span>
                                    </div>
                                    <ul class="activity-list">
                                        <li>
                                            <div class="item-info">
                                                <strong>PHP Logic Essentials</strong>
                                                <small>Published 2 days ago</small>
                                            </div>
                                            <button class="btn-icon-danger" title="Delete Post">×</button>
                                        </li>
                                        <li>
                                            <div class="item-info">
                                                <strong>My First Blog</strong>
                                                <small>Published 1 week ago</small>
                                            </div>
                                            <button class="btn-icon-danger" title="Delete Post">×</button>
                                        </li>
                                    </ul>
                                </div>

                                <div class="activity-block">
                                    <div class="block-header">
                                        <h4>Latest Comments</h4>
                                        <span class="count-pill">1</span>
                                    </div>
                                    <div class="comment-item-card">
                                        <p>"This post is awesome! Really helped me understand sessions."</p>
                                        <div class="comment-meta">
                                            <small>On: <em>The Future of Robotics</em></small>
                                            <button class="btn-link-danger">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
    // We 'inject' the PHP value into a JS variable
    const currentUserId = <?php echo json_encode($user['user_id'] ?? 0); ?>;
    const userRole = <?php echo json_encode($user['role'] ?? 'guest'); ?>;

    console.log("Logged in user ID:", currentUserId);
    
</script>

</body>
</html>
