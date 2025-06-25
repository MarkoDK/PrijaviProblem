import express from 'express';
import { getHello } from '../controllers/helloController.js';

const router = express.Router();

/**
 * @swagger
 * /hello:
 *   get:
 *     summary: Returns a hello message
 *     responses:
 *       200:
 *         description: Successful response with a hello message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello from backend!
 */
router.get('/hello', getHello);


export default router;
