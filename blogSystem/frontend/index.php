<?php
session_start();

$view = $_GET['view'] ?? 'posts';

if(!isset($_SESSION['user'])){
    $_SESSION['user'] = [
        'username' => 'John_Doe',
        'role' => 'author' // roles 'admin', 'author', 'reader'
    ];
}

$user = $_SESSION['user'] ?? null; //if no user is logged in, set user to null.

// Let's assume $user is fetched from your session
// and $post is an associative array from your SQL: 
// SELECT posts.*, users.first_name FROM posts JOIN users ON posts.author_id = users.user_id;

$current_user_id = $_SESSION['user']['user_id'];
$current_user_role = $_SESSION['user']['role'];

// Permission Helper Logic
$isOwner = ($current_user_id === $post['author_id']);
$isAdmin = ($current_user_role === 'admin');
$isAuthorRole = ($current_user_role === 'author');

/*
<div class="actions">
    <button class="btn-alt">Like</button>
    <button class="btn-alt">Comment</button>

    <?php if ($isAdmin || ($isAuthorRole && $isOwner)): ?>
        <button class="btn-main">Edit Post</button>
        <button class="btn-danger">Delete</button>
    <?php endif; ?>
</div>
*/
$posts = [
    [
        "title" => "The Future of Robotics",
        "excerpt" => "How embedded systems are changing the world...",
        "author" => "Admin",
        "date" => "Feb 3, 2026"
    ],
    [
        "title" => "Learning PHP logic",
        "excerpt" => "Why session management is key to security...",
        "author" => "John_Doe",
        "date" => "Feb 1, 2026"
    ],
    [
        "title" => "The Word",
        "excerpt" => "Fear of the Lord is the beginning of wisdom",
        "author" => "The Bible",
        "date" => "Jan 1, 2026"
    ]
];

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
                <strong><?php echo $user['username']; ?></strong>
                <span style="display:block; font-size: 0.7rem; opacity: 0.7;">
                    Role: <?php echo strtoupper($user['role']); ?>
                </span>
            </div>
            <ul>
                <?php if($user['role'] === 'reader'):?>
                    <li>My comments</li>
                    <li>Saved posts</li>
                <?php elseif($user['role'] === 'author'):?>
                    <li>create new post</li>
                    <li>my posts & post stats</li>
                <?php elseif($user['role'] === 'admin'):?>
                    <li class="<?php echo ($view == 'overview') ? 'active' : ''; ?>"><a href="?view=overview">Dashboard Overview</a></li>
                    <li class="<?php echo ($view == 'posts') ? 'active' : ''; ?>"><a href="?view=posts">All Posts</a></li>
                    <li class="<?php echo($view == 'users' /*|| 'manage'*/) ? 'active' : ''; ?>"><a href="?view=users">Manage Users</a></li>
                    <li class="<?php echo ($view == 'notification') ? 'active' : ''; ?>"><a href="?view=notification">Notifications</a></li>
                    <li class="<?php echo ($view == 'settings') ? 'active' : ''; ?>"><a href="?view=settings">Site Settings</a></li>
                    <li><a href="?">Logout</a></li>
                <?php endif;?>
            </ul>
        </nav>

        <div class="main-body">
            <header class="top-header">
                <div class="logo"><strong>Blog</strong>OS</div>
                <div class="search-area">
                    <input type="search" placeholder="Search users or posts...">
                </div>
                <div class="user-profile">
                    <span><?php echo $user['username']; ?></span>
                    <small>(<?php echo strtoupper($user['role']); ?>)</small>
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
                    case 'posts':
                    default: ?>
                    <!------- POSTS OVERVIEW ------>
                    <div class="posts-container">
                        <?php foreach($posts as $post): ?>
                            <div class="blog-content">
                                <h2><?php echo $post['title']; ?></h2>
                                <small>By <?php echo $post['author']; ?> | <?php echo $post['date']; ?></small>
                                <p><?php echo $post['excerpt']; ?></p>

                                <!---- IF A USER ISN'T LOGGED IN ----->
                                <?php if(!$user): ?>
                                    <p><a href="login.php">Log in</a> to like or comment!</p>

                                <!------ USER REACTION FOR A READER ------>
                                <?php elseif($user['role'] === 'reader'): ?>
                                    <div class="actions">
                                        <button class="btn-alt">Like</button>
                                        <button class="btn-alt">Dislike</button>
                                        <button class="btn-alt">Comment</button>
                                        <button class="btn-alt">Save</button>
                                    </div>
                                <!------ USER REACTION FOR AN ADMIN AND A AUTHOR ---->
                                <?php elseif($user['role'] === 'author' || $user['role'] === 'admin'): ?>
                                    <div class="actions">
                                        <button class="btn-alt">Like</button>
                                        <button class="btn-alt">Comment</button>
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
</body>
</html>
