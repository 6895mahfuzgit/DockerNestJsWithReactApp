import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';

@Module({
  imports:[
   UserModule,
   JwtModule.register({
    secret: 'super secret',
    signOptions: { expiresIn: '1d' },
  }),
  ],
  controllers: [AuthController]
})
export class AuthModule {}
