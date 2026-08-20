import { Request, Response, NextFunction } from 'express';

export const validateSession = (
  req: Request,res: Response,next: NextFunction): void => {
  const {title,trainer,date,startTime,endTime,capacity} 
  = req.body;

  if (!title ||!trainer ||!date ||!startTime ||!endTime ||capacity === undefined) {
    res.status(400).json({
      message: 'All session fields are required'
    });
    return;
  }

  if (typeof capacity !== 'number' || capacity < 1) {
    res.status(400).json({
      message: 'Capacity must be a number greater than 0'
    });
    return;
  }

  next();
};