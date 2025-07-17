import { Project } from './project.entity';
import { CreateProjectInput } from './project.input';
import { ProjectService } from './project.service';
import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private projectService: ProjectService) {}

  @Query(() => [Project])
  async getAllProject() {
    return this.projectService.getAllProject();
  }

  @Query(() => Project)
  async getProjectByID(@Args('id') id: string) {
    return this.projectService.getProjectById(id);
  }

  @Mutation(() => Project)
  async createProject(
    @Args('createProjectInput') createProjectInput: CreateProjectInput,
  ) {
    return this.projectService.createProject(createProjectInput);
  }

  @Mutation(() => Project)
  async updateProject(
    @Args('id') id: string,
    @Args('createProjectInput')
    createProjectInput: CreateProjectInput,
  ) {
    return this.projectService.updateProject(id, createProjectInput);
  }
}
