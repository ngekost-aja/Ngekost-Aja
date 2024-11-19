<?php

require_once __DIR__ . '/../../vendor/autoload.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

use NgekostAjaBackend\Core\Router;
use NgekostAjaBackend\Controllers\Kost;


Router::add('GET','/api/kost', Kost::class,'getSomeKostData');

Router::run();
