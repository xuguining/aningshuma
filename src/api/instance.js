// 对axios进行二次封装
// 1. 创建一个axios 实例
import Vue from 'vue';
import axios from 'axios'
import { Toast } from 'vant';

Vue.use(Toast);
let instance = axios.create({
	timeout: 10000,//10秒超时
})
// 2. 配置拦截器，请求的拦截器以及响应的拦截器
instance.interceptors.request.use(
	function (config) {
		// 登录之后一般返回一个 token，登录的凭证，配置在config中
		Toast.loading({
			message: '加载中...',
			forbidClick: true,
			duration: 0,
		});
		return config
	},
	function (error) {
		return Promise.reject(error)
	}
)
instance.interceptors.response.use(
	function (response) {
		// 取消遮罩证
		Toast.clear()
		return response.data
	},
	function (error) {
		return Promise.reject(error)
	}
)
export default instance