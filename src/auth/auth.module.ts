import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt-strategy';
import { SessionSerializer } from './utils/SessionSerializer';
import { LinkedInStrategy } from 'passport-linkedin-oauth2'; // Import LinkedInStrategy

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => UsersModule), // Use forwardRef here
    PassportModule,
    JwtModule.register({
      secret: 'RANDOMWORDSTHATARESUPPOSETOBEKEPTASECRET',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    JwtStrategy,
    SessionSerializer,
    LinkedInStrategy, // Include LinkedInStrategy here
  ],
  exports: [AuthService],
})
export class AuthModule {}
