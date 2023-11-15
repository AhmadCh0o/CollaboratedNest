import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PasswordsService } from './passwords.service';
import { CreatePasswordDto } from './dto/create-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CustomRequest } from 'src/auth/custom-request.interface';

@Controller('passwords')
export class PasswordsController {
  constructor(private readonly passwordsService: PasswordsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() createPasswordDto: CreatePasswordDto, @Req() request: CustomRequest) {
    const user = request.user;
    return this.passwordsService.create(user.id, createPasswordDto);
  }
  

// PasswordsController.ts

@Get('get')
findAll(@Req() request: Request) {
  const userId = request.headers['x-user-id']; // Retrieve the user ID from headers
  return this.passwordsService.findAllByUserId(userId);
}




  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.passwordsService.update(id, updatePasswordDto);
  }
  
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.passwordsService.remove(id);
  }
}
