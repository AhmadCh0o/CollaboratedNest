import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module'; // Import AuthModule
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule

@Module({
 controllers: [UsersController],
 providers: [
    {
      provide: 'USER_SERVICE',
      useClass: UsersService,
    },
 ],
 exports: ['USER_SERVICE'],
 imports: [
    PrismaModule,
    forwardRef(() => AuthModule), // Use forwardRef here for AuthModule
    forwardRef(() => JwtModule), // Use forwardRef here for JwtModule
 ],
})
export class UsersModule {}