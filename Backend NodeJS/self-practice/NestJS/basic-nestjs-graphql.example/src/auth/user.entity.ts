import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Post } from 'src/post/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  @Field(() => [Post])
  posts: Post[];
}
