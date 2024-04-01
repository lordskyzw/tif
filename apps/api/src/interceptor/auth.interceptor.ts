import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService, UsersService } from 'src/auth/auth.service';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor( private authService: AuthService, private usersService: UsersService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    let tokenArray = req.headers.authorization;
    if (tokenArray) {
      req.body["user"] = this.authService.decodeToken(tokenArray.split(" ")[1]).user;
    }

    return next
      .handle()
      .pipe();
  }
}