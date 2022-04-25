import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';

@Module({
  providers:[
   UserModule
  ],
  controllers: [AuthController]
})
export class AuthModule {}
