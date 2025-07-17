import { Resolver, Args, Query, Mutation } from '@nestjs/graphql'
import { Company } from './compnay.entity';
import { CompanySevice } from './company.service';



@Resolver(()=> Company)
export class CompnayResolver {
   constructor(private companyService: CompanySevice) {}

   @Query(()=> [Company])
   async getAllCompany(){
    return this.companyService.getAllCompany()
   }
}
