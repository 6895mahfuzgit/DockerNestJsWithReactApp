import { UserInfo } from "src/auth/models/userinfo.dto";
import { User } from "src/user/models/user.entity";

export function toUserInfo(user:User){
    var result= new UserInfo();
       result.id=user.id;
       result.first_name=user.first_name;
       result.last_name=user.last_name;
       result.email=user.email;
    return result;
  }