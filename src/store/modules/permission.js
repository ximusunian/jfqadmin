import {
  asyncRoutes,
  constantRoutes
} from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  // if (route.meta && route.meta.roles) {
  //   return roles.some(role => route.meta.roles.includes(role))
  // } else {
  //   return true
  // }
  if (roles.includes(route.meta.mapname)) {
    return true
  }
  return false
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = [] 
  routes.forEach(route => {
    const tmp = { ...route
    }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
 
  return res;
}

const state = {
  routes: [],
  addRoutes: [],
  funcroutes:[]
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    var fullRouter = constantRoutes.concat(routes)
    state.routes = fullRouter
  },
  SET_FUNC_ROUTES: (state, routes) => {
    state.addRoutes = routes
    var fullRouter = constantRoutes.concat(routes)
    state.funcroutes = fullRouter
  }
}

const actions = {
  generateRoutes({
    commit
  }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      // if (roles.includes('admin')) {
      //   accessedRoutes = asyncRoutes || []
      // } else {
      //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // } 
      accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      commit('SET_FUNC_ROUTES', accessedRoutes)
      var newRes = [];
      accessedRoutes.forEach(item=>{
        var newItem = ignoreCurrentRoute(item)
        newRes.push(newItem)
      });   
      commit('SET_ROUTES', newRes)
      resolve(newRes)
    })
  }
}
function ignoreCurrentRoute(router,prefix) {
 
    var newRouter = { ...router }
    if(prefix){
        newRouter.path = prefix + '/' + router.path
    }
    if (!router.children) return newRouter
    var children = []
    if (router.ignoreRoute) {
        for (let i = 0; i < router.children.length; i++) {
            const item = ignoreCurrentRoute(router.children[i], newRouter.path)
            if (Array.isArray(item)) {
                item.forEach(el => {
                    children.push(el)
                })
            }else{
                children.push(item)
            }
        }
        newRouter = children
    } else {
        for (let i = 0; i < router.children.length; i++) {
            const item = ignoreCurrentRoute(router.children[i])
            if (Array.isArray(item)) {
                item.forEach(el => {
                    children.push(el)
                })
            }else{
              children.push(item);
            }
        }
        newRouter.children = children
    }
   
    return newRouter
}
 

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
