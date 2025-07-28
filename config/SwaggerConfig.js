const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "FeastFly API",
      version: "1.0.0",
      description: "API documentation for FeastFly - Food Ordering System",
    },
    servers: [
      { url: "http://localhost:8080" },
      { url: "https://feastfly-mern-stack-project.onrender.com" },
    ], // <-- Add your server URLs here
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js", "./config/swaggerComponents.js"], // <-- Added global components file
};

module.exports = swaggerJsDoc(options);
