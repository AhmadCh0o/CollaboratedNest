import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { Request } from "express";
import { Observable } from "rxjs";


@Injectable()
export class localAuthGuard extends AuthGuard('local') {
    async canActivate(context: ExecutionContext) {
        const result = (await super.canActivate(context)) as boolean;
        const request = context.switchToHttp().getRequest();
        console.log('localAuthGuard result:', result);
        console.log('localAuthGuard req.user:', request.user); // Check the user object here
        await super.logIn(request);
        return result;
      }
      
}


@Injectable()
export class AuthenticatedGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<any> {
        const req = context.switchToHttp().getRequest<Request>();
        return req.isAuthenticated();
    }
}