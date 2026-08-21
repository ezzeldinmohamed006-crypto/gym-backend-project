import { Schema, model, Document, Types } from 'mongoose';

export interface IBooking extends Document {
  user: Types.ObjectId;
  session: Types.ObjectId;
  status: 'booked' | 'cancelled';
  createdAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required']
    },
    session: {
      type: Schema.Types.ObjectId,
      ref: 'Session',
      required: [true, 'Session ID is required']
    },
    status: {
      type: String,
      enum: ['booked', 'cancelled'],
      default: 'booked'
    }
  },
  { 
    timestamps: true 
  }
);

export const Booking = model<IBooking>('Booking', bookingSchema);