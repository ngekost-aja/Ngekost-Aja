<?php

require_once __DIR__ . '/core/Router.php';
require_once __DIR__ .'/controllers/Users.php';

use App\Core\Router;
use App\Controllers\Users;

Router::add('GET', '/', Users::class, 'index');

Router::run();
