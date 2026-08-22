import { Request, Response } from 'express';
import { Booking } from '../models/Booking.js';
import { Session } from '../models/Session.js';

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { userId, sessionId } = req.body;

    if (!userId || !sessionId) {
      return res.status(400).json({ message: 'userId and sessionId are required' });
    }

    // Check double booking using 'booked'
    const alreadyBooked = await Booking.findOne({
      user: userId,
      session: sessionId,
      status: 'booked'
    });

    if (alreadyBooked) {
      return res.status(400).json({ message: 'You have already booked this session' });
    }

    // Check session capacity
    const targetSession = await Session.findById(sessionId);
    if (!targetSession) {
      return res.status(404).json({ message: 'Session not found' });
    }

    const activeBookings = await Booking.countDocuments({
      session: sessionId,
      status: 'booked'
    });

    if (activeBookings >= targetSession.capacity) {
      return res.status(400).json({ message: 'Session capacity is full' });
    }

    const newBooking = await Booking.create({
      user: userId,
      session: sessionId
    });

    return res.status(201).json({
      success: true,
      data: newBooking
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err });
  }
};

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking record not found' });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Booking is already cancelled' });
    }

    booking.status = 'cancelled';
    await booking.save();

    return res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      data: booking
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err });
  }
};

export const getUserBookings = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const userBookings = await Booking.find({
      user: userId,
      status: 'booked'
    }).populate('session');

    return res.status(200).json({
      success: true,
      count: userBookings.length,
      data: userBookings
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err });
  }
};