const express = require("express");
const router = express.Router();
const foodItemController = require("../controllers/FoodItem.controller");

// Uses global Swagger components from config/swaggerComponents.js

/**
 * @swagger
 * /api/v1/food-items:
 *   post:
 *     tags: [FoodItem]
 *     summary: Create a new food item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FoodItem'
 *     responses:
 *       201:
 *         description: Food item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FoodItem'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", foodItemController.createFoodItem);

/**
 * @swagger
 * /api/v1/food-items/{id}:
 *   put:
 *     tags: [FoodItem]
 *     summary: Update a food item by ID
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
 *             $ref: '#/components/schemas/FoodItem'
 *     responses:
 *       200:
 *         description: Food item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FoodItem'
 *       404:
 *         description: Food item not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", foodItemController.updateFoodItem);

/**
 * @swagger
 * /api/v1/food-items:
 *   get:
 *     tags: [FoodItem]
 *     summary: Get all food items
 *     responses:
 *       200:
 *         description: Food items fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FoodItem'
 */
router.get("/", foodItemController.getAllFoodItems);

/**
 * @swagger
 * /api/v1/food-items/{id}:
 *   get:
 *     tags: [FoodItem]
 *     summary: Get a food item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Food item fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FoodItem'
 *       404:
 *         description: Food item not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", foodItemController.getFoodItemById);

/**
 * @swagger
 * /api/v1/food-items/restaurant/{id}:
 *   get:
 *     tags: [FoodItem]
 *     summary: Get food items by restaurant ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Food items fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FoodItem'
 *       404:
 *         description: Food items not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/restaurant/:id", foodItemController.getFoodItemsByRestaurantId);

/**
 * @swagger
 * /api/v1/food-items/{id}:
 *   delete:
 *     tags: [FoodItem]
 *     summary: Delete a food item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Food item deleted successfully
 *       404:
 *         description: Food item not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", foodItemController.deleteFoodItem);

module.exports = router;
