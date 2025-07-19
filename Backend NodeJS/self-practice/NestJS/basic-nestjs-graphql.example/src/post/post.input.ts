import { IsOptional, IsUUID, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field({ nullable: true })
  @MinLength(1)
  @IsOptional()
  header?: string;

  @Field({ nullable: true })
  @MinLength(1)
  @IsOptional()
  body?: string;

  @Field()
  @IsUUID()
  userId: string;

  @Field()
  @IsUUID()
  categoryId: string;
}
