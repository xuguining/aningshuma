const state ={
    token:'',
    username:["czy",],
    password:[12345,],
    Mywd:[]
}
const getters ={}
const actions = {
    save_user_sync:function(store,payload){
        // console.log(store,);
        store.commit("SAVE_USER_SYNC",payload)
    },
    // 接收验证码
    save_mywd_sync:function(store,payload){
        store.commit("SAVE_MYWD_SYNC",payload)
    }
}
const mutations={
    SAVE_TOKEN:function(state,payload){
        state.token = payload.token
        // console.log("登录成功", state.token);
        // console.log(state.token);
    },
    SAVE_USER_SYNC:function(state,payload){
        state.username.push(payload.username);
        state.password.push(payload.password);
        // console.log("注册成功", state.username, state.password);
    },
     // 接收验证码
     SAVE_MYWD_SYNC:function(state,payload){
        //  state.Mywd = payload.mywd
         state.Mywd.push(payload.mywd)
         state.username.push(payload.username)
        //  console.log("vuex里面的",state.mywd );
     }
}
export default {
    namespaced:true,
    state,
    getters,
    actions,
    mutations
}