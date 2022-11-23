import Vue from "vue";
import VueRouter from "vue-router";
import login from "../views/login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: login,
    },
    {
        path: "/",
        component: () => import("../views/Manage.vue"),
        meta: { title: "系统监控" },
        redirect: "/loginLog",
        children: [
            {
                path: "/loginLog",
                name: "登录日志",
                meta: {
                    title: "登录日志"
                },

                component: () => import("../views/LoginLog.vue"),
            },
            {
                path: "/logsRecord",
                name: "操作日志",
                meta: {
                    title: "操作日志"
                },
                component: () => import("../views/LogsRecord.vue"),
            },]
    },
        //系统管理、
    {
        path: "/",
        component: () => import("../views/Manage.vue"),
        meta: { title: "系统管理" },
        redirect: "/loginLog",
        children: [
            {
                        path: "/menuConfig",
                        name: "菜单管理",
                        meta: {
                            title: "菜单管理"
                        },
                        component: () => import("../views/MenuConfig.vue"),
                }, 
                ]
        },
    {
         path: "/",
        component: () => import("../views/Manage.vue"),
        meta: { title: "投顾产品" },
        redirect: "/loginLog",
        children: [
            {
                path: "/liveMvp",
                 name: "直播mvp",
                meta: {
                   title:"直播mvp" 
                },
                component: () =>import("../views/LiveMvp.vue"),
            },
        ] 
     },
        {
         path: "/",
        component: () => import("../views/Manage.vue"),
        meta: { title: "数据统计" },
        redirect: "/loginLog",
        children: [
            {
                path: "/msgPush",
                 name: "消息推送",
                meta: {
                   title:"消息推送" 
                },
                component: () =>import("../views/MsgPush.vue"),
            },
             {
                path: "/orderDetail",
                 name: "订单明细",
                meta: {
                   title:"订单明细" 
                },
                component: () =>import("../views/OrderDetail.vue"),
            },
        ] 
    }, 
      {
         path: "/",
        component: () => import("../views/Manage.vue"),
        meta: { title: "服务分配" },
        redirect: "/loginLog",
        children: [
            {
                path: "/service-distribution",
                 name: "分配列表",
                meta: {
                   title:"分配列表" 
                },
                component: () =>import("../views/ServiceDistribution.vue"),
            },
        ] 
     },   

     

    // {
    //     path: "/can",
    //     component: () => import("../views/Manage.vue"),
    //      redirect:"/loginLog",
    //     meta: { title: "投顾产品" },
    //     children: [
    
       
    // }
     
 
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
// //开启路由守卫
// router.beforeEach((to, from, next) => {
//     /* 路由发生变化修改页面title */
//   if (to.meta.title) {
//       document.title = to.meta.title
//       localStorage.setItem("title",document.title)
//   }
//     localStorage.setItem("currenPathName",to.name)//设置当前路由名称
//     next()
// }
// )

export default router;
