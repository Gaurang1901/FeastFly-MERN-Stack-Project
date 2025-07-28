/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         userName:
 *           type: string
 *         email:
 *           type: string
 *         role:
 *           type: string
 *     LoginRequest:
 *       type: object
 *       required:
 *         - userName
 *         - password
 *       properties:
 *         userName:
 *           type: string
 *         password:
 *           type: string
 *     Error:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *         message:
 *           type: string
 *     Address:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         street:
 *           type: string
 *         city:
 *           type: string
 *         state:
 *           type: string
 *         pincode:
 *           type: string
 *     Restaurant:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         address:
 *           $ref: '#/components/schemas/Address'
 *         cuisine:
 *           type: string
 *         ownerId:
 *           type: string
 *         restaurantCategory:
 *           type: string
 *         email:
 *           type: string
 *         openingTime:
 *           type: string
 *         closingTime:
 *           type: string
 *         contactDetails:
 *           type: string
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         userId:
 *           type: string
 *         restaurantId:
 *           type: string
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               foodItemId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *         totalPrice:
 *           type: number
 *         status:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *     DiscountCoupon:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         code:
 *           type: string
 *         discount:
 *           type: number
 *         restaurantId:
 *           type: string
 *         validTill:
 *           type: string
 *           format: date-time
 *     FoodItem:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         categoryId:
 *           type: string
 *         restaurantId:
 *           type: string
 *         ingredients:
 *           type: array
 *           items:
 *             type: string
 *     Ingredient:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         restaurantId:
 *           type: string
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *   
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */ 