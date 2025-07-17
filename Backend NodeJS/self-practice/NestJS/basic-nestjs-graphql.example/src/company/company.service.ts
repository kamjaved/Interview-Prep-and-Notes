import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './compnay.entity';


@Injectable()
export class CompanySevice {
  
constructor(@InjectRepsoitry(Company) private companyRepository: Repository<Company>){}


async getAllCompany(): Promise<Company[]> {
  return this.companyRepository.find()
}


}