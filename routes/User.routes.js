const express = require("express");
const router = express.Router();
const authController = require("../controllers/Auth.Controller");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     description: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - userName
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/register", authController.register);

// Uses global Swagger components from config/swaggerComponents.js

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     description: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid username or password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /api/auth/profile/{id}:
 *   get:
 *     tags: [Auth]
 *     description: Get user profile by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get("/profile/:id", authController.getUserProfile);

/**
 * @swagger
 * /api/auth/profile/{id}:
 *   put:
 *     tags: [Auth]
 *     description: Update user profile by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               profilePhoto:
 *                 type: string
 *             required:
 *               - userName
 *               - email
 *               - phoneNumber
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put("/profile/:id", authController.updateProfile);

/**
 * @swagger
 * /api/auth/deleteUser/{id}:
 *   delete:
 *     tags: [Auth]
 *     description: Delete user profile by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.delete("/deleteUser/:id", authController.deleteProfile);

module.exports = router;
