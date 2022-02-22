import { Property } from './entities/property.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property) private readonly propRepo: Repository<Property>,
  ) {}
  create(createPropertyDto: CreatePropertyDto) {
    const repo = this.propRepo.create(createPropertyDto);
    console.log(repo);

    return this.propRepo.save(repo);
  }

  findAll() {
    return this.propRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} property`;
  }

  update(id: number, updatePropertyDto: UpdatePropertyDto) {
    return `This action updates a #${id} property`;
  }

  remove(id: number) {
    return `This action removes a #${id} property`;
  }
}
