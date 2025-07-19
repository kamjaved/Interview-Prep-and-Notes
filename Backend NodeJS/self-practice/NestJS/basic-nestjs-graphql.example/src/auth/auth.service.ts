import { CreateUserInput } from './user.input';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { SiginInPayload } from './signIn.entity';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // --GET ALL USERS---
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find({ relations: ['posts'] });
  }

  // --SIGNUP USER-----
  async signUp(createUserInput: CreateUserInput): Promise<User> {
    const { firstName, lastName, email, password } = createUserInput;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    try {
      return this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        //   duplicate username
        throw new ConflictException('Username already Exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  // -----LOGIN USER--------
  async signIn(createUserInput: CreateUserInput): Promise<SiginInPayload> {
    const { email, password, id } = createUserInput;
    const user = await this.userRepository.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // const payload = { id };
      const accessToken: string = await jwt.sign({ id, email }, 'secret');
      console.log({ accessToken });
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
