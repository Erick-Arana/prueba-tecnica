<?php

    function dbConnection(){

        $host   = 'localhost';
        $dbuser = 'root';
        $dbpass = '';
        $dbname = 'mydb';
        $dbport = '3306';

        $connection = new mysqli($host, $dbuser, $dbpass, $dbname, $dbport);
        
        if($connection->connect_error){
            die("Connection failed: ".$connection->connect_error);
        }

        return $connection;
    
    }

?>