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
    //系统管理
    
   
    //数据统计
    //服务分配

    {
        path: "/sys",
        component: () => import("../views/Manage.vue"),
        redirect:"/loginLog",
        meta: { title: "系统管理" },
        children: [
            {
                path: "/menuConfig",
                name: "菜单管理",
                component: () => import("../views/MenuConfig.vue"),
            },
        ],
    }, 
    //系统监控
    {
        path: "/",
        component: () => import("../views/Manage.vue"),
         redirect:"/loginLog",
        meta: { title: "系统监控" },
    children:[{
                path: "/loginLog",
                name: "登录日志",
         component: () => import("../views/LoginLog.vue"),
     },
     {
                path: "/logsRecord",
                name: "操作日志",
                component: () =>import("../views/LogsRecord.vue"),
         },

     ]
    },
   //投顾产品
    // {
    //     path: "/can",
    //     component: () => import("../views/Manage.vue"),
    //      redirect:"/loginLog",
    //     meta: { title: "投顾产品" },
    //     children: [
    //         {
    //             path: "/liveMvp",
    //             name: "直播mvp",
    //             component: () =>import("../views/LiveMvp.vue"),
    //         },]
       
    // }
     
 
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
//开启路由守卫
router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
  if (to.meta.title) {
      document.title = to.meta.title
      localStorage.setItem("title",document.title)
  }
    localStorage.setItem("currenPathName",to.name)//设置当前路由名称
    next()
}
)

export default router;
