import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, NotFoundException, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './models/register.dto';
import{Response,Request} from "express";
import { toUserInfo } from "src/_helpers/helper";
import { AuthGuard } from './auth.guard';
//import { AuthInterceptor } from './auth.interceptor';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {

    constructor(private userService:UserService,private jwtService:JwtService) {
    }

    @Post("register")
    async register(@Body() body:RegisterDto){
        if(body.password!==body.password_confirm){
            throw new BadRequestException("Password don't matche!");
        }
        
        return this.userService.create({...body,role:{id:2}});
    }

    @Post("login")
    async login(@Body('email') email:string,
                @Body('password') password:string,
                @Res({passthrough:true}) response:Response ){
    const user=await this.userService.findOne({email: email,password:password});

      if(!user){
          throw new NotFoundException("User not found");
      }

      const jwt=await this.jwtService.signAsync({ id:user.id})
      response.cookie('jwt',jwt,{httpOnly:true});
      return user;
    }


    @UseGuards(AuthGuard)    
    @Get('user')
    async user(@Req() request:Request){
        const cookie=request.cookies['jwt']; 
        const data=await this.jwtService.verifyAsync(cookie);
        let user= (await this.userService.findOne({ id: data['id']})) ;
        return toUserInfo(user);
    }

    @UseGuards(AuthGuard)
    @Post("logout")
    async logout(@Res({passthrough:true}) res:Response){
        res.clearCookie('jwt');

        return { message: 'Success.' };
    }  

}
