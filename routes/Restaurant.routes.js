const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/Restaurant.controller");
/**
 * @swagger
 * /api/v1/restaurants:
 *   post:
 *     tags: [Restaurant]
 *     summary: Create a new restaurant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restaurant'
 *     responses:
 *       201:
 *         description: Restaurant created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Restaurant already exists for this owner
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Owner not found
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
// Create a new restaurant
router.post("/", restaurantController.createRestaurant);
/**
 * @swagger
 * /api/v1/restaurants:
 *   get:
 *     tags: [Restaurant]
 *     summary: Get all restaurants
 *     responses:
 *       200:
 *         description: Restaurants fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurant'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Get all restaurants
router.get("/", restaurantController.getAllRestaurants);

/**
 * @swagger
 * /api/v1/restaurants/{id}:
 *   get:
 *     tags: [Restaurant]
 *     summary: Get a restaurant by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Restaurant fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *       404:
 *         description: Restaurant not found
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
// Get a restaurant by ID
router.get("/:id", restaurantController.getRestaurantById);

/**
 * @swagger
 * /api/v1/restaurants/{id}:
 *   put:
 *     tags: [Restaurant]
 *     summary: Update a restaurant by ID
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
 *     responses:
 *       200:
 *         description: Restaurant updated successfully
 *       404:
 *         description: Restaurant not found
 *       500:
 *         description: Internal server error
 */
// Update a restaurant by ID
router.put("/:id", restaurantController.updateRestaurant);

/**
 * @swagger
 * /api/v1/restaurants/{id}:
 *   delete:
 *     tags: [Restaurant]
 *     summary: Delete a restaurant by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Restaurant deleted successfully
 *       404:
 *         description: Restaurant not found
 *       500:
 *         description: Internal server error
 */
// Delete a restaurant by ID
router.delete("/:id", restaurantController.deleteRestaurant);

/**
 * @swagger
 * /api/v1/restaurants/user/{userId}:
 *   get:
 *     tags: [Restaurant]
 *     summary: Get a restaurant by userId (ownerId)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Restaurant fetched successfully
 *       404:
 *         description: Restaurant not found for this user
 *       500:
 *         description: Internal server error
 */
// Get a restaurant by userId (ownerId)
router.get("/user/:userId", restaurantController.getRestaurantByUserId);

module.exports = router;
