import PostRepository from "../repositories/postRepository";
import PostService from "../services/postService";
import { IPost } from "../interfaces/IPost";

jest.mock("../repositories/postRepository", () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    search: jest.fn(),
  };
});

describe("PostService", () => {
  const newPost: IPost = {
    title: "Test Title",
    content: "Test Content",
    author: "Test Author",
  };
  const createdPostMock: IPost = {
    id: "1",
    ...newPost,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const postsMock: IPost[] = [
    {
      id: "1",
      title: "Post 1",
      content: "Content 1",
      author: "Author 1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      title: "Post 2",
      content: "Content 2",
      author: "Author 2",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("deve criar um novo post", async () => {
    (PostRepository.create as jest.Mock).mockResolvedValue(createdPostMock);

    const createdPost = await PostService.createPost(newPost);
    expect(createdPost).toEqual(createdPostMock);
    expect(PostRepository.create).toHaveBeenCalledWith(newPost);
  });

  it("deve obter um post por ID", async () => {
    (PostRepository.findById as jest.Mock).mockResolvedValue(createdPostMock);

    const foundPost = await PostService.getPostById("1");
    expect(foundPost).toEqual(createdPostMock);
    expect(PostRepository.findById).toHaveBeenCalledWith("1");
  });

  it("deve atualizar um post", async () => {
    const updatedPostMock: IPost = {
      ...createdPostMock,
      title: "Updated Title",
    };
    (PostRepository.update as jest.Mock).mockResolvedValue(updatedPostMock);

    const updatedPost = await PostService.updatePost("1", {
      title: "Updated Title",
    });
    expect(updatedPost).toEqual(updatedPostMock);
    expect(PostRepository.update).toHaveBeenCalledWith("1", {
      title: "Updated Title",
    });
  });

  it("deve deletar um post", async () => {
    (PostRepository.delete as jest.Mock).mockResolvedValue(undefined);

    await PostService.deletePost("1");
    expect(PostRepository.delete).toHaveBeenCalledWith("1");
  });

  it("deve buscar posts por keyword", async () => {
    const keyword = "test";
    (PostRepository.search as jest.Mock).mockResolvedValue(postsMock);

    const result = await PostService.searchPosts(keyword);
    expect(result).toEqual(postsMock);
    expect(PostRepository.search).toHaveBeenCalledWith(keyword);
  });

  it("deve obter todos os posts", async () => {
    (PostRepository.findAll as jest.Mock).mockResolvedValue(postsMock);

    const result = await PostService.getAllPosts();
    expect(result).toEqual(postsMock);
    expect(PostRepository.findAll).toHaveBeenCalled();
  });
});
