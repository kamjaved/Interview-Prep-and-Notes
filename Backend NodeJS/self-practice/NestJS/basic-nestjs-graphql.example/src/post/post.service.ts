import { CreatePostInput } from './post.input';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  // GET ALL post
  async getAllPost(): Promise<Post[]> {
    return this.postRepository.find({ relations: ['user', 'category'] });
  }

  // GET post BY ID
  async getPost(id: string): Promise<Post> {
    return this.postRepository.findOne({ id });
  }

  //  Create New post
  async createPost(createPostInput: CreatePostInput): Promise<Post> {
    const { header, body, userId, categoryId } = createPostInput;

    const post = this.postRepository.create({
      header,
      body,
      userId,
      categoryId,
    });
    return this.postRepository.save(post);
  }

  // DELETE POST


  async deleetPost(id: string): Promise<void> {
    const result = await this.postRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}
