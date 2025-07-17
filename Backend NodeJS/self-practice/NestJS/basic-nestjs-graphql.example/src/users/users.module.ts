import { ProjectModule } from '../project/project.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResolver } from './user.resolver';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UsersModule, ProjectModule],
  providers: [UsersService, UserResolver],
})
export class UsersModule {}
