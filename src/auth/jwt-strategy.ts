import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'RANDOMWORDSTHATARESUPPOSETOBEKEPTASECRET', // Replace with your actual secret key
    });
  }

  async validate(payload: any, done: (error, user) => void) {
    const user = await this.authService.validateJwtPayload(payload);
    if (!user) {
      return done(new UnauthorizedException(), false);
    }
    done(null, user); // Attach user data to request object
  }
}
