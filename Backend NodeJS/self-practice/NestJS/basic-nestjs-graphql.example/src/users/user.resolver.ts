import { Project } from '../project/project.entity';
import { CreateUserInput } from './user.input';
import { UsersService } from './users.service';
import {
  Query,
  Args,
  Resolver,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { User } from './user.entity';

@Resolver(() => User)
export class UserResolver {
  private logger = new Logger('UserResolver');

  constructor(private usersService: UsersService) {}

  @Query(() => [User])
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Query(() => User)
  async getUserById(@Args('id') id: string) {
    // this.logger.log('Get User By ID');
    return this.usersService.getUserByID(id);
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.createUser(createUserInput);
  }

  @Mutation(() => String)
  async deleteUser(@Args('id') id: string) {
    return this.usersService.deleteUser(id);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: string,
    @Args('createUserInput') createUserInput: CreateUserInput,
  ) {
    return this.usersService.updateUser(id, createUserInput);
  }

  // --TO GET PROJECT FROM USER we have take care 2 things 1st the method name(project) is same as defined in the entity o/w its will not work 2nd one to get project we need id of the project which is avialble as projectid in thr parent
  @ResolveField(() => Project)
  project(@Parent() user: User) {
    return this.usersService.getProject(user.projectId);
  }
}
