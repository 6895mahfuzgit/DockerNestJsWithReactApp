import { UserCreateDto } from './models/user-create.dto';
import { UserUpdateDto } from './models/user-update.dto';
import { User } from './models/user.entity';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    all(page?: number): Promise<import("../common/models/pagirated-result.model").PagiratedResult>;
    create(body: UserCreateDto): Promise<User>;
    get(id: number): Promise<any>;
    update(id: number, body: UserUpdateDto): Promise<any>;
    delete(id: number): Promise<any>;
}
