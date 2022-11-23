<template>
    <el-menu :default-openeds="['2', '2']" 
    router
    >
      <el-submenu index="1">
        <template slot="title">系统管理</template>
        <el-menu-item-group>
          <el-menu-item index="/menuConfig">菜单管理</el-menu-item>
          <el-menu-item index="1-2">参数管理</el-menu-item>
          <el-menu-item index="1-3">部门管理</el-menu-item>
          <el-menu-item index="1-4">字典管理</el-menu-item>
          <el-menu-item index="1-5">角色管理</el-menu-item>
          <el-menu-item index="1-6">用户管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">系统监控</template>
        <el-menu-item-group>
          <el-menu-item index="/loginLog">登录日志</el-menu-item>
          <el-menu-item index="/logsRecord">操作日志</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">投顾产品</template>
        <el-menu-item-group>
          <el-menu-item index="/liveMvp">直播mvp</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">数据统计</template>
        <el-menu-item-group>
          <el-menu-item index="/msgPush">消息推送</el-menu-item>
          <el-menu-item index="/orderDetail">订单明细</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">服务分配</template>
        <el-menu-item-group>
          <el-menu-item index="/service-distribution">分配列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
</template>
<style>
/* .template{
    padding: 0;
} */
</style>
<script>


export default {
    name: 'Aside',
    methods: {
        // handleSelect (index) {
        //     console.log(index);
        // }
        
    }
}
</script>