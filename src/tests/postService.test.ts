import PostService from '../services/postService';
import PostModel from '../models/postModel';
import { IPost } from '../interfaces/IPost';

jest.mock('../models/postModel');

describe('PostService', () => {
  it('deve criar um novo post', async () => {
    const newPost: IPost = { title: 'Test Title', content: 'Test Content', author: 'Test Author' };
    (PostModel.create as jest.Mock).mockResolvedValue(newPost);

    const createdPost = await PostService.createPost(newPost);
    expect(createdPost).toEqual(newPost);
  });
});