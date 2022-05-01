import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RoleService } from 'src/role/role.service';
import { UserService } from 'src/user/user.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../user/models/user.entity';

@Injectable()
export class PermissionGuard implements CanActivate {


  constructor(private reflector:Reflector,
              private authService:AuthService,
              private userService:UserService,
              private roleService:RoleService,
              ){}


  async canActivate(
    context: ExecutionContext,
  ){


    const access=this.reflector.get<string>('access',context.getHandler());
   // console.log(access);
    if(!access){
      return true;
    }
    const request=context.switchToHttp().getRequest();
    const id= await this.authService.userId(request);
    const user:User=await this.userService.findOne({id},['role']);
    const role=await this.roleService.findOne({id:user.role.id},['permissions']);


    return role.permissions.some(p=>p.name===access);
  }
}
