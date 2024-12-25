<?php

namespace App\Controllers;

use App\Core\Controller;

class AssetsController extends Controller {

    public function __construct() { }

    public function css(string $file_name): void {
        header("Content-Type: text/css");
        require __DIR__ . '/../../../frontend/assets/css/' . $file_name;
    }

    public function js(string $file_name): void {
        header("Content-Type: application/javascript");
        require __DIR__ . '/../../../frontend/assets/js/'. $file_name;
    }

    public function component(string $file_name): void {
        header("Content-Type: application/javascript");
        require __DIR__ . '/../../../frontend/assets/components/'. $file_name;
    }

    public function img(string $file_name): void {
        $file_extension = substr($file_name,strrpos($file_name,'.'));
        switch ($file_extension) {
            case '.png': header("Content-Type: image/png");
                break;
            case '.jpeg': header("Content-Type: image/jpeg");
                break;
            case '.svg': header("Content-Type: image/svg+xml");
                break;
        }

        require __DIR__ . '/../../../frontend/assets/img/' . $file_name;
    }
}
