<?php
/**
 * Created by PhpStorm.
 * User: mcost
 * Date: 24/05/2018
 * Time: 18:55
 */

include("Classi/Component.php");
use BrCs\Components;

ini_set('display_errors', 1);
session_start();

$component = new Components();

if($_FILES["txtFile"]["size"]!=0){
    $target_dir = "Uplaod - IMG\Posts\\";
    $target_file = $target_dir . basename($component->GetNumFile()).".".pathinfo($_FILES["txtFile"]["name"],PATHINFO_EXTENSION);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

    if(isset($_POST["submit"])) {
        $check = getimagesize($_FILES["txtFile"]["tmp_name"]);
        if($check !== false) {
            echo "File is an image - " . $check["mime"] . ".";
            $uploadOk = 1;
        } else {
            echo "File is not an image.";
            $uploadOk = 0;
        }
    }
    if (file_exists($target_file)) {
        echo "Sorry, file already exists.";
        $uploadOk = 0;
    }
    if ($_FILES["txtFile"]["size"] > 500000) {
        echo "Sorry, your file is too large.";
        $uploadOk = 0;
    }

    if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) {
        $uploadOk = 0;
    }
    if ($uploadOk == 0) {
        echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
    } else {
        if (move_uploaded_file($_FILES["txtFile"]["tmp_name"], $target_file)) {
            $component->InsertPost($component->GetIdUser($_SESSION["nickName"]), "1", "..\\\\".str_replace("\\", "\\\\", $target_file), $_REQUEST["field"]);
        }
    }
}else{
    $component->InsertPost($component->GetIdUser($_SESSION["nickName"]), "1", null, $_REQUEST["field"]);
}






header("Location: Page/home.html");

