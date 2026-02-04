<?php
session_start();

if(!isset($_SESSION['user'])){
    $_SESSION['user'] = [
        'username' => 'John_Doe',
        'role' => 'author' // roles 'admin', 'author', 'reader'
    ];
}

$user = $_SESSION['user'] ?? null; //if no user is logged in, set user to null.

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
            <input type="search" placeholder="enter text to search">
            <ul>
                <?php if($user['role'] === 'reader'):?>
                    <li>My comments</li>
                    <li>Saved posts</li>
                <?php elseif($user['role'] === 'author'):?>
                    <li>create new post</li>
                    <li>my posts & post stats</li>
                <?php elseif($user['role'] === 'admin'):?>
                    <li>view authors</li>
                    <li>view readers</li>
                    <li>manage users (delete, change role)</li>
                <?php endif;?>
            </ul>
        </nav>

        <!-- CONTENT SECTION -->
         <section class="content">
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
        </section>

    </main>
</body>
</html>

