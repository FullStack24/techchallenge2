import PostRepository from '../repositories/postRepository'; // Importando o repositório
import { IPost } from '../interfaces/IPost'; // Importando a interface IPost

class PostService {
  async createPost(data: IPost): Promise<IPost> {
    return PostRepository.create(data); // Chama o método do repositório
  }

  async getAllPosts(): Promise<IPost[]> {
    return PostRepository.findAll(); // Chama o método do repositório
  }

  async getPostById(id: number): Promise<IPost | null> {
    return PostRepository.findById(id); // Chama o método do repositório
  }

  async updatePost(id: number, data: Partial<IPost>): Promise<IPost | null> {
    return PostRepository.update(id, data); // Chama o método do repositório
  }

  async deletePost(id: number): Promise<void> {
    await PostRepository.delete(id); // Chama o método do repositório
  }

  async searchPosts(keyword: string): Promise<IPost[]> {
    return PostRepository.search(keyword); // Chama o método do repositório
  }
}

export default new PostService(); // Exporta uma instância do serviço