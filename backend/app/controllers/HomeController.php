<?php

namespace App\Controllers;

use App\Core\Controller;

class HomeController extends Controller {

    public function __construct() {

    }

    public function index(): void {
        $this->view('index');
    }
}
