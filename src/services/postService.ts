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

  async getPostById(id: number): Promise<IPost | null> {
    return this.postRepository.findById(id);
  }

  async updatePost(id: number, data: Partial<IPost>): Promise<IPost | null> {
    return this.postRepository.update(id, data);
  }

  async deletePost(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }

  async searchPosts(keyword: string): Promise<IPost[]> {
    return this.postRepository.search(keyword);
  }
}

export default new PostService(PostRepository);
