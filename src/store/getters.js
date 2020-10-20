const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  userid:state=>state.user.userid,
  name: state => state.user.name,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  permissions: state => state.user.permissions,
  permission_routes: state => state.permission.routes,
  requestPath:state=>state.app.requestPath,
  permission_funcroutes: state => state.permission.funcroutes,
  deptColumns:state=>state.transferdata.deptColumns,
  groupColumns:state=>state.transferdata.groupColumns,
  editorColumns:state=>state.transferdata.editorColumns
}
export default getters
