import { Router } from 'express';
import {
  createBooking,
  cancelBooking,
  getUserBookings
} from '../controllers/bookingController';

const router = Router();

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Create new booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               sessionId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Success
 */
router.post('/', createBooking);

/**
 * @swagger
 * /api/bookings/{bookingId}/cancel:
 *   patch:
 *     summary: Cancel booking
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cancelled successfully
 */
router.patch('/:bookingId/cancel', cancelBooking);

/**
 * @swagger
 * /api/bookings/user/{userId}:
 *   get:
 *     summary: Get user active bookings
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of bookings
 */
router.get('/user/:userId', getUserBookings);

export default router;