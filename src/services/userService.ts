import UserRepository from "../repositories/userRepository";
import { IUser } from "../interfaces/IUser";

const validateUser = async (
  email: string,
  password: string,
): Promise<IUser | null> => {
  return UserRepository.validateUser(email, password);
};

const getUserById = async (userId: string): Promise<IUser | null> => {
  return UserRepository.getUserById(userId);
};

const createUser = async (
  username: string,
  email: string,
  password: string,
): Promise<IUser> => {
  return UserRepository.createUser(username, email, password);
};

const listAllUsers = async (): Promise<Omit<IUser, "password">[]> => {
  return UserRepository.findAll();
};

export default { validateUser, getUserById, createUser, listAllUsers };
