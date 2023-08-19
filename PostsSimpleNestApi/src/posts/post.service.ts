import { Injectable } from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  getPosts(): Promise<Post[]> {
    return this.postRepository.find();
  }

  createPost(post: PostDto): Promise<Post> {
    const newPost = new Post();
    newPost.autor = post.autor;
    newPost.conteudo = post.conteudo;
    newPost.dataPublicacao = post.dataPublicacao;
    newPost.isActive = post.isActive;

    return this.postRepository.save(newPost);
  }

  getPost(id: number): Promise<Post> {
    return this.postRepository.findOneBy({ id: id });
  }

  async editPost(id: number, post: PostDto): Promise<Post> {
    const postUpdated = await this.postRepository.findOneBy({ id: id });
    postUpdated.autor = post.autor;
    postUpdated.conteudo = post.conteudo;
    postUpdated.dataPublicacao = post.dataPublicacao;
    postUpdated.isActive = post.isActive;

    return this.postRepository.save(postUpdated);
  }

  deletePost(id: number): Promise<DeleteResult> {
    return this.postRepository.delete(id);
  }
}
