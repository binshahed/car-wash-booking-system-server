import config from '../../config';
import { TUser } from '../user/user.interface';
import { UserModel } from '../user/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const signUpUser = async (payload: TUser) => {
  const user = await UserModel.create(payload);
  return user;
};

const loginUser = async (payload: { email: string; password: string }) => {
  const user = await UserModel.isUserExistsByEmail(payload.email);

  if (!user) {
    throw new Error('Invalid email or password');
  }
  const isPasswordValid = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  // Destructure user to omit password

  const userWithoutPassword = await UserModel.findById(user?._id);

  const token = jwt.sign(
    {
      data: user,
    },
    config.jwtSecret as string,
    { expiresIn: '1h' },
  );

  return {
    token: token,
    data: userWithoutPassword,
  };
};

export const userService = {
  signUpUser,
  loginUser,
};
