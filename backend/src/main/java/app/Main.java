package main.java.app;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.sql.*;


public class Main {
    private static final int PORT = 8000;
    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(PORT), 0);
        server.createContext("/", new ItemsHandler());
        server.setExecutor(null);
        server.start();
        System.out.println("Server is running on http://localhost:" + PORT);
    }

    static class ItemsHandler implements HttpHandler {
        public void handle(HttpExchange exchange) throws IOException {
            if ("GET".equals(exchange.getRequestMethod())) {
                // something code right here
            } else if ("POST".equals(exchange.getRequestMethod())) {
                // something code right here
            }
        }
    }
}
