import { Post } from './post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PostService, PostResolver],
  exports: [PostService],
})
export class PostModule {}
