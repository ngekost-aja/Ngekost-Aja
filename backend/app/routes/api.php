<?php

require_once __DIR__ . '/../../vendor/autoload.php';

use App\Core\Router;
use App\Controllers\Kost;


Router::add('GET','/api/kost', Kost::class,'getSomeKostData');

Router::run();
