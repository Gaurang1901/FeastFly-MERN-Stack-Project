# FeastFly - MERN Stack Food Ordering System

FeastFly is a full-featured food ordering system built using the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to browse restaurants, view menus, place orders, and manage their profiles. Restaurant owners can manage their restaurants, menus, and orders.

## Features

- User authentication and profile management
- Restaurant and menu management
- Food item and ingredient management
- Order placement and tracking
- Role-based access for users and restaurant owners
- RESTful API with Swagger documentation
- Secure password handling and JWT authentication

## Tech Stack

- **Frontend:** React.js (not included in this repo)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT, bcrypt
- **API Documentation:** Swagger

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Gaurang1901/FeastFly-MERN-Stack-Project.git
   cd FeastFly-MERN-Stack-Project
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   - Create a `.env` file in the root directory.
   - Add your MongoDB URI and JWT secret:
     ```env
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```
4. **Run the server:**
   ```bash
   npm start
   ```
   The server will start on the port specified in your `.env` file or default to 5000.

## API Documentation

- Swagger UI is available at `/api-docs` when the server is running.

## Folder Structure

- `controllers/` - Route controllers for handling requests
- `models/` - Mongoose models
- `routes/` - Express route definitions
- `services/` - Business logic separated from controllers
- `middlewares/` - Custom middleware functions
- `config/` - Database and Swagger configuration
- `utils/` - Utility functions (e.g., token generation)

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.
