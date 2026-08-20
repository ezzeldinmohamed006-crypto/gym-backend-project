import { Schema, model, Types, Document } from 'mongoose';

export interface ISession extends Document {
  title: string;
  trainer: Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  capacity: number;
}

const sessionSchema = new Schema<ISession>(
  {
    title: {
      type: String,
      required: [true, 'Session title is required'],
      trim: true
    },

    trainer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Trainer is required']
    },

    date: {
      type: Date,
      required: [true, 'Session date is required']
    },

    startTime: {
      type: String,
      required: [true, 'Start time is required']
    },

    endTime: {
      type: String,
      required: [true, 'End time is required']
    },

    capacity: {
      type: Number,
      required: [true, 'Capacity is required'],
      min: [1, 'Capacity must be at least 1']
    }
  },
  {
    timestamps: true
  }
);

export const Session = model<ISession>('Session', sessionSchema);