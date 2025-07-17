import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { CompanySevice } from './company.service'
import { CompnayResolver, CompnayResolver } from './company.resolver'
import { Company } from './compnay.entity'



@Module({
 imports:[TypeOrmModule.forFeature([Company])],
 providers:[CompnayResolver, CompanySevice],
 exports:[CompanyService],
})

export class CompanyModule {}