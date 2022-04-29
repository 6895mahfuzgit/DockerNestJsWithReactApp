import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './models/register.dto';
import { Response, Request } from "express";
export declare class AuthController {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    register(body: RegisterDto): Promise<any>;
    login(email: string, password: string, response: Response): Promise<any>;
    user(request: Request): Promise<import("../user/models/userinfo.dto").UserInfo>;
    logout(res: Response): Promise<{
        message: string;
    }>;
}
