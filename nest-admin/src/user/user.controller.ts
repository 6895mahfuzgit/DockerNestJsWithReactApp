import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { UserCreateDto } from './models/user-create.dto';
import { UserUpdateDto } from './models/user-update.dto';
import { User } from './models/user.entity';
import { UserService } from './user.service';

@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {

    constructor(private userService: UserService) { }

    @Get()
    async all(@Query('page') page:number=1) {
        //return await this.userService.all();
        return await this.userService.paginate(page)
    }



    @Post()
    async create(@Body() body:UserCreateDto):Promise<User>{
      return this.userService.create(body);
    } 

    @Get(':id')
    async get(@Param('id') id :number){
        return this.userService.findOne({id});
    }

    @Put(':id')
    async update(@Param('id') id :number,
                 @Body() body:UserUpdateDto){
        await this.userService.update(id,body);
       return this.userService.findOne({id});
    }

    @Delete(':id')
    async delete(@Param('id') id :number){
       return this.userService.delete(id);
    }

}
