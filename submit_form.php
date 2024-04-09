<?php
$name =$_POST['name'];
$email =$_POST['email'];
$course =$_POST['course'];
$gender =$_POST['gender'];
$address =$_POST['address'];
// Database connection
$conn = new mysqli('localhost','root','','duia_database');

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}else{
    $stmt = $conn->prepare("insert into addmission_form(name,email,course,gender,address)values(?,?,?,?,?)");
    $stmt ->bind_param("sssss",$name,$email,$course,$gender,$address);
    $stmt ->execute();
    echo"register successfully";
    $stmt->close();
    $conn ->close();
}

?>