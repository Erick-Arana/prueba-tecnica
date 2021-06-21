<?php

require_once '../vendor/autoload.php';
require_once '../src/config/conexion.php';

$app = new \Slim\Slim();

//CONFIGURACION DE CABECERAS
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER['REQUEST_METHOD'];
if($method == "OPTIONS") {
    die();
}

$db = dbConnection();

// Register routes
$routes = require '../src/routes/routes.php';
$routes($app, $db);


$app->run();

