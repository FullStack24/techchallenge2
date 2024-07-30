import UserRepository from "../repositories/userRepository";

const validateUser = async (username: string, password: string) => {
  return UserRepository.validateUser(username, password);
};

const getUserById = async (userId: number) => {
  return UserRepository.getUserById(userId);
};

const createUser = async (username: string, password: string) => {
  return UserRepository.createUser(username, password);
};

export default { validateUser, getUserById, createUser };
