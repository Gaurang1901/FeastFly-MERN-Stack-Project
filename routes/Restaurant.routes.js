const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/Restaurant.controller");
/**
 * @swagger
 * /api/restaurant:
 *   post:
 *     tags: [Restaurant]
 *     summary: Create a new restaurant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               description: { type: string }
 *               address:
 *                 type: object
 *                 properties:
 *                   street: { type: string }
 *                   city: { type: string }
 *                   state: { type: string }
 *                   pincode: { type: string }
 *               cuisine: { type: string }
 *               ownerId: { type: string }
 *               restaurantCategory: { type: string }
 *               email: { type: string }
 *               openingTime: { type: string }
 *               closingTime: { type: string }
 *               contactDetails: { type: string }
 *             required:
 *               - name
 *               - address
 *               - ownerId
 *               - email
 *     responses:
 *       201:
 *         description: Restaurant created successfully
 *       400:
 *         description: Bad request
 *       409:
 *         description: Restaurant already exists for this owner
 *       404:
 *         description: Owner not found
 *       500:
 *         description: Internal server error
 */
// Create a new restaurant
router.post("/", restaurantController.createRestaurant);
/**
 * @swagger
 * /api/restaurant:
 *   get:
 *     tags: [Restaurant]
 *     summary: Get all restaurants
 *     responses:
 *       200:
 *         description: Restaurants fetched successfully
 *       500:
 *         description: Internal server error
 */
// Get all restaurants
router.get("/", restaurantController.getAllRestaurants);

/**
 * @swagger
 * /api/restaurant/{id}:
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
 *       404:
 *         description: Restaurant not found
 *       500:
 *         description: Internal server error
 */
// Get a restaurant by ID
router.get("/:id", restaurantController.getRestaurantById);

/**
 * @swagger
 * /api/restaurant/{id}:
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
 * /api/restaurant/{id}:
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
 * /api/restaurant/user/{userId}:
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
