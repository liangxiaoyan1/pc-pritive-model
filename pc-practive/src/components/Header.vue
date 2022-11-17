<template>
       <div>
        <div >
            <el-breadcrumb separator="/" class="loginHeader">
                <!-- <el-breadcrumb-item :to="{item.path}" v-for="item in paths">{{item.name}}</el-breadcrumb-item> -->
                <el-breadcrumb-item  :to="'/'">首页</el-breadcrumb-item>
                <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
                <el-breadcrumb-item>{{ currenPathName }}</el-breadcrumb-item>
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
    display: inline-block;
    line-height: 60px;
    float: left;
    font-size: 20px;
    font-weight: 600;
}
</style>
<script>
export default {
    name: 'Header',
    // props: {
    //     currenPathName: String
    // },
    watch: {
        //监听当前路由名称
        '$route': function () {
            this.title=localStorage.getItem("title")
            this.currenPathName = localStorage.getItem("currenPathName")
            console.log(title);
        }
    },
    data () {
        return {
            title:'',
            currenPathName:''
       } 
    }

}
</script>