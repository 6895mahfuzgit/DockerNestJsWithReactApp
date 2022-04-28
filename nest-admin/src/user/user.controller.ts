import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserCreateDto } from '../auth/models/user-create.dto';
import { User } from './models/user.entity';
import { UserService } from './user.service';

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
