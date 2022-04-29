import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from '../common/abstract/abstract.service';
import { Repository } from 'typeorm';
import { Permission } from './models/permission.entity';

@Injectable()
export class PermissionService extends AbstractService {

    constructor(@InjectRepository(Permission) private readonly permissonRepository:Repository<Permission>){
        super(permissonRepository);
    }

    // async all():Promise<Permission[]>{
    //   return this.permissonRepository.find();
    // }

    // async create(data):Promise<Permission>{
    //     return this.permissonRepository.save(data);
    //  }
 
    //  async findOne(condition):Promise<Permission>{
    //      return this.permissonRepository.findOne(condition);
    //   }
 
    //  async update(id:number,data):Promise<any>{
    //      return this.permissonRepository.update(id,data);
    //  } 
 
    //  async delete(id:number):Promise<any>{
    //      return this.permissonRepository.delete(id);
    //  } 
}
