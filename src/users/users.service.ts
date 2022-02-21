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
// @UseInterceptors(ClassSerializerInterceptor)
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = this.usersRepository.create(createUserDto);
    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new BadRequestException();
      }
      throw new InternalServerErrorException();
    }
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findByUserOrMail(userOrMail: string): Promise<User> {
    try {
      return await this.usersRepository.findOneOrFail({
        where: [{ username: userOrMail }, { email: userOrMail }],
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      return await this.usersRepository.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = await this.findOne(id);
    const newUser: User = { ...user, ...updateUserDto };
    return this.usersRepository.save(newUser);
  }

  async remove(id: number): Promise<void> {
    const user: User = await this.findOne(id);
    await this.usersRepository.remove(user);
  }
}
