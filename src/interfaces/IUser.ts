export interface IUser {
  id: string;
  username?: string;
  email?: string;
  password?: string;
  role: string,
  createdAt?: Date;
  updatedAt?: Date;
}
