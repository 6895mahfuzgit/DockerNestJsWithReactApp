import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { HasPermission } from './has-permission.decorator';
import { Permission } from './models/permission.entity';
import { PermissionService } from './permission.service';

@UseGuards(AuthGuard)
@Controller('permissions')
export class PermissionController {

    constructor(private permissionService:PermissionService){}

    @Get()
    @HasPermission('view_permission')
    async all(){
      return this.permissionService.all();  
    }

    @Post()
    async create(@Body('name') name:string):Promise<Permission>{
      return this.permissionService.create({name});
    } 

    @Get(':id')
    async get(@Param('id') id :number){
        return this.permissionService.findOne({id});
    }

    @Put(':id')
    async update(@Param('id') id :number,
                 @Body('name') name:string){
        await this.permissionService.update(id,{name});
       return this.permissionService.findOne({id});
    }

    @Delete(':id')
    async delete(@Param('id') id :number){
       return this.permissionService.delete(id);
    }
}
