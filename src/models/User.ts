import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  fullName: { 
    type: String, 
    required: [true, 'Full name is required'],
    trim: true
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'], 
    unique: true, 
    lowercase: true, 
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'] 
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'] 
  },
  role: { 
    type: String, 
    enum: ['Member', 'Trainer'], 
    required: [true, 'Role is required'] 
  }
}, { 
  timestamps: true 
});

export const User = model('User', UserSchema);
