import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { CreateUserInput } from './user.input';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { SiginInPayload } from './signIn.entity';

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @UseGuards(new AuthGuard())
  @Query(() => [User])
  async getAllUsers() {
    return this.authService.getAllUsers();
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.authService.signUp(createUserInput);
  }

  @Mutation(() => SiginInPayload)
  async signIn(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(createUserInput);
  }
}
