<template>
       <div>
        <div >
            <el-breadcrumb separator="/" class="loginHeader ">
                <!-- <el-breadcrumb-item :to="{item.path}" v-for="item in paths">{{item.name}}</el-breadcrumb-item> -->
                <el-breadcrumb-item :to="'/loginLog'">首页</el-breadcrumb-item>
                <el-breadcrumb-item v-for="item in breadList" :key="item.path" :to="item.path">
                {{item.meta.title}}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-dropdown>
            <span style="color: aliceblue;">admin</span>
            <span style="margin-left: 35px; color: aliceblue;">退出</span>
            <i class="el-icon-arrow-down" style="margin:0 15px  0 0 ;color: aliceblue;"></i>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
       </div>

    
  
</template>
<style scoped lang="scss">
.loginHeader{
    line-height: 60px;
    float: left;
    font-size: 20px;
    font-weight: 600;
   
   } 
   //首页字体
   .el-breadcrumb__item:first-child ::v-deep .el-breadcrumb__inner {
       color: #ffffff !important;
       font-weight: 800 !important;
   }
   /* 第二阶 */
   .el-breadcrumb ::v-deep .el-breadcrumb__inner {
       color: #ffffff !important;
       font-weight: 400 !important;
   }

   /* 被选中时的颜色 */
   .el-breadcrumb__item:last-child ::v-deep .el-breadcrumb__inner {
       color: #ffffff !important;
   }


//重写面包屑的字体颜色
//或者这样写
</style>
<script>
export default {
    name: 'Header',
    // props: {
    //     currenPathName: String
    // },
    // watch: {
    //     //监听当前路由名称
    //     '$route': function () {
    //         this.title=localStorage.getItem("title")
    //         this.currenPathName = localStorage.getItem("currenPathName")
    //         console.log(title);
    //     }
    // },
    computed: {
        breadList () {
            return this.$route.matched
        },
    },
    mounted () {
        console.log(this.$route.matched);
    },
    data () {
        return {
            title:'',
            currenPathName:''
       } 
    }

}
</script>