<?php

namespace BrCs;

include("Database.php");

use BrCs\DataBase\Database;


class Components
{
    private $database;

    private $idUt;
    private $nickName;
    private $password;
    
    public  $message;

    function __construct($_nickName, $_password)
    {
        $this->database = new Database();
        $this->nickName = $_nickName;
        $this->password = $_password;


        //Messaggio sull'esistenza dell'account
        //Messaggio sull'esistenza dell'account
        if($this->database->ExistAccount($this->nickName)){
            //Messaggio sull'avvenuta del singin
            if($this->database->SigninAccount($this->nickName, $this->password)){
                $this->message = "001";
            }else{
                $this->message = "002";
            }
        }else{
            $this->message = "003";
        }
    }

    public function SigninAccount($nickNameTest, $passwordTest){
        $record = $this->database->Query("SELECT COUNT(*) AS exist FROM Users WHERE Users.nickName = '".$nickNameTest."' AND Users.password = '".$passwordTest."'");

        $record = $record->fetch_assoc();
        if($record["exist"]==1)
            return true;
        else
            return false;
    }
    public function ExistAccount($nickNameTest){
        $record = $this->database->Query("SELECT COUNT(*) AS exist FROM Users WHERE Users.nickName = '".$nickNameTest."'");

        $record = $record->fetch_assoc();
        if($record["exist"]==1)
            return true;
        else
            return false;
    }

    public function ChangePassword($password){
        $sql = "UPDATE Users SET password = '".md5(password)."' WHERE idUt = ".$this->idUt;
        $this->database->Query($sql);
    }
    public function ChangeNickName($nickName){
        $sql = "UPDATE Users SET nickName = '".$nickName."' WHERE idUt = ".$this->idUt;
        $this->database->Query($sql);
    }



}