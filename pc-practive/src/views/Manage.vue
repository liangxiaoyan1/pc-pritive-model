<template>
    <div>
        <el-container>
            <!-- 左边侧边栏 -->
            <el-aside width="200px">
                <div style="height:60px">
                    <h1 class="headerTitle">运营平台</h1>
                </div>
                <Aside></Aside>
            </el-aside>
            <!-- 右边 -->
            <el-container>
                <!-- 右侧顶部 -->
                <el-header style="text-align: right; font-size: 12px" >
                <Header></Header>
            </el-header>
                <!-- 右侧内容 -->
                <el-main>
                    <h1 >头部导航栏</h1>
                    <!-- 当前页面 -->
                    <router-view ></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<style scoped lang="scss">
*{
    font-family: Verdana, Arial, Helvetica, sans-serif;
}
.el-header {
    background-color:#1890ff;
    color: rgb(255, 255, 255);
    line-height: 60px;
}
.el-aside {
    height: 100%;
    border-right: 1px solid #ababab;
   div{
    background: #1890ff;
    color: rgb(255, 255, 255);
    text-align: center;
    line-height: 60px;
   }
}
.headerTitle{
    font-size: 24px;
    font-weight: 600;
}
.el-main{
   background: rgb(244, 244, 244);
    h1{
        background-color: #1890ff;
            height: 74px;
            line-height: 74px;
            padding: 20px;
    }
}
</style>
<script>

import Aside from '@/components/Aside.vue'
import Header from '@/components/Header.vue'
export default {
    data () {
        return {
            
        }
    },
    components: {
        Aside,
        Header,
    }
}
</script>