import Mock from 'mockjs'
import user from "./store/modules/user"
// 用户登录接口
Mock.mock('/user/login', 'post', function (request) {
    // console.log("user/login 请求参数:", request);
    let { username, password } = JSON.parse(request.body)
    // console.log("111",user.state.username[0]);
    for (let i = 0; i < user.state.username.length; i++) {
        if (username ==  user.state.username[i] && password == user.state.password[i]) {
                return {
                    code: 1,
                    msg: "登录成功",
                    data: {
                        token: '12345678aaaaavbfbdfsbbsbsddfsdf',
                    }
                }
            } 
        }
    return {
            code: -1,
            msg: "登录失败"
     }
     
    })
    // 验证码接口
    Mock.mock('/user/getcode', 'post', function (request) {
        // console.log("user/getcode 请求参数:", request);
        let { username,code } = JSON.parse(request.body)
        for(let i = 0;i<user.state.Mywd.length;i++){
            // console.log("进来1");
            if (code == user.state.Mywd[i]) {
                // console.log("进来11");
                for(let j = 0; j < user.state.username.length; j++){
                    // console.log("进来2");
                    if(username== user.state.username[j]){
                        // console.log("进来3");
                        return {
                            code: 1,
                            msg: "登录成功",
                            data: {
                                token: '12345678aaaaavbfbdfsbbsbsddfsdf',
                            }
                        }

                    }
                }
        } 
    }
    return {
        code: -1,
        msg: "验证码错误"
    }
})
// 注册接口  

// for (let i = 0; i < user.state.username.length; i++) {
//     for (let j = 0; j < user.state.password.length; j++) {
//         if (username ==  user.state.username[i] && password == user.state.password[j]) {
//             return {
//                 code: 1,
//                 msg: "登录成功",
//                 data: {
//                     token: '1ca52443c462d163c767b11a4ba5910e0590f528d645eae9a2c19c942f32197c681b2f63',
//                 }
//             }
//         } else {
//             return {
//                 code: -1,
//                 msg: `登录失败,账号是${user.state.username[i]}密码是${user.state.password[j]}`
//             }
//         }
//     }
// }