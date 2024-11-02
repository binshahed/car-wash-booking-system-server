/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TUserRole = 'admin' | 'user';

export type TUser = {
  _id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: TUserRole;
  address: string;
  photoUrl: string;
};

export interface TUserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser>;
}
