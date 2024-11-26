import PostRepository from "../repositories/postRepository";
import { IPost } from "../interfaces/IPost";

class PostService {
  private postRepository: typeof PostRepository;

  constructor(postRepository: typeof PostRepository) {
    this.postRepository = postRepository;
  }

  async createPost(data: IPost): Promise<IPost> {
    return this.postRepository.create(data);
  }

  async getAllPosts(): Promise<IPost[]> {
    return this.postRepository.findAll();
  }

  async getPostById(id: string): Promise<IPost | null> {
    return this.postRepository.findById(id);
  }

  async updatePost(id: string, data: Partial<IPost>): Promise<IPost | null> {
    return this.postRepository.update(id, data);
  }

  async deletePost(id: string): Promise<void> {
    await this.postRepository.delete(id);
  }

  async searchPosts(keyword: string): Promise<IPost[]> {
    return this.postRepository.search(keyword);
  }

  async userLikedPost(userId: string, postId: string): Promise<boolean> {
    return await this.postRepository.userLikedPost(userId, postId);
  }

  async addLike(userId: string, postId: string): Promise<void> {
    await this.postRepository.addLike(userId, postId);
  }

  async incrementLikes(postId: string): Promise<IPost | null> {
    return this.postRepository.incrementLikes(postId);
  }
}

export default new PostService(PostRepository);
