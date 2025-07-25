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
 */
router.post("/register", authController.register);

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
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - userName
 *               - password
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
 */
router.delete("/deleteUser/:id", authController.deleteProfile);

module.exports = router;
