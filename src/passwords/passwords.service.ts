// passwords.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePasswordDto } from './dto/create-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PasswordsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, createPasswordDto: CreatePasswordDto) {
    return this.prisma.passwords.create({
      data: {
        ...createPasswordDto,
        userId,
      },
    });
  }
  

  async findAllByUserId(userId: number) {
    return this.prisma.passwords.findMany({
      where: { userId }, // Filter passwords by user ID
    });
  }
  
  
  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const existingPassword = await this.prisma.passwords.findUnique({
      where: { id: parseInt(id, 10) },
    });
  
    if (!existingPassword) {
      throw new NotFoundException(`Password with ID ${id} not found`);
    }
  
    return this.prisma.passwords.update({
      where: { id: parseInt(id, 10) },
      data: updatePasswordDto,
    });
  }  

  async remove(id: string) {
    const existingPassword = await this.prisma.passwords.findUnique({
      where: { id: parseInt(id, 10) },
    });
  
    if (!existingPassword) {
      throw new NotFoundException(`Password with ID ${id} not found`);
    }
  
    return this.prisma.passwords.delete({
      where: { id: parseInt(id, 10) },
    });
  }
}
