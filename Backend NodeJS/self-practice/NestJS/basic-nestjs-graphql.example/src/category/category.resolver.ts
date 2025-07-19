import { AuthGuard } from './../auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { CreateCategoryInput } from './category.input';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(new AuthGuard())
  @Query(() => [Category])
  async getAllCatgeory() {
    return this.categoryService.getAllCategory();
  }

  @Query(() => Category)
  async getCategory(@Args('id') id: string): Promise<Category> {
    return this.categoryService.getCategory(id);
  }

  @Mutation(() => Category)
  async createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ) {
    return this.categoryService.createCatgeory(createCategoryInput);
  }
}
