const { defineConfig } = require("@vue/cli-service");


module.exports = defineConfig({
  transpileDependencies: true,
    lintOnSave: false,//关闭语法检查
   devServer: {
     proxy: "http://tglmcs.ghzq.com.cn:9501"
     //配置http-proxy代理方式跨域

    //  proxy: {

    //    // 自定义请求的开头,使用代理方式处理/demo开头的请求,/xxx可以自定义

    //    "/tg-gateway": {

    //      // 往哪个服务器发请求

    //      target: "http://tglmcs.ghzq.com.cn:9501/tg-gateway",
    //          changeOrigin: true,
    //      pathRewrite: {

    //        // ^代表字符串开头,实际发送请求时,会把请求开头的/demo删除

    //        // 因为/demo并不是请求的一部分,只是个代理的标识

    //        "^/tg-gateway": "",

    //      },

    //    },


    //  },

   },
});
