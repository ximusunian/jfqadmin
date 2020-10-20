import request from '@/utils/request' 
 

 

export function getAllLegals(){
  return request({
    url: '/api/ComboBox/GetLegals',
    method: 'get' 
  })
}

export function getallpplans(){
  return request({
    url: '/api/ComboBox/GetAllPerfPlans',
    method: 'get' 
  })
}

export function getallposition(){
  return request({
    url: '/api/ComboBox/GetPositions',
    method: 'get' 
  })
}
export function getpositionlevels(){
  return request({
    url: '/api/ComboBox/GetPositionLevels',
    method: 'get' 
  })
}
export function getpositiontypes(){
  return request({
    url: '/api/ComboBox/GetPositionTypes',
    method: 'get' 
  })
}

export function getdepartments(){
  return request({
    url: '/api/ComboBox/GetDepartments',
    method: 'get' 
  })
}

export function getAllShiftPlans(){
  return request({
    url: '/api/Shift/AllShitPlan',
    method: 'get' 
  })
}