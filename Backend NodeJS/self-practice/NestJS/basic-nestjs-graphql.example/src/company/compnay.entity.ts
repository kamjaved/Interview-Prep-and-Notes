import { Entity, Column, PrimaryColumn } from 'typeorm'
import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
@Entity()

export class Company {
 @Field(()=>ID)
 @PrimaryColumn()
 id:string;

 @Column()
 @Field()
 name:string;

 @Column()
 @Field({description: '', nullable:true})
 description:string;




}
