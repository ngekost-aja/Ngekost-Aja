<?php

namespace App\Controllers;

require_once __DIR__ . '/../core/Controller.php';

use App\Core\Controller;

class Users extends Controller {

    public function __construct() {

    }

    public function index(): void {
        echo "Hello!";
    }
}
