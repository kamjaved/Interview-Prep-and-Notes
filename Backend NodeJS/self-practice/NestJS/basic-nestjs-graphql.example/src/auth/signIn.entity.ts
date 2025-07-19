import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column } from 'typeorm';

@ObjectType()
@Entity()
export class SiginInPayload {
  @Field()
  @Column()
  accessToken: string;
}
