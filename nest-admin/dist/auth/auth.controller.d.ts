import { UserService } from 'src/user/user.service';
export declare class AuthController {
    private userService;
    constructor(userService: UserService);
    register(body: any): Promise<import("../user/models/user.entity").User>;
}
