const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "FeastFly API",
      version: "1.0.0",
      description: "API documentation for FeastFly - Food Ordering System",
    },
    servers: [{ url: "http://localhost:5000" }],
  },
  apis: ["./routes/*.js"], // <-- Change this line
};

module.exports = swaggerJsDoc(options);
