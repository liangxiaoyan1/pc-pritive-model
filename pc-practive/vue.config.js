const { defineConfig } = require("@vue/cli-service");


module.exports = defineConfig({
  transpileDependencies: true,
    lintOnSave: false,//关闭语法检查
   devServer: {
     proxy: "http://tglmcs.ghzq.com.cn:9501"

   },
});
