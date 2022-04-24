import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    all(): Promise<import("./models/user.entity").User[]>;
}
