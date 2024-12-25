<?php

require_once __DIR__ . '/../../vendor/autoload.php';

use App\Core\Router;
use App\Controllers\{AssetsController, HomeController, ComponentsController};


Router::add('GET', '/assets/css/(.*)', AssetsController::class, 'css');
Router::add('GET', '/assets/js/(.*)', AssetsController::class, 'js');
Router::add('GET', '/assets/img/(.*)', AssetsController::class, 'img');
Router::add('GET', '/assets/components/(.*)', AssetsController::class,'component');

Router::add('GET', '/', HomeController::class, 'index');
