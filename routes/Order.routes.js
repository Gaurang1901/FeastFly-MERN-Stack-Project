const express = require("express");
const router = express.Router();
const orderController = require("../controllers/Order.controller");

// Uses global Swagger components from config/swaggerComponents.js

/**
 * @swagger
 * /api/v1/orders:
 *   post:
 *     tags: [Order]
 *     summary: Create a new order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", orderController.createOrder);

/**
 * @swagger
 * /api/v1/orders/{id}:
 *   put:
 *     tags: [Order]
 *     summary: Update an order by ID
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
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", orderController.updateOrder);

/**
 * @swagger
 * /api/v1/orders:
 *   get:
 *     tags: [Order]
 *     summary: Get all orders
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.get("/", orderController.getAllOrders);

/**
 * @swagger
 * /api/v1/orders/{id}:
 *   get:
 *     tags: [Order]
 *     summary: Get an order by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", orderController.getOrderById);

/**
 * @swagger
 * /api/v1/orders/user/{id}:
 *   get:
 *     tags: [Order]
 *     summary: Get orders by user ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       404:
 *         description: Orders not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/user/:id", orderController.getOrderByUserId);

/**
 * @swagger
 * /api/v1/orders/restaurant/{id}:
 *   get:
 *     tags: [Order]
 *     summary: Get orders by restaurant ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       404:
 *         description: Orders not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/restaurant/:id", orderController.getOrderByRestaurantId);

/**
 * @swagger
 * /api/v1/orders/{id}:
 *   delete:
 *     tags: [Order]
 *     summary: Delete an order by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
