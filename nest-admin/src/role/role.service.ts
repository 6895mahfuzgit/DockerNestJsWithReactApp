import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './models/role.model';

@Injectable()
export class RoleService {

    constructor(@InjectRepository(Role) private readonly roleRepository:Repository<Role>){}

    async all():Promise<Role[]>{
      return this.roleRepository.find();
    }

}