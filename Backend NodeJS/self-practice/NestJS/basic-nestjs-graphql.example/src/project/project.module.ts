import { Project } from './project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectResolver } from './project.resolver';
import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), ProjectModule],
  providers: [ProjectService, ProjectResolver],
  exports: [ProjectService],
})
export class ProjectModule {}
