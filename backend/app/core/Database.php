<?php

namespace NgekostAjaBackend\Core;

use PDO;
use PDOException;
use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/../../');
$dotenv->load();

class Database {
    private string $DB_HOST;
    private string $DB_NAME;
    private string $DB_USER;
    private string $DB_PASSWORD;

    public function __construct() {
        $this->DB_HOST = $_ENV['DB_HOST'];
        $this->DB_NAME = $_ENV['DB_NAME'];
        $this->DB_USER = $_ENV['DB_USER'];
        $this->DB_PASSWORD = $_ENV['DB_PASSWORD'];
    }
    
    public function connect(): PDO {
        $conn = null;
        $dsn = "mysql:host={$this->DB_HOST};dbname={$this->DB_NAME};charset=utf8";
    
        try {
            $conn = new PDO($dsn, $this->DB_USER, $this->DB_PASSWORD);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Error PDO connection: " . $e->getMessage();
        }

        return $conn;
    }
}