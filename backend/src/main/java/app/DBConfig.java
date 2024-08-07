package main.java.app;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;


public class DBConfig {
    private static final String URL = "";
    private static final String USER = "root";
    private static final String PASSWORD = "password";

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}
