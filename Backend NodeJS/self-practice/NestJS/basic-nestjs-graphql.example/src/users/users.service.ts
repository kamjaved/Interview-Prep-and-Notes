import { Project } from '../project/project.entity';
import { ProjectService } from '../project/project.service';
import { CreateUserInput } from './user.input';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private projectService: ProjectService,
  ) {}

  // --GET ALL USERS---
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  //--CREATE USER-----

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const { firstName, lastName, age, company, projectId } = createUserInput;

    const user = this.userRepository.create({
      id: uuid(),
      firstName,
      lastName,
      age,
      company,
      projectId,
    });

    return this.userRepository.save(user);
  }

  async getUserByID(id: string): Promise<User> {
    const found = this.userRepository.findOne({ id });
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.userRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateUser(
    id: string,
    createUserInput: CreateUserInput,
  ): Promise<User> {
    const { firstName, lastName, age, company, projectId } = createUserInput;

    const found = await this.getUserByID(id);

    found.firstName = firstName || found.firstName;
    found.lastName = lastName || found.lastName;
    found.age = age || found.age;
    found.company = company || found.company;
    found.projectId = projectId || found.projectId;

    await this.userRepository.save(found);
    return found;
  }

  async getProject(id: string): Promise<Project> {
    return this.projectService.getProjectById(id);
  }
}
