import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Role } from './models/role.model';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {

    constructor(private roleService:RoleService){}

    @Get()
    async all(){
      return this.roleService.all();  
    }

    @Post()
    async create(@Body('name') name:string):Promise<Role>{
      return this.roleService.create({name});
    } 

    @Get(':id')
    async get(@Param('id') id :number){
        return this.roleService.findOne({id});
    }

    @Put(':id')
    async update(@Param('id') id :number,
                 @Body('name') name:string){
        await this.roleService.update(id,{name});
       return this.roleService.findOne({id});
    }

    @Delete(':id')
    async delete(@Param('id') id :number){
       return this.roleService.delete(id);
    }
}
