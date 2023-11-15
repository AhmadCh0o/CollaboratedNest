import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { PasswordsModule } from './passwords/passwords.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    PassportModule.register({
      session: true,
    }),
    PasswordsModule,
  ],
  controllers: [AppController,], // Add ProfileController here
  providers: [AppService],
})
export class AppModule {}
