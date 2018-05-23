<?php
/**
 * Created by PhpStorm.
 * User: mcost
 * Date: 20/05/2018
 * Time: 15:50
 */

include("Classi/Component.php");
use BrCs\Components;

ini_set('display_errors', 1);

$message = "";
$data = "";

session_start();

if(isset($_REQUEST["action"]) && isset($_REQUEST["data"])){
    switch ($_REQUEST["action"]){
        case 'login':
                Login();
            break;

        case 'signUp':
            InsertUser();
            break;

        case 'profileUpdate':
            UpdateProfile();
            break;
        case 'getPosts':
            GetPosts();
            break;
        case 'updatePosts':
            UpdatePosts();
            break;

        default:
            $message = '999';
            break;
    }
}
else{
    $message = '100';
}

Answer();

function Login(){
    $obj = json_decode($_REQUEST["data"], true);

    $_SESSION['nickName'] = $obj['nickName'];
    $_SESSION['password'] = md5($obj['password']);

    $User = new Components();
    $User->LogInAccount($obj['nickName'], $obj['password']);
    $GLOBALS['message'] = $User->message;
}
function InsertUser(){
    $obj = json_decode($_REQUEST["data"], true);

    $User = new Components();
    $User->SignUpAccount($obj['nickName'],$obj['email'], $obj['password']);
    $GLOBALS['message'] = $User->message;
}
function UpdateProfile(){
    //$obj = json_decode($_REQUEST["data"], true);

    $User = new Components();

    $User->UpdateProfile($_SESSION['nickName']);

    $GLOBALS['data'] = $User->data;
}

function GetPosts(){
    /*
     * Prendi i primi N post, in ordine cronologico, di coloro che segui
     * N viene formito nella stringa JSON
     */
    $obj = json_decode($_REQUEST["data"], true);

    $User = new Components();


    $GLOBALS['data'] = json_encode($User->GetPosts($obj['idUser'], $obj['numPosts']));
}
function UpdatePosts(){
    $obj = json_decode($_REQUEST["data"], true);
    $User = new Components();


    $GLOBALS['data'] = json_encode($User->UpdatePost($obj['idPosts']));
}

/* --- */
function Answer(){
    $obj = json_encode(array('action'=>$_REQUEST["action"],'message'=>$GLOBALS['message'], 'data'=> $GLOBALS['data']));
    echo($obj);
}