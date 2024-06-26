import { TUser } from './user.interface';
import { UserModel } from './user.model';

const signUpUser = async (payload: TUser) => {
  const user = await UserModel.create(payload);
  return user;
};

export const userService = {
  signUpUser,
};
