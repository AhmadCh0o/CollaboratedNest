import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-linkedin-oauth2';
import { AuthService } from './auth.service';

@Injectable()
export class LinkedInStrategy extends PassportStrategy(Strategy, 'linkedin') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: '772rhj8dz54w1z',
      clientSecret: 'dgsVq6iLB3enEmjg',
      callbackURL: 'http://localhost:3000/auth/linkedin/callback',
      scope: ['r_emailaddress', 'r_liteprofile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any): Promise<any> {
    // Implement logic to validate LinkedIn user profile and integrate it with your system.
    // Example: Check if the user is already registered in your database using their LinkedIn profile data.
    const user = await this.authService.validateLinkedInUser(profile);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
