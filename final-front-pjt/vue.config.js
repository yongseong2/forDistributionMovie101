const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/main.scss";`
      }
    }
  },
  devServer: {
    port: 80,
    client: {
      webSocketURL: {
        hostname: 'movie101.site', // or your domain
      }
    }
  }
})

