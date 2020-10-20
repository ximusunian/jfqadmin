const state = { 
  deptColumns: {
      keyInfo:'',
      gz:'',
      xcx:'',
      jf:''
  },
  groupColumns: {
      keyInfo:'',
      gz:'',
      xcx:'',
      jf:''
  },
  editorColumns: {
      keyInfo:'',
      gz:'',
      xcx:'',
      jf:''
  }
}
const mutations = {
    SET_DEPT_KEYINFO:(state,str)=>{
        state.deptColumns.keyInfo =str;
    },
    SET_DEPT_GZ:(state,str)=>{
            state.deptColumns.gz =str;
        },
    SET_DEPT_XCX:(state,str)=>{
            state.deptColumns.xcx =str;
        },
    SET_DEPT_JF:(state,str)=>{
            state.deptColumns.jf =str;
        }, 
    SET_GROUP_KEYINFO:(state,str)=>{
        state.groupColumns.keyInfo =str;
    },
    SET_GROUP_GZ:(state,str)=>{
            state.groupColumns.gz =str;
        },
    SET_GROUP_XCX:(state,str)=>{
            state.groupColumns.xcx =str;
        },
    SET_GROUP_JF:(state,str)=>{
            state.groupColumns.jf =str;
        }, 
        SET_EDITOR_KEYINFO:(state,str)=>{
        state.editorColumns.keyInfo =str;
    },
    SET_EDITOR_GZ:(state,str)=>{
            state.editorColumns.gz =str;
        },
    SET_EDITOR_XCX:(state,str)=>{
            state.editorColumns.xcx =str;
        },
    SET_EDITOR_JF:(state,str)=>{
            state.editorColumns.jf =str;
        }

}

const actions = {
  setDeptKeyInfo({ commit }, str) {
     commit('SET_DEPT_KEYINFO', str) 
  }, 
  setDeptGz({ commit }, str) {
    commit('SET_DEPT_GZ', str)
  },
  setDeptXcx({ commit }, str) {
    commit('SET_DEPT_XCX', str)
  },
  setDeptJf({ commit }, str) {
    commit('SET_DEPT_JF', str)
  },
  setGroupKeyInfo({ commit }, str) {
     commit('SET_GROUP_KEYINFO', str) 
  }, 
  setGROUPGz({ commit }, str) {
    commit('SET_GROUP_GZ', str)
  },
  setGROUPXcx({ commit }, str) {
    commit('SET_GROUP_XCX', str)
  },
  setGROUPJf({ commit }, str) {
    commit('SET_GROUP_JF', str)
  },
   setEditorKeyInfo({ commit }, str) {
     commit('SET_Editor_KEYINFO', str) 
  }, 
  setEditorGz({ commit }, str) {
    commit('SET_Editor_GZ', str)
  },
  setEditorXcx({ commit }, str) {
    commit('SET_Editor_XCX', str)
  },
  setEditorJf({ commit }, str) {
    commit('SET_Editor_JF', str)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}