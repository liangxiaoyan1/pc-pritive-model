<template>
    <div>
        <el-container>
            <!-- 左边侧边栏 -->
            <el-aside width="201px">
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
                <el-tabs v-model="activeName" editable="true">
                    <el-tab-pane label="用户管理" name="first">
                    </el-tab-pane>
                </el-tabs>
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
    
}
</style>
<script>

import Aside from '@/components/Aside.vue'
import Header from '@/components/Header.vue'
export default {
    data () {
        return {
            activeName:''
        }
    },
    components: {
        Aside,
        Header,
    }
}
</script>