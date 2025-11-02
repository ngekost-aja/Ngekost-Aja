import express from "express";
import { json, urlencoded } from "body-parser";
import routes from "./routes";
import { logger, errorHandler } from "./middlewares";

const app = express();

// Middleware setup
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(logger);

// Routes setup
app.get("/", (req, res) => {
    res.redirect("/api");
});
app.use("/api", routes);

// Error handler
app.use(errorHandler);

export default app;
