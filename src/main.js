import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 样式初始化引入
import 'normalize.css'
import '@/assets/iconfont.css'
// rem根字体响应式
import 'lib-flexible'
import axios from '@/api/instance'
// 将二次封装的axios实例挂载到vue原型上
Vue.prototype.$axios = axios
//引入国际化语言库
import VueI18n from 'vue-i18n'
//引入语言包
import messages from '@/i18n/lang'
require ('./mock')
//安装第三方模版
Vue.use(VueI18n)
//通过选项创建实例
const i18n = new VueI18n({
	locale: 'cs', // 设置地区
	messages, // 设置地区信息
})
Vue.config.productionTip = false
/*将 i18n 实例作为配置项 放在 Vue 的初始化选项中 */


new Vue({
	i18n,
	router,
	store,
	render: (h) => h(App),
	beforeCreate(){
		// 来个事件总线实现购物车那子路由给父路由传值
		Vue.prototype.$bus=this;
	}
}).$mount('#app')

