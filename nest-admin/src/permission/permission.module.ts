import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './models/permission.entity';
import { CommonModule } from '../common/common.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Permission]),
    CommonModule
  ],
  providers: [PermissionService],
  controllers: [PermissionController]
})
export class PermissionModule {}
