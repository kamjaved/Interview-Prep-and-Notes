import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Project } from '../project/project.entity';
import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  age: number;

  @Field()
  @Column()
  company: string;

  // @OneToMany(() => Project, (project) => project.user)
  // projects: Project[];

  // One user can work only in single Project but in one project Many User can work sso ManytoOne relationship
  @ManyToOne(() => Project, (project) => project.users)
  @Field(() => Project)
  project: Project;

  @Column()
  @Field()
  projectId: string;
}
