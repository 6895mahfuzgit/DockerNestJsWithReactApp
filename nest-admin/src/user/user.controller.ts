import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from '../auth/auth.guard';
import { UserCreateDto } from './models/user-create.dto';
import { UserUpdateDto } from './models/user-update.dto';
import { User } from './models/user.entity';
import { UserService } from './user.service';

@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {

  constructor(private userService: UserService,
    private authService: AuthService) { }

  @Get()
  async all(@Query('page') page: number = 1) {
    //return await this.userService.all();
    return await this.userService.paginate(page, ['role'])
  }



  @Post()
  async create(@Body() body: UserCreateDto): Promise<User> {

    const { role_id, ...data } = body;
    return this.userService.create({
      ...data,
      role: { id: role_id }
    });
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return this.userService.findOne({ id }, ['role']);
  }

  @Put('info')
  async updateInfo(@Body() body: UserUpdateDto,
    @Req() request: Request) {

    const id = await this.authService.userId(request);
    await this.userService.update(id, body);
    return this.userService.findOne({ id });

  }

  @Put('password')
  async updatePassword(@Body('password') password: string,
    @Body('password_confirm') password_confirm: string,
    @Req() request: Request) {

    if (password !== password_confirm) {
      throw new BadRequestException("Password don't matche!");
    }

    const id = await this.authService.userId(request);
    await this.userService.update(id, {
      password
    });
    return this.userService.findOne({ id });
  }

  @Put(':id')
  async update(@Param('id') id: number,
    @Body() body: UserUpdateDto) {

    const { role_id, ...data } = body;
    await this.userService.update(id,
      {
        ...data,
        role: { id: role_id }
      }
    );
    return this.userService.findOne({ id });
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }

}
