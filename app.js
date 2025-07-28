const DBConnect = require("./config/DBConnect");
const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./config/SwaggerConfig");
const userRoutes = require("./routes/User.routes");
const reestaurantRoutes = require("./routes/Restaurant.routes");

dotenv.config();
DBConnect();

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/restaurants", reestaurantRoutes);

module.exports = app;
