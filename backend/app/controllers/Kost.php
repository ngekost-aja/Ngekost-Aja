<?php

namespace NgekostAjaBackend\Controllers;

use NgekostAjaBackend\Core\Controller;
use NgekostAjaBackend\Models\KostData;

class Kost extends Controller {

    public function __construct() {
        $this->model = new KostData();
    }

    public function getModel(): KostData {
        return $this->model;
    }

    public function getSomeKostData(): void {
        $result = $this->getModel()->getSomeKostData();
        http_response_code(200);
        echo json_encode([
            'status'=>'success',
            'data'=>$result
        ]);
    }
}
