const express = require("express");
const router = express.Router();
const discountCouponService = require("../controllers/DiscountCoupon.controller");

// Uses global Swagger components from config/swaggerComponents.js

/**
 * @swagger
 * /api/v1/discount-coupons:
 *   post:
 *     tags: [DiscountCoupon]
 *     summary: Create a new discount coupon
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DiscountCoupon'
 *     responses:
 *       201:
 *         description: Discount coupon created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DiscountCoupon'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", discountCouponService.createDiscountCoupon);

/**
 * @swagger
 * /api/v1/discount-coupons/{id}:
 *   put:
 *     tags: [DiscountCoupon]
 *     summary: Update a discount coupon by ID
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
 *             $ref: '#/components/schemas/DiscountCoupon'
 *     responses:
 *       200:
 *         description: Discount coupon updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DiscountCoupon'
 *       404:
 *         description: Discount coupon not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", discountCouponService.updateDiscountCoupon);

/**
 * @swagger
 * /api/v1/discount-coupons:
 *   get:
 *     tags: [DiscountCoupon]
 *     summary: Get all discount coupons
 *     responses:
 *       200:
 *         description: Discount coupons fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DiscountCoupon'
 */
router.get("/", discountCouponService.getAllDiscountCoupons);

/**
 * @swagger
 * /api/v1/discount-coupons/{id}:
 *   get:
 *     tags: [DiscountCoupon]
 *     summary: Get a discount coupon by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Discount coupon fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DiscountCoupon'
 *       404:
 *         description: Discount coupon not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", discountCouponService.getDiscountCouponById);

/**
 * @swagger
 * /api/v1/discount-coupons/restaurant/{id}:
 *   get:
 *     tags: [DiscountCoupon]
 *     summary: Get discount coupons by restaurant ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Discount coupons fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DiscountCoupon'
 *       404:
 *         description: Discount coupons not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/restaurant/:id", discountCouponService.getDiscountCouponsByRestaurant);

/**
 * @swagger
 * /api/v1/discount-coupons/{id}:
 *   delete:
 *     tags: [DiscountCoupon]
 *     summary: Delete a discount coupon by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Discount coupon deleted successfully
 *       404:
 *         description: Discount coupon not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", discountCouponService.deleteDiscountCoupon);

module.exports = router;
