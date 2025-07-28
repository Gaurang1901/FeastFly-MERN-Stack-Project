const DBConnect = require("./config/DBConnect");
const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
const logger = require("./utils/logger").default;
const morgan = require("morgan");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./config/SwaggerConfig");

const userRoutes = require("./routes/User.routes");
const restaurantRoutes = require("./routes/Restaurant.routes");
const addressRoutes = require("./routes/Address.routes");
const orderRoutes = require("./routes/Order.routes");
const discountCouponRoutes = require("./routes/DiscountCoupon.routes");
const categoryRoutes = require("./routes/Category.routes");
const foodItemRoutes = require("./routes/FoodItem.routes");
const ingredientRoutes = require("./routes/Ingredient.routes");

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
app.use("/api/v1/restaurants", restaurantRoutes);
app.use("/api/v1/address", addressRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/discount-coupons", discountCouponRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/food-items", foodItemRoutes);
app.use("/api/v1/ingredients", ingredientRoutes);
// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ message: "Resource not found" });
});

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
