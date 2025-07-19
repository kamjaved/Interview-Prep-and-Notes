import {
  IsOptional,
  MinLength,
  IsEmail,
  MaxLength,
  Matches,
  IsUUID,
} from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
// import {} from 'uuid'

@InputType()
export class CreateUserInput {
  @Field({ nullable: true })
  @IsUUID()
  @IsOptional()
  id?: string;

  @Field({ nullable: true })
  @MinLength(1)
  @IsOptional()
  firstName?: string;

  @Field({ nullable: true })
  @MinLength(1)
  @IsOptional()
  lastName?: string;

  @Field({ nullable: true })
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password?: string;
}
