<?php
/**
 * Created by PhpStorm.
 * User: mcost
 * Date: 14/05/2018
 * Time: 22:15
 */

namespace BrCs;

use mysqli;

class Database
{
    private $connessione;

    function __construct()
    {
        //$this->connessione = new mysqli("localhost","id5754313_root", "password", "id5754313_brcs");
        $this->connessione = new mysqli("localhost", "root", "", "id5754313_brcs");
        if($this->TestConnessione()==false)
            die("Errore nella connessione al Database");

    }

    /*
    True: connessione riuscita
    False: connessione fallita
    */
    public function  TestConnessione(){
        $errore = true;
        if($this->connessione->connect_errno)
            $errore = false;
        return $errore;
    }

    function Query($sql){
        return $this->connessione->Query($sql);
    }


    public function InsertAccount($nickNameTest, $emailTest, $passwordTest){
        $sql = "INSERT INTO `users`(`nickName`, `email`, `password`, `idPr`) VALUES ('".$nickNameTest."','".$emailTest."','".md5($passwordTest)."',2)";
        $this->Query($sql);
    }
    /*
     * True: esiste
     * False: non esiste
     */
    public function SigninAccount($nickNameTest, $passwordTest){
        $record = $this->Query("SELECT COUNT(*) AS exist FROM users WHERE nickName = '".$nickNameTest."' AND password = '".md5($passwordTest)."'");

        $record = $record->fetch_assoc();
        if($record["exist"]==1)
            return true;
        else
            return false;
    }
    public function ExistAccount($nickNameTest){
        $record = $this->Query("SELECT COUNT(*) AS exist FROM users WHERE nickName = '".$nickNameTest."'");

        $record = $record->fetch_assoc();
        if($record["exist"]==1)
            return true;
        else
            return false;
    }
}