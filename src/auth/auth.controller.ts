import { Controller, Get, Req, Res, Session, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LinkedInAuthGuard } from './linkedin-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Login route using LinkedIn OAuth2
  @Get('linkedin')
  @UseGuards(LinkedInAuthGuard)
  linkedinLogin() {
    // LinkedInAuthGuard will handle the authentication process
  }

  // LinkedIn OAuth2 callback route
  @Get('linkedin/callback')
  @UseGuards(LinkedInAuthGuard)
  async linkedinCallback(@Req() req: Request, @Res() res: Response) { 
    // Handle the successful LinkedIn login here
    // You can access the user profile from req.user
    // Authenticate the user and create JWT token if necessary
    // Redirect to the desired route after successful login
    res.redirect('/'); // Redirect to the root route after successful login
  }

  // JWT authentication status route
  @UseGuards(JwtAuthGuard)
  @Get('status')
  async getAuthStatus(@Req() request: Request) {
    // The user object is already available in the request due to JwtAuthGuard
    return request.user;
  }

  // Your existing login route using JWT authentication
  @UseGuards(JwtAuthGuard)
  @Get('login')
  async login(@Req() request: Request) {
    // If the user gets here, it means they are authenticated using JWT
    // You can return any data you want, such as a success message
    return { message: 'Login successful' };
  }

  // Your existing route to get the session data
  @Get('session')
  async getAuthSession(@Session() session: Record<string, any>) {
    console.log(session);
    console.log(session.id);
    session.authenticated = true;
    return session;
  }
}
