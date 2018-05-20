<?php
/**
 * Created by PhpStorm.
 * User: mcost
 * Date: 20/05/2018
 * Time: 15:50
 */

include("Classi/Component.php");
use BrCs\Components;

if(isset($_REQUEST["action"])){
    switch ($_REQUEST["action"]){
        case 'login':
            if(isset($_REQUEST["data"]))
                Login();
            else
                $message = '100';
            break;

        case 'signin':

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

    $User = new Components($obj['nickName'], $obj['password']);
    $GLOBALS['message'] = $User->message;
}

function InsertUser(){
    $obj = json_decode($_REQUEST["data"], true);
}

function Answer(){
    $obj = json_encode(array('action'=>$_REQUEST["action"],'message'=>$GLOBALS['message']));
    echo($obj);
}