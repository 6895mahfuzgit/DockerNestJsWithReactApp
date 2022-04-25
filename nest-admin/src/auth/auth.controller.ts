import { BadRequestException, Body, Controller, NotFoundException, Post, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './models/register.dto';
import{Response} from "express";

@Controller()
export class AuthController {

    constructor(private userService:UserService,private jwtService:JwtService) {
    }

    @Post("register")
    async register(@Body() body:RegisterDto){
        if(body.password!==body.password_confirm){
            throw new BadRequestException("Password don't matche!");
        }
        return this.userService.create(body);
    }

    @Post("login")
    async login(@Body('email') email:string,
                @Body('password') password:string,
                @Res({passthrough:true}) response:Response ){
    const user=await this.userService.findOne({email: email,password:password});

      if(!user){
          throw new NotFoundException("User not found");
      }

      const jwt=await this.jwtService.signAsync({ id :user.id})
      response.cookie('jwt',jwt,{httpOnly:true});
      return user;
    }

}
