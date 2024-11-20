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
  role: string,
): Promise<IUser> => {
  return UserRepository.createUser(username, email, password, role);
};

const updateUser = async (userId: string, userData: Partial<IUser>): Promise<IUser | null> => {
  return UserRepository.updateUser(userId, userData);
};

const listAllUsers = async (): Promise<Omit<IUser, "password">[]> => {
  return UserRepository.findAll();
};

const deleteUser = async (userId: string): Promise<void> => {
  return UserRepository.deleteUser(userId);
};

export default { validateUser, getUserById, createUser, listAllUsers, deleteUser, updateUser };
