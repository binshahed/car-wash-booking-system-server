import { Schema, model } from 'mongoose';
import { TUser, TUserModel } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

// Define the schema for the User model with validation messages
const userSchema = new Schema<TUser, TUserModel>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: [/\S+@\S+\.\S+/, 'Email is invalid'],
    },
    password: {
      type: String,
      select: 0,
      required: [true, 'Password is required'],
      minlength: [4, 'Password must be at least 4 characters long'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^\d{10}$/, 'Phone number must be 10 digits long'],
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
      required: [true, 'Role is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
        return ret;
      },
    },
  },
);

userSchema.pre('save', async function (next) {
  const user = this as TUser;
  // hash password
  user.password = await bcrypt.hash(user.password, Number(config.saltRound));
  next();
});

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await UserModel.findOne({ email }).select('+password');
};

export const UserModel = model<TUser, TUserModel>('User', userSchema);
