<?php
error_reporting(0);
class Database
{
    // DB Params
    private $host = '147.139.195.118';
    private $db_name = 'todolist';
    private $username = 'Mars';
    private $password = 'Mars123//';
    private $conn;

    // DB Connect
    public function connect()
    {
        $this->conn = null;

        try {
            $this->conn = new PDO('mysql:host=' . $this->host . ';dbname=' . $this->db_name, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->exec("SET CHARACTER SET utf8");
        } catch (PDOException $e) {
            echo 'Connection Error: ' . $e->getMessage();
        }

        return $this->conn;
    }
}