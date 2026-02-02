<?php
session_start();
session_destroy();
session_start();

if(!isset($_SESSION['user'])){
    $_SESSION['user'] = [
        'username' => 'John_Doe',
        'role' => 'author' // roles 'admin', 'author', 'reader'
    ];
}

$user = $_SESSION['user'];
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
            <div class="blog-content">
                <p>"The fear of the Lord is the beginning of Wisdom."</p>

                <?php if($user['role'] === 'reader'): ?>
                    <div class="blog-reaction">
                        <button>like</button>
                        <button>dislike</button>
                        <button>comment</button>
                        <button>save</button>
                    </div>
                <?php elseif ($user['role'] === 'author' || $user['role'] === 'admin'): ?>
                    <div class="blog-creation">
                        <button>edit</button>
                        <button>post</button>
                        <button>delete</button>
                    </div>
                <?php endif; ?>
            </div>
        </section>
    </main>
</body>
</html>
