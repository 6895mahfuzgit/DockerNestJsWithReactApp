import { AbstractService } from '../common/abstract/abstract.service';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';
export declare class UserService extends AbstractService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
}
