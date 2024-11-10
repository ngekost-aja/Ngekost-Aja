<?php

namespace App\Core;

use PDO;
use PDOException;

class Database {
    private string $DB_HOST = "";
    private string $DB_NAME = "";
    private string $DB_USER = "";
    private string $DB_PASSWORD = "";
    private ?PDO $conn = null;

    public function __construct() {
        $dsn = "mysql:host={$this->DB_HOST};dbname={$this->DB_NAME};charset=utf8";
    
        try {
            $this->conn = new PDO($dsn, $this->DB_USER, $this->DB_PASSWORD);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Error PDO connection: " . $e->getMessage();
        }
    }

    public function getConnection(): ?PDO {
        return $this->conn;
    }
}