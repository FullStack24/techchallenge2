import UserRepository from "../repositories/userRepository";
import { IUser } from "../interfaces/IUser";

const validateUser = async (
  username: string,
  password: string,
): Promise<IUser | null> => {
  return UserRepository.validateUser(username, password);
};

const getUserById = async (userId: string): Promise<IUser | null> => {
  return UserRepository.getUserById(userId);
};

const createUser = async (
  username: string,
  password: string,
): Promise<IUser> => {
  return UserRepository.createUser(username, password);
};

export default { validateUser, getUserById, createUser };
