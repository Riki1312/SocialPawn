<?php

namespace BrCs;

include("Database.php");

use BrCs\Database;

ini_set('display_errors', 1);

class Components
{

    private $database;

    private $idUt;
    private $nickName;
    private $password;
    
    public $message;
    public $data;

    function __construct()
    {
        $this->database = new Database();
    }

    public function LogInAccount($nickNameTest, $passwordTest){
        if($this->database->ExistAccount($nickNameTest)){
            //Messaggio sull'avvenuta del singin
            if($this->database->SigninAccount($nickNameTest, $passwordTest)){
                $this->message = "001";
            }else{
                $this->message = "002";
            }
        }else{
            $this->message = "003";
        }
    }
    public function SignUpAccount($nickNameTest, $emailTest, $passwordTest){
        if(!$this->database->ExistAccount($nickNameTest)){
            $this->database->InsertAccount($nickNameTest, $emailTest, $passwordTest);
            $this->message = "005";
        }else
            $this->message = "006";
    }

    public function GetPosts($idUser, $numPosts){
        /* nome profilo, img profilo, tempo strascorso,raccolta, claps, likes, testo, url img, commenti (nome, testo)*/
        /* SELECT users.nickName, users.srcPhoto FROM users WHERE users.idUt = 1 */
        /* SELECT posts.date, posts.idPt FROM posts WHERE idPs = 1 */
        /* SELECT likes.claps, likes.likes FROM likes WHERE likes.idPs = 1 */
        /* SELECT posts.txt, posts.srcFile FROM posts WHERE posts.idPs = 1 */
        /* SELECT comments.idUt, comments.txt FROM comments WHERE comments.idPs = 1 ORDER BY comments.date ASC */
        $arrayPosts = [];

        $sql = "SELECT posts.idPs FROM posts\n"
            . "WHERE posts.idUt IN (SELECT follower.idFollowing FROM follower WHERE follower.idUt = $idUser)\n"
            . "ORDER BY posts.date\n"
            . "LIMIT $numPosts";
        //Attualmente possiedo tutti gli id dei post da mostare nella home
        $record = $this->database->Query($sql);

        while($idPs = $record->fetch_assoc()){
            //Query per ottenre i dati dell'utente
            $sql = "SELECT users.nickName, users.srcPhoto FROM users WHERE users.idUt = (SELECT idUt FROM posts WHERE idPs = ".$idPs['idPs'].")";
            $result = $this->database->Query($sql);
            $data = $result->fetch_assoc();
            //Inizio riempimento dati
            $obj =  (object)array(
                'id' => $idPs['idPs'],
                'claps' => "",
                'likes' => "",
                'time' => "",
                'uName' => $data['nickName'],
                'uImg' => $data['srcPhoto'],
                //Cambiare
                'cText' => "pippo",
                'cImg'=> "../postEsempio.png",
                //
                'comments' => array()
                //(object)array(user=> "", text=> "")
            );
            //Ottiene like e claps
            $sql = "SELECT SUM(likes.claps) AS claps, SUM(likes.likes) AS likes FROM likes WHERE likes.idPs = ".$idPs['idPs'];
            $result = $this->database->Query($sql);
            $data = $result->fetch_assoc();
            $obj->claps = $data['claps'];
            $obj->likes = $data['likes'];

            $sql = "SELECT SUM(likes.claps) AS claps, SUM(likes.likes) AS likes FROM likes WHERE likes.idPs = ".$idPs['idPs'];
            $result = $this->database->Query($sql);
            $data = $result->fetch_assoc();
            //$obj->cText = ;

            //Ottiene tutti i commenti
            $sql = "SELECT users.nickName, comments.txt FROM comments, users WHERE comments.idPs = ".$idPs['idPs']." AND users.idUt = comments.idUt ORDER BY comments.date ASC";
            $result = $this->database->Query($sql);
            while ($data = $result->fetch_assoc()){
                array_push($obj->comments, (object)array('user'=> $data['nickName'], 'text'=> $data['txt']));
            }


            array_push($arrayPosts, $obj);
        }

        return $arrayPosts;
    }
    public function UpdatePost($idPost){
        $arrayPosts = [];


        for($count = 0; $count<count($idPost); $count++){
            //Query per ottenre i dati dell'utente
            $sql = "SELECT users.nickName, users.srcPhoto FROM users WHERE users.idUt = (SELECT idUt FROM posts WHERE idPs = ".$idPost[$count].")";
            $result = $this->database->Query($sql);
            $data = $result->fetch_assoc();
            //Inizio riempimento dati
            $obj =  (object)array(
                'id' => $idPost[$count],
                'claps' => "",
                'likes' => "",
                'time' => "",
                'uName' => $data['nickName'],
                'uImg' => $data['srcPhoto'],
                //Cambiare
                'cText' => "pluto",
                'cImg'=> "../postEsempio.png",
                //
                'comments' => array()
            );
            //Ottiene like e claps
            $sql = "SELECT SUM(likes.claps) AS claps, SUM(likes.likes) AS likes FROM likes WHERE likes.idPs = ".$idPost[$count];
            $result = $this->database->Query($sql);
            $data = $result->fetch_assoc();
            $obj->claps = $data['claps'];
            $obj->likes = $data['likes'];

            $sql = "SELECT SUM(likes.claps) AS claps, SUM(likes.likes) AS likes FROM likes WHERE likes.idPs = ".$idPost[$count];
            $result = $this->database->Query($sql);
            $data = $result->fetch_assoc();
            //$obj->cText = ;

            //Ottiene tutti i commenti
            $sql = "SELECT users.nickName, comments.txt FROM comments, users WHERE comments.idPs = ".$idPost[$count]." AND users.idUt = comments.idUt ORDER BY comments.date ASC";
            $result = $this->database->Query($sql);
            while ($data = $result->fetch_assoc()){
                array_push($obj->comments, (object)array('user'=> $data['nickName'], 'text'=> $data['txt']));
            }


            array_push($arrayPosts, $obj);
        }

        return $arrayPosts;
    }

    public function UpdateProfile($nickNameTest){

        //Numero delle persone che seguono l'utenete
        $record = $this->database->Query("SELECT COUNT(*) AS follower FROM follower WHERE idUt = (SELECT idUt FROM users WHERE nickName = '".$nickNameTest."')");
        $numFollower = $record->fetch_assoc()["follower"];
        $record = $this->database->Query("SELECT COUNT(*) AS following FROM follower WHERE idFollowing = (SELECT idUt FROM users WHERE nickName = '".$nickNameTest."')");
        $numFollowing = $record->fetch_assoc()["following"];
        $record = $this->database->Query("SELECT COUNT(*) AS posts FROM posts WHERE idUt = (SELECT idUt FROM users WHERE nickName = '".$nickNameTest."')");
        $numPosts = $record->fetch_assoc()["posts"];

        $obj = (object)array("follower"=>$numFollower, "following"=>$numFollowing, "posts"=>$numPosts);

        $this->data = $obj;
    }

    public function GetIdUser($nickNameTest){
        $record = $this->database->Query("SELECT idUt FROM users WHERE nickName = '".$nickNameTest."'");
        return $record->fetch_assoc()['idUt'];
    }
    public function ChangePassword($password){
        $sql = "UPDATE users SET password = '".md5(password)."' WHERE idUt = ".$this->idUt;
        $this->database->Query($sql);
    }
    public function ChangeNickName($nickName){
        $sql = "UPDATE users SET nickName = '".$nickName."' WHERE idUt = ".$this->idUt;
        $this->database->Query($sql);
    }



}