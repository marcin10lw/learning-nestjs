import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
  ) {}

  async create(email: string, password: string) {
    const user = this.usersRepo.create({ email, password });
    return this.usersRepo.save(user);
  }

  findOneById(id: number) {
    return this.usersRepo.findOneBy({ id });
  }

  findOneByEmail(email: string) {
    return this.usersRepo.findOneBy({ email });
  }

  findManyByEmail(email: string) {
    return this.usersRepo.findBy({ email });
  }

  async update(id: number, data: Partial<User>) {
    const user = await this.findOneById(id);
    if (!user) throw new NotFoundException('User not found');
    Object.assign(user, data);
    return this.usersRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOneById(id);
    if (!user) throw new NotFoundException('User not found');
    await this.usersRepo.remove(user);
  }
}
