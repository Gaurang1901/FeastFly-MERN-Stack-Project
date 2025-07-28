const express = require("express");
const router = express.Router();
const ingredientController = require("../controllers/Ingredient.controller");

// Uses global Swagger components from config/swaggerComponents.js

/**
 * @swagger
 * /api/v1/ingredients:
 *   post:
 *     tags: [Ingredient]
 *     summary: Create a new ingredient
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ingredient'
 *     responses:
 *       201:
 *         description: Ingredient created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", ingredientController.createIngredient);

/**
 * @swagger
 * /api/v1/ingredients/{id}:
 *   put:
 *     tags: [Ingredient]
 *     summary: Update an ingredient by ID
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
 *             $ref: '#/components/schemas/Ingredient'
 *     responses:
 *       200:
 *         description: Ingredient updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 *       404:
 *         description: Ingredient not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", ingredientController.updateIngredient);

/**
 * @swagger
 * /api/v1/ingredients:
 *   get:
 *     tags: [Ingredient]
 *     summary: Get all ingredients
 *     responses:
 *       200:
 *         description: Ingredients fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ingredient'
 */
router.get("/", ingredientController.getAllIngredients);

/**
 * @swagger
 * /api/v1/ingredients/{id}:
 *   get:
 *     tags: [Ingredient]
 *     summary: Get an ingredient by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ingredient fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 *       404:
 *         description: Ingredient not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", ingredientController.getIngredientById);

/**
 * @swagger
 * /api/v1/ingredients/restaurant/{id}:
 *   get:
 *     tags: [Ingredient]
 *     summary: Get ingredients by restaurant ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ingredients fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ingredient'
 *       404:
 *         description: Ingredients not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/restaurant/:id", ingredientController.getIngredientsByRestaurant);

/**
 * @swagger
 * /api/v1/ingredients/{id}:
 *   delete:
 *     tags: [Ingredient]
 *     summary: Delete an ingredient by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ingredient deleted successfully
 *       404:
 *         description: Ingredient not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", ingredientController.deleteIngredient);

module.exports = router;
