<?php

namespace App\Controllers;

use NgekostAjaBackend\Core\Controller;

class Users extends Controller {

    public function __construct() {

    }

    public function index(): void {
        $this->view('');
    }
}
