import crypto from 'crypto';

/*
 * 10位盐
 * 时间戳(2)+随机字母(8)
 */
const genSalt = () => {
    var time = Date.now() % 100,
        str = '';
    time = time === 0 ? '00' : String(time);
    for (let i = 0; i < 8; i++) {
        const base = Math.random() < 0.5 ? 65 : 97;
        str += String.fromCharCode(
            base + 
            Math.floor(
                Math.random() * 26 
            )
        );
    }
    return time + str;
};
const md5 = (text) => {
    return crypto.createHash("md5").update(String(text)).digest("hex");
};

const addSalt = (pwd,salt) => {
  return salt.substr(4) + pwd + salt.substr(0,4)
}

const loginEncrpt = (password,salt) => {
   return md5(addSalt(md5(password),salt));
}

const regEncrypt = (password) => {
//    return new Promise(function(resolve,reject) {
//      try{
        const salt = genSalt();
        console.log(salt);
        const encryptPwd = md5(addSalt(md5(password),salt));
        return {salt,encryptPwd}
//         resolve(salt,encryptPwd);
//     }
//      catch(e){
//         reject(e);
//      }
//    });
}

// function test(){
//     console.time("encrypt");
//    regEncrypt('123456').then(function(salt,encryptPwd) {
//        console.timeEnd("encrypt");
//       console.log("salt", salt);
//       console.log("pwd", encryptPwd);
//    }).catch(function(e){
//       console.log(e);
//    })
//     console.time("encrypt");
//     const data = regEncrypt('123456');
//     console.timeEnd("encrypt");
//     console.log(data.salt);
//     console.log(data.encryptPwd);
// }

// function test2(){
//    const pwd = loginEncrpt("123456","74GGyrjgiE");
//    console.log(pwd);
// }

// test2();

export default {
   loginEncrpt, regEncrypt
}