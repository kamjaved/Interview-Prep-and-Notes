import { IsOptional, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  @Field({ nullable: true })
  @MinLength(1)
  @IsOptional()
  name?: string;
}
