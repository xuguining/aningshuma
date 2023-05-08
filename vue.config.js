const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
		proxy: {
			'/cn': {
				target: 'https://www.opposhop.cn/',
				ws: true,
				changeOrigin: true,
			},
		},


		// proxy: 'https://www.opposhop.cn/'
			
		
	},
})
