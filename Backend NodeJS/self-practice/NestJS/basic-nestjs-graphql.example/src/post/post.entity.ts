import { Category } from './../category/category.entity';
import { User } from './../auth/user.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';

@ObjectType()
@Entity()
export class Post {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  header: string;

  @Field()
  @Column()
  body: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts)
  @Exclude({ toPlainOnly: true })
  user: User;

  @Field()
  @Column()
  userId: string;

  @Field()
  @Column()
  categoryId: string;

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.posts)
  category: Category;
}
