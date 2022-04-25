import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './models/register.dto';
import { Response, Request } from "express";
export declare class AuthController {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    register(body: RegisterDto): Promise<import("../user/models/user.entity").User>;
    login(email: string, password: string, response: Response): Promise<import("../user/models/user.entity").User>;
    user(request: Request): Promise<import("./models/userinfo.dto").UserInfo>;
}
