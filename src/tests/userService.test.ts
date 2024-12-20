import userService from "../services/userService";
import UserRepository from "../repositories/userRepository";
import { IUser } from "../interfaces/IUser";

jest.mock("../repositories/userRepository", () => {
  return {
    validateUser: jest.fn(),
    getUserById: jest.fn(),
    createUser: jest.fn(),
    findAll: jest.fn(),
  };
});

describe("UserService", () => {
  const createdUserMock: IUser = {
    id: "1",
    username: "newuser",
    email: "email@email.com",
    password: "newpassword",
    role: "professor",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const userListMock: Omit<IUser, "password">[] = [
    {
      id: "1",
      username: "user1",
      email: "email1@email.com",
      role: "professor",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      username: "user2",
      email: "email2@email.com",
      role: "aluno",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("deve validar um usuário e retornar o usuário se as credenciais forem válidas", async () => {
    (UserRepository.validateUser as jest.Mock).mockResolvedValue(
      createdUserMock,
    );

    const result = await userService.validateUser("newuser", "newpassword");
    expect(result).toEqual(createdUserMock);
    expect(UserRepository.validateUser).toHaveBeenCalledWith(
      "newuser",
      "newpassword",
    );
  });

  it("deve obter um usuário por ID", async () => {
    (UserRepository.getUserById as jest.Mock).mockResolvedValue(
      createdUserMock,
    );

    const result = await userService.getUserById("1");
    expect(result).toEqual(createdUserMock);
    expect(UserRepository.getUserById).toHaveBeenCalledWith("1");
  });

  it("deve criar um novo usuário e retorná-lo", async () => {
    (UserRepository.createUser as jest.Mock).mockResolvedValue(createdUserMock);

    const result = await userService.createUser("newuser", "newemail","newpassword", "professor");
    expect(result).toEqual(createdUserMock);
    expect(UserRepository.createUser).toHaveBeenCalledWith(
      "newuser",
      "newemail",
      "newpassword",
        "professor",
    );
  });

  it("deve listar todos os usuários, omitindo a senha", async () => {
    (UserRepository.findAll as jest.Mock).mockResolvedValue(
      userListMock as IUser[],
    );

    const result = await userService.listAllUsers();
    expect(result).toEqual(userListMock);
    expect(UserRepository.findAll).toHaveBeenCalled();
  });
});
