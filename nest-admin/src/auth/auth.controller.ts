import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './models/register.dto';


@Controller()
export class AuthController {

    constructor(private userService:UserService) {
    }

    @Post("register")
    async register(@Body() body:RegisterDto){
        if(body.password!==body.password_confirm){
            throw new BadRequestException("Password don't matche!");
        }
        return this.userService.create(body);
    }
}
