const DBConnect = require("./config/DBConnect");
const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
const logger = require("./utils/logger").default;
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./config/SwaggerConfig");
const userRoutes = require("./routes/User.routes");
const reestaurantRoutes = require("./routes/Restaurant.routes");

// Load environment variables
dotenv.config();

// Connect to the database
DBConnect();

// Initialize express app
const app = express();
app.use(express.json());

// Enable CORS
app.use(cors());

// Set up Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Set up routes
app.use("/api/auth/", userRoutes);
app.use("/api/v1/restaurants", reestaurantRoutes);

// Error handling middleware
const morganFormat = ":method :url :status :response-time ms";
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        console.log(message);

        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

module.exports = app;
