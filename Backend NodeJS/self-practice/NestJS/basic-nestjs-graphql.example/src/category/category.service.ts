import { Category } from './category.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryInput } from './category.input';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  // GET ALL CATEGORY
  async getAllCategory(): Promise<Category[]> {
    return this.categoryRepository.find({ relations: ['posts'] });
  }

  // GET CATEGORY BY ID
  async getCategory(id: string): Promise<Category> {
    return this.categoryRepository.findOne({ id });
  }

  //  Create New Category
  async createCatgeory(
    createCategoryInput: CreateCategoryInput,
  ): Promise<Category> {
    const { name } = createCategoryInput;

    const category = this.categoryRepository.create({
      name,
    });
    return this.categoryRepository.save(category);
  }
}
