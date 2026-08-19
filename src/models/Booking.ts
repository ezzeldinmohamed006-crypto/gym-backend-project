import { Schema, model, Document, Types } from 'mongoose';

export interface IBooking extends Document {
  user: Types.ObjectId;
  session: Types.ObjectId;
  status: 'confirmed' | 'cancelled';
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
      enum: ['confirmed', 'cancelled'],
      default: 'confirmed'
    }
  },
  { 
    timestamps: true 
  }
);

export const Booking = model<IBooking>('Booking', bookingSchema);