import express from "express";
import { json, urlencoded } from "body-parser";
import { logger, errorHandler } from "./middlewares";
import { RegisterRoutes } from "./routes/routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "@/docs/swagger.json";

const app = express();

// Middleware setup
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(logger);

RegisterRoutes(app);

// Express routing
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Ngekost-Aja API",
    version: "1.0.0",
    status: "active",
  });
});

// Swagger UI docs
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handler
app.use(errorHandler);

export default app;
