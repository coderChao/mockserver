import UserLogic from '../logic/projectLogic';
import CreateReData from '../utils/returndata';
import moment from 'moment';
import redis from 'redis';

class UserController{
  Login = async (req,res,next) => {
    try{
      let {username,userpwd} = req.body;
      let info = await UserLogic.GetUserByUserName(username);
      if(!info){
        res.locals.json = CreateReData(-1,"用户名不存在");
        return next();
      }
      let isMatch = await UserLogic.ComparePassword(userpwd,info.salt,info.userPwd);
      if(!isMatch){
        res.locals.json = CreateReData(-1,"密码错误");
        return next();
      }
      //更改最后一次登陆时间，并将用户信息以id为键存入redis
      let newInfo = UserLogic.UpdateUserById(info.id,{lastDate: moment().format("L")});
      redis.setAsync(newInfo.id, JSON.stringify(newInfo));
      res.locals.json = CreateReData(0,"",newInfo.id);
      next();
    }
    catch(e){
      next(e);
    }
  } 
  Register = async (userInfo) => {
    let user = await UserLogic.CreateUser(userInfo);
    return CreateReData(0,"",{userCode: user.userCode});
  }
}

export default new UserController()