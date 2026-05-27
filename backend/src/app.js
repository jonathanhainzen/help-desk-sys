const cors = require("cors");
const express = require("express");

const healthRoutes = require("./routes/health.routes");
const { errorHandler } = require("./middlewares/error-handler");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/health", healthRoutes);

app.use(errorHandler);

module.exports = { app };
