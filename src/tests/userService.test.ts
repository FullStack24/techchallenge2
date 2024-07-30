import userService from "../services/userService";
import UserRepository from "../repositories/userRepository";

jest.mock("../repositories/userRepository");

describe("UserService", () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test("validateUser should return user if credentials are valid", async () => {
        const mockUser = { id: "1", username: "testuser", password: "testpassword", createdAt: new Date(), updatedAt: new Date() };
        (UserRepository.validateUser as jest.Mock).mockResolvedValue(mockUser);

        const result = await userService.validateUser("testuser", "testpassword");
        expect(result).toEqual(mockUser);
    });

    test("getUserById should return user if user exists", async () => {
        const mockUser = { id: "1", username: "testuser", password: "testpassword", createdAt: new Date(), updatedAt: new Date() };
        (UserRepository.getUserById as jest.Mock).mockResolvedValue(mockUser);

        const result = await userService.getUserById("1");
        expect(result).toEqual(mockUser);
    });

    test("createUser should create a new user and return it", async () => {
        const mockUser = { id: "1", username: "newuser", password: "newpassword", createdAt: new Date(), updatedAt: new Date() };
        (UserRepository.createUser as jest.Mock).mockResolvedValue(mockUser);

        const result = await userService.createUser("newuser", "newpassword");
        expect(result).toEqual(mockUser);
    });
});
