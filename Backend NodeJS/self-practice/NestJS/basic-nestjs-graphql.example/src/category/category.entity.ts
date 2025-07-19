import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/post/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@ObjectType()
@Entity()
export class Category {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  name: string;

  @OneToMany(() => Post, (post) => post.category)
  @Field(() => [Post])
  posts: Post[];
}
