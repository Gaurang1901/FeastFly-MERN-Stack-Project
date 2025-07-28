const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/Category.controller");

// Uses global Swagger components from config/swaggerComponents.js

/**
 * @swagger
 * /api/v1/categories:
 *   post:
 *     tags: [Category]
 *     summary: Create a new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", categoryController.createCategory);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   put:
 *     tags: [Category]
 *     summary: Update a category by ID
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
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", categoryController.updateCategory);

/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     tags: [Category]
 *     summary: Get all categories
 *     responses:
 *       200:
 *         description: Categories fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get("/", categoryController.getAllCategories);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   get:
 *     tags: [Category]
 *     summary: Get a category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", categoryController.getCategoryById);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   delete:
 *     tags: [Category]
 *     summary: Delete a category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
