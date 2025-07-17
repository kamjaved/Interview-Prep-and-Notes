import { IsOptional, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field({ nullable: true })
  @MinLength(1)
  firstName?: string;

  @Field({ nullable: true })
  @MinLength(1)
  lastName?: string;

  @Field({ nullable: true })
  @IsOptional()
  age?: number;

  @Field({ nullable: true })
  @MinLength(1)
  @IsOptional()
  company?: string;

  @Field({ nullable: true })
  projectId: string;
}
