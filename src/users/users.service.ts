import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Response,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
  ) {}

  async create(email: string, password: string) {
    const existingUser = await this.usersRepo.findOneBy({ email });
    if (existingUser) {
      throw new BadRequestException('Can not use provided email');
    }
    const user = this.usersRepo.create({ email, password });
    return this.usersRepo.save(user);
  }

  async findOne(id: number) {
    console.log('Running findOne handler');
    const user = await this.usersRepo.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  find(email: string) {
    return this.usersRepo.findBy({ email });
  }

  async update(id: number, data: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    Object.assign(user, data);
    return this.usersRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    await this.usersRepo.remove(user);
  }
}
