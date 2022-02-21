import { PostgresErrorCode } from './../database/postgresErrorCodes.enum';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<any> {
    let user: User = this.userRepository.create(createUserDto);

    try {
      user = await this.userRepository.save(user);
      const { password, ...rest } = user;
      return rest;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new BadRequestException();
      }
      throw new InternalServerErrorException();
    }
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findByUserOrMail(userOrMail: string): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail({
        where: [{ username: userOrMail, email: userOrMail }],
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = await this.findOne(id);
    const newUser: User = { ...user, ...updateUserDto };
    return this.userRepository.save(newUser);
  }

  async remove(id: number): Promise<User> {
    const user: User = await this.findOne(id);
    return this.userRepository.remove(user);
  }
}
