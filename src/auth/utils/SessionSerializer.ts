import { Inject } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { users } from "@prisma/client";
import { User } from "src/users/entities";
import { UsersService } from "src/users/users.service";

export class SessionSerializer extends PassportSerializer {

    constructor(
        @Inject('USER_SERVICE') private readonly userService: UsersService,
    ) {
        super();    
    }

    serializeUser(user: users, done: (err, user: users) => void) {
        console.log('serialized user');
        done(null, user);
    }

    async deserializeUser(user: users, done: (err, user: users) => void) {
        console.log('deserialized user');
        const usersDB = await this.userService.findUserById(user.id);
        const userDB = Array.isArray(usersDB) ? usersDB[0] : usersDB;
        return userDB ? done(null, userDB) : done(null, null);
      }
      
}