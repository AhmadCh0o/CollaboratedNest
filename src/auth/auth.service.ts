import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async createToken(user) {
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateJwtPayload(payload: any) {
    const user = await this.userService.findOneByUsername(payload.username);
    if (!user) {
      return null;
    }
    return user;
  }

  async validateUser(username: string, password: string) {
    const userDB = await this.userService.findOneByUsername(username);
    if (userDB) {
      const matched = comparePasswords(password, userDB.master_password);
      if (matched) {
        return userDB;
      }
    }
    return null;
  }

  async validateLinkedInUser(profile: any) {
    const user = await this.userService.findUserByLinkedInProfile(profile);
    if (!user) {
      throw new UnauthorizedException('LinkedIn user not found');
    }
    return user;
  }

  async createLinkedInToken(user) {
    const payload = { sub: user.id, username: user.username, provider: 'linkedin' };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
