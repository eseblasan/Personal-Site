<?php
$host = 'localhost';
$db = 'website_db';
$user = 'root';
$pass = 'your_password'; // Замість 'your_password' вкажіть свій пароль

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
