const state = {
    lang:'cs',
};
const  getters = {
    langToCn:function(state){
        switch(state.lang){
            case 'cs':
                return "简体中文";
            case "tc":
                return "繁体中文";
            case 'en':
                return 'English'
        }
    }
};
const actions = {
    changeLang(store,payload){
        // console.log(store);
        // console.log("触发了login 模块",payload);
        // 传数据到mutations模块
        store.commit('CHANGE_LANG',payload)
    }
};
const mutations ={
    CHANGE_LANG(state,payload){
        state.lang = payload.lang
    }
};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}