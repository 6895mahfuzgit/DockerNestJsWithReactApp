import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AbstractService } from './abstract/abstract.service';

@Module({
    imports:[
        JwtModule.register({
            secret: 'super secret',
            signOptions: { expiresIn: '1d' },
          }),  
    ],
    exports:[
        JwtModule
    ],
    providers: [AbstractService]
})
export class CommonModule {}
