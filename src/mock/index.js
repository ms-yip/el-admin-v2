// 引入mockjs
const Mock = require('mockjs')
// Mock.mock( url, methods [ /post|get/i | post | get] , 返回的mob数据)；// /post|get/i 匹配post和get模式 也可以用'post'或'get'
const { response } = require('./userData')
function controlor (data) {
  return {
    code: 0,
    msg: 'success',
    data: data
  }
}
Mock.mock('/api/login', 'post',
  controlor({
    name: 'admin',
    account: 'admin账号',
    deptInfo: {
      name: '顶级银行'
    },
    tel: '020-',
    email: '22.com',
    lastLoginip: '10.1.1.1',
    loginTotal: '1',
    lastLogintime:'1997/1/1'
  })
)

Mock.mock('/api/systemInit?language=zh_CN&code=', 'get', controlor(response)
)

Mock.mock('/api/logout', 'get',
  controlor({})
)

Mock.mock('/api/service/dept/getDepts', 'post', controlor({}))

