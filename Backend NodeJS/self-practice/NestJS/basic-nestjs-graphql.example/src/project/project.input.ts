import { MinLength } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProjectInput {
  @MinLength(2)
  @Field()
  name: string;
}
