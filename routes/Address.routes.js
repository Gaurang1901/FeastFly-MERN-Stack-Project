const express = require("express");
const router = express.Router();
const addressController = require("../controllers/Address.controller");

/**
 * @swagger
 * tags:
 *   name: Address
 *   description: Address management
 */

// Uses global Swagger components from config/swaggerComponents.js

/**
 * @swagger
 * /api/v1/address:
 *   post:
 *     tags: [Address]
 *     summary: Create a new address
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       201:
 *         description: Address created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", addressController.createAddress);

/**
 * @swagger
 * /api/v1/address:
 *   get:
 *     tags: [Address]
 *     summary: Get all addresses
 *     responses:
 *       200:
 *         description: Addresses fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Address'
 */
router.get("/", addressController.getAllAddresses);

/**
 * @swagger
 * /api/v1/address/{id}:
 *   get:
 *     tags: [Address]
 *     summary: Get an address by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Address fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 *       404:
 *         description: Address not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", addressController.getAddressById);

/**
 * @swagger
 * /api/v1/address/{id}:
 *   put:
 *     tags: [Address]
 *     summary: Update an address by ID
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
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       200:
 *         description: Address updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 *       404:
 *         description: Address not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", addressController.updateAddress);

/**
 * @swagger
 * /api/v1/address/{id}:
 *   delete:
 *     tags: [Address]
 *     summary: Delete an address by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Address deleted successfully
 *       404:
 *         description: Address not found
 */
router.delete("/:id", addressController.deleteAddress);

/**
 * @swagger
 * /api/v1/address/user/{id}:
 *   get:
 *     tags: [Address]
 *     summary: Get an address by userId
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Address fetched successfully
 *       404:
 *         description: Address not found
 */
router.get("/user/:id", addressController.getAddressesByUser);

/**
 * @swagger
 * /api/v1/address/restaurant/{id}:
 *   get:
 *     tags: [Address]
 *     summary: Get an address by restaurantId
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Address fetched successfully
 *       404:
 *         description: Address not found
 */
router.get("/restaurant/:id", addressController.getAddressesByRestaurant);

module.exports = router;
