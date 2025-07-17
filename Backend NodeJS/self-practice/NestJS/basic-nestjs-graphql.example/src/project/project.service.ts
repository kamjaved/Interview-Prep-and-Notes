import { CreateProjectInput } from './project.input';
import { Project } from './project.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
  ) {}

  async createProject(
    createProjectInput: CreateProjectInput,
  ): Promise<Project> {
    const { name } = createProjectInput;

    const project = this.projectRepository.create({
      id: uuid(),
      name,
    });
    return this.projectRepository.save(project);
  }

  async getAllProject(): Promise<Project[]> {
    return this.projectRepository.find({ relations: ['users'] });
  }

  async getProjectById(id: string): Promise<Project> {
    return this.projectRepository.findOne(id, { relations: ['users'] });
  }

  async updateProject(
    id: string,
    createProjectInput: CreateProjectInput,
  ): Promise<Project> {
    const { name } = createProjectInput;
    const found = await this.getProjectById(id);
    found.name = name || found.name;
    await this.projectRepository.save(found);
    return found;
  }
}
