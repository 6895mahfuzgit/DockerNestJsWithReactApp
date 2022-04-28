import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { UserCreateDto } from '../auth/models/user-create.dto';
import { User } from './models/user.entity';
import { UserService } from './user.service';

@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {

    constructor(private userService: UserService) { }

    @Get()
    async all() {
        return await this.userService.all();
    }

    @Post()
    async create(@Body() body:UserCreateDto):Promise<User>{
      return this.userService.create(body);
    } 

}
