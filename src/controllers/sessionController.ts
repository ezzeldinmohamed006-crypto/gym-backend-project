import { Request, Response } from 'express';
import { Session } from '../models/Session.js';
import { Booking } from '../models/Booking.js';

export const createSession = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, trainer, date, startTime, endTime, capacity } = req.body;

    const sessionDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (sessionDate < today) {
      res.status(400).json({
        success: false,
        message: 'Session date must be in the future'
      });
      return;
    }

    const session = await Session.create({
      title,
      trainer,
      date,
      startTime,
      endTime,
      capacity
    });

    res.status(201).json({
      success: true,
      message: 'Session created successfully',
      data: session
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getSessions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, date, trainer } = req.query;

    const filter: Record<string, any> = {};

    if (title) {
      filter.title = { $regex: title as string, $options: 'i' };
    }
    if (date) {
      filter.date = new Date(date as string);
    }
    if (trainer) {
      filter.trainer = trainer;
    }

    const sessions = await Session.find(filter).populate('trainer', 'fullName email');

    res.status(200).json({
      success: true,
      count: sessions.length,
      data: sessions
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getSessionById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { sessionId } = req.params;

    const session = await Session.findById(sessionId).populate('trainer', 'fullName email');

    if (!session) {
      res.status(404).json({ message: 'Session not found' });
      return;
    }

    res.status(200).json({ success: true, data: session });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteSession = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { sessionId } = req.params;

    
    const activeBooking = await Booking.findOne({
      session: sessionId,
      status: 'booked'
    });

    if (activeBooking) {
      res.status(400).json({
        success: false,
        message: 'Cannot delete session with active bookings'
      });
      return;
    }

    const session = await Session.findByIdAndDelete(sessionId);

    if (!session) {
      res.status(404).json({ message: 'Session not found' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Session deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateSession = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { sessionId } = req.params;

    if (req.body.date) {
      const sessionDate = new Date(req.body.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (sessionDate < today) {
        res.status(400).json({
          success: false,
          message: 'Session date must be in the future'
        });
        return;
      }
    }

    const session = await Session.findByIdAndUpdate(sessionId, req.body, {
      new: true,
      runValidators: true
    });

    if (!session) {
      res.status(404).json({ message: 'Session not found' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Session updated successfully',
      data: session
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
