import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as session from 'express-session';
import * as passport from 'passport';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors'; // Import the cors package
import { LinkedInStrategy } from 'passport-linkedin-oauth2';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(session({
    name: 'NESTJS_SESSION_ID',
    secret: 'RANDOMWORDSTHATARESUPPOSETOBEKEPTASECRET',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000,
    },
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LinkedInStrategy({
    clientID: '772rhj8dz54w1z',
    clientSecret: 'dgsVq6iLB3enEmjg',
    callbackURL: 'http://localhost:3000/auth/linkedin/callback',
  }, (token, tokenSecret, profile, done) => {
    // Handle the user profile here. You can save the user to your database.
    return done(null, profile);
  }));

  // Use the cors middleware to enable CORS for all routes
  app.use(cors());

  // Use the validation pipe to automatically validate incoming requests
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Median')
    .setDescription('The Median API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();