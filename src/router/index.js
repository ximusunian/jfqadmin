import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";
import RouterView from "@/router/routerview";


export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index"),
        name: "Dashboard",
        meta: {
          title: "概览",
          icon: "dashboard",
          affix: true
        }
      }
    ]
  },
  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
  },
  // 系统设置
  {
    path: "/systemSettings",
    component: Layout,
    redirect: "/systemSettings",
    meta: {
      title: "系统设置",
      icon: "people",
      mapname: "systemSettings"
    },
    children: [
      {
        path: "basicSetting",
        name: "basicSetting",
        component: () => import("@/views/systemSettings/basicSetting"),
        meta: {
          title: "基本配置",
          icon: "peoples",
          mapname: "basicSetting"
        }
      },
      {
        path: "download",
        name: "download",
        component: () => import("@/views/systemSettings/download"),
        meta: {
          title: "应用下载",
          icon: "peoples",
          mapname: "download"
        }
      },
      {
        path: "notification",
        name: "notification",
        component: () => import("@/views/systemSettings/notification"),
        meta: {
          title: "消息推送",
          icon: "peoples",
          mapname: "notification"
        }
      }
    ]
  },
  // 内容管理
  {
    path: "/contentManagement",
    component: Layout,
    redirect: "/contentManagement",
    meta: {
      title: "内容管理",
      icon: "tree",
      mapname: "contentManagement"
    },
    children: [
      {
        path: "systemNotice",
        name: "systemNotice",
        component: () => import("@/views/contentManagement/systemNotice"),
        meta: {
          title: "系统公告",
          icon: "peoples",
          mapname: "systemNotice"
        }
      }
    ]
  },
  // 用户系统
  {
    path: "/customSystem",
    component: Layout,
    redirect: "/customSystem",
    meta: {
      title: "用户系统",
      icon: "peoples",
      mapname: "customSystem"
    },
    children: [
      {
        path: "userPreferences",
        name: "userPreferences",
        component: () => import("@/views/customSystem/userPreferences"),
        meta: {
          title: "用户参数",
          icon: "peoples",
          mapname: "userPreferences"
        }
      },
      {
        path: "balanceSubsidiary",
        name: "balanceSubsidiary",
        component: () => import("@/views/customSystem/balanceSubsidiary"),
        meta: {
          title: "余额明细",
          icon: "peoples",
          mapname: "balanceSubsidiary"
        }
      },
      {
        path: "invitation",
        name: "invitation",
        component: () => import("@/views/customSystem/invitation"),
        meta: {
          title: "邀请",
          icon: "peoples",
          mapname: "invitation"
        }
      }
    ]
  },
  // 用户提现
  {
    path: "/withdrawal",
    component: Layout,
    redirect: "/withdrawal",
    meta: {
      title: "用户提现",
      icon: "peoples",
      mapname: "withdrawal"
    },
    children: [
      {
        path: "index",
        name: "index",
        component: () => import("@/views/withdrawal/index"),
        meta: {
          title: "用户提现",
          icon: "peoples",
          mapname: "index"
        }
      }
    ]
  }
];

export const asyncRoutes = [

  {
    path: "/organization",
    component: Layout,
    redirect: "/organization/company",
    name: "组织",
    meta: {
      title: "组织信息",
      icon: "tree",
      mapname: "Organization"
    },
    children: [
      {
        path: "company",
        name: "公司管理",
        component: RouterView,
        ignoreRoute: true,
        meta: {
          title: "公司管理",
          icon: "table",
          mapname: "Organization_Company"
        },
        children: [
          // {
          //   path: "company",
          //   name: "公司信息",
          //   component: () => import("@/views/organization/company"),
          //   meta: {
          //     title: "公司信息",
          //     icon: "table",
          //     mapname: "Organization_Company"
          //   }
          // },
          // {
          //   path: "company/hislog",
          //   name: "公司信息异动记录",
          //   component: () => import("@/views/organization/company/hislog.vue"),
          //   hidden: true,
          //   meta: {
          //     title: "公司信息异动记录",
          //     icon: "table",
          //     mapname: "Organization_Company_History"
          //   }
          // },
          // {
          //   path: "legal",
          //   name: "主体管理",
          //   component: () => import("@/views/organization/legal"),
          //   meta: {
          //     title: "主体管理",
          //     icon: "table",
          //     mapname: "Organization_Legal"
          //   }
          // },
          {
            path: "orgImg",
            name: "组织架构",
            component: () => import("@/views/organization/orgImg"),
            meta: {
              title: "组织架构",
              icon: "tree",
              mapname: "Organization_Company"
            }
          }
        ]
      },
      {
        path: "department",
        name: "部门管理",
        component: () => import("@/views/organization/department"),
        meta: {
          title: "部门管理",
          icon: "tree-table",
          mapname: "Organization_Department"
        }
      },
      // {
      //   path: "position",
      //   name: "职位管理",
      //   component: RouterView,
      //   meta: {
      //     title: "职位管理",
      //     icon: "table",
      //     mapname: "Organization_Position"
      //   },
      //   children: [
      //     {
      //       path: "position",
      //       name: "职位信息",
      //       component: () => import("@/views/organization/position"),
      //       meta: {
      //         title: "职位信息",
      //         icon: "table",
      //         mapname: "Organization_Position"
      //       }
      //     },
      //     {
      //       path: "setting",
      //       name: "职位设置",
      //       component: () => import("@/views/organization/setting"),
      //       meta: {
      //         title: "职位设置",
      //         icon: "table",
      //         mapname: "Organization_Position_Setting"
      //       }
      //     }
      //   ]
      // }
    ]
  },
  {
    path: "/account",
    component: Layout,
    redirect: "/account",
    meta: {
      title: "系统管理",
      icon: "people",
      mapname: "Users_Admin"
    },
    children: [
      {
        path: "list",
        name: "accountlist",
        component: () => import("@/views/account/user"),
        meta: {
          title: "用户列表",
          icon: "peoples",
          mapname: "Users_Admin_List"
        }
      },
      // {
      //   path: "admingroup",
      //   name: "admingroup",
      //   component: () => import("@/views/account/admingroup"),
      //   meta: {
      //     title: "用户分组",
      //     icon: "peoples",
      //     mapname: "Users_Admin_Group"
      //   }
      // },
      {
        path: "role",
        name: "rolelist",
        component: () => import("@/views/account/role"),
        meta: {
          title: "角色功能权限",
          icon: "lock",
          mapname: "Users_Admin_Rose"
        }
      },
      {
        path: "datarole",
        name: "datarolelist",
        component: () => import("@/views/account/datarole"),
        meta: {
          title: "角色数据权限",
          icon: "lock",
          mapname: "Users_Admin_DataRole"
        }
      },
      // {
      //   path: "backjobs",
      //   name: "backjobs",
      //   component: () => import("@/views/account/backjobs"),
      //   meta: {
      //     title: "后台任务",
      //     icon: "lock",
      //     mapname: "Users_Admin_Jobs"
      //   }
      // },
      // {
      //   path: "syssettting",
      //   name: "syssettting",
      //   component: () => import("@/views/setting/index"),
      //   meta: {
      //     title: "系统设置",
      //     icon: "lock",
      //     mapname: "Sys_Setting"
      //   }
      // },
      {
        path: "sysmodule",
        name: "sysmodule",
        component: () => import("@/views/sysmodule/index"),
        meta: {
          title: "系统功能模块",
          icon: "component",
          mapname: "Sys_Module"
        }
      },
      {
        path: "backjobs",
        name: "backjobs",
        component: () => import("@/views/jobs/index"),
        meta: {
          title: "后台任务",
          icon: "skill",
          mapname: "Users_Admin_Jobs"
        }
      },

      {
        path: "selfInfo",
        name: "selfInfo",
        component: () => import("@/views/account/userInfo"),
        meta: {
          title: "我的信息",
          icon: "people",
          mapname: "Users_MGT_Myself"
        }
      }
    ]
  }
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
      y: 0
    }),
    routes: constantRoutes
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
