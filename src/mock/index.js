// 引入mockjs
const Mock = require('mockjs')
// Mock.mock( url, methods [ /post|get/i | post | get] , 返回的mob数据)；// /post|get/i 匹配post和get模式 也可以用'post'或'get'
<<<<<<< HEAD
const { response, users } = require('./userData')
=======
const { response } = require('./userData')
>>>>>>> ad24299c2cbfb338e7f56e5a1e147b4269455d60
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
<<<<<<< HEAD
      name: '总部'
=======
      name: '顶级银行'
>>>>>>> ad24299c2cbfb338e7f56e5a1e147b4269455d60
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

<<<<<<< HEAD

// /api/service/dept/getDepts 机构列表
// /api/service/user/getPage
// Mock.mock('/api/service/dept/getDepts', 'post', controlor(tree))

Mock.mock('/api/service/dept/getDepts', 'post', controlor(
  [{
            "i18nCode":null,
            "lastUpdatedBy":"wcbi",
            "address":"中国",
            "orgPath":"zh",
            "lastUpdateDate":"2022-05-11 13:42:47",
            "description":"中国",
            "branchName":"0",
            "sort":1,
            "creationDate":"2021-03-09 16:40:40",
            "finCode":null,
            "areaId":1,
            "parentCode":"0",
            "areaName":"中国",
            "createdBy":"admin",
            "children":[
                {
                    "i18nCode":null,
                    "lastUpdatedBy":null,
                    "address":"",
                    "orgPath":"zh_1001",
                    "lastUpdateDate":null,
                    "description":"",
                    "branchName":"3",
                    "sort":1,
                    "creationDate":1660790532000,
                    "finCode":"",
                    "areaId":1,
                    "parentCode":"zh",
                    "areaName":"中国",
                    "createdBy":"fantao4",
                    "children":null,
                    "orgCode":"hpwd",
                    "isEnabled":"1",
                    "name":"黄埔网点",
                    "operationId":null,
                    "id":1560094682662432770,
                    "fullname":"黄埔网点"
                },
                {
                    "i18nCode":null,
                    "lastUpdatedBy":"zhouang",
                    "address":"",
                    "orgPath":"zh_1002",
                    "lastUpdateDate":1661408145000,
                    "description":"",
                    "branchName":"3",
                    "sort":1,
                    "creationDate":1661408080000,
                    "finCode":"",
                    "areaId":1,
                    "parentCode":"zh",
                    "areaName":"中国",
                    "createdBy":"zhouang",
                    "children":null,
                    "orgCode":"thwd",
                    "isEnabled":"1",
                    "name":"天河网点",
                    "operationId":null,
                    "id":1562684866134405122,
                    "fullname":"天河网点"
                },
                {
                    "i18nCode":null,
                    "lastUpdatedBy":null,
                    "address":"",
                    "orgPath":"zh_1003",
                    "lastUpdateDate":null,
                    "description":"",
                    "branchName":"3",
                    "sort":1,
                    "creationDate":1662002611000,
                    "finCode":"",
                    "areaId":1,
                    "parentCode":"zh",
                    "areaName":"中国",
                    "createdBy":"wcbi",
                    "children":null,
                    "orgCode":"cswd",
                    "isEnabled":"1",
                    "name":"测试网点",
                    "operationId":null,
                    "id":1565178511181869058,
                    "fullname":"测试网点"
                },
                {
                    "i18nCode":null,
                    "lastUpdatedBy":"wcbi",
                    "address":"",
                    "orgPath":"zh_1004",
                    "lastUpdateDate":1667262378000,
                    "description":"",
                    "branchName":"3",
                    "sort":1,
                    "creationDate":1667205559000,
                    "finCode":"",
                    "areaId":1,
                    "parentCode":"zh",
                    "areaName":"中国",
                    "createdBy":"wcbi",
                    "children":null,
                    "orgCode":"hpwd2",
                    "isEnabled":"1",
                    "name":"黄埔网点2黄埔网点2黄埔网点2",
                    "operationId":null,
                    "id":1587001254294450177,
                    "fullname":"黄埔网点2"
                },
                {
                    "i18nCode":null,
                    "lastUpdatedBy":"wcbi",
                    "address":"",
                    "orgPath":"zh_1005",
                    "lastUpdateDate":1667262383000,
                    "description":"",
                    "branchName":"3",
                    "sort":1,
                    "creationDate":1667205570000,
                    "finCode":"",
                    "areaId":1,
                    "parentCode":"zh",
                    "areaName":"中国",
                    "createdBy":"wcbi",
                    "children":null,
                    "orgCode":"hpwd3",
                    "isEnabled":"1",
                    "name":"黄埔网点3黄埔网点2黄埔网点2",
                    "operationId":null,
                    "id":1587001300435988482,
                    "fullname":"黄埔网点3"
                },
                {
                    "i18nCode":null,
                    "lastUpdatedBy":null,
                    "address":"",
                    "orgPath":"zh_1006",
                    "lastUpdateDate":null,
                    "description":"",
                    "branchName":"3",
                    "sort":1,
                    "creationDate":1667205575000,
                    "finCode":"",
                    "areaId":1,
                    "parentCode":"zh",
                    "areaName":"中国",
                    "createdBy":"wcbi",
                    "children":null,
                    "orgCode":"hpwd4",
                    "isEnabled":"1",
                    "name":"黄埔网点4",
                    "operationId":null,
                    "id":1587001322930040833,
                    "fullname":"黄埔网点4"
                },
                {
                    "i18nCode":null,
                    "lastUpdatedBy":null,
                    "address":"",
                    "orgPath":"zh_1007",
                    "lastUpdateDate":null,
                    "description":"",
                    "branchName":"3",
                    "sort":1,
                    "creationDate":1667205582000,
                    "finCode":"",
                    "areaId":1,
                    "parentCode":"zh",
                    "areaName":"中国",
                    "createdBy":"wcbi",
                    "children":null,
                    "orgCode":"hpwd5",
                    "isEnabled":"1",
                    "name":"黄埔网点5",
                    "operationId":null,
                    "id":1587001351447113730,
                    "fullname":"黄埔网点5"
                },
                {
                    "i18nCode":null,
                    "lastUpdatedBy":null,
                    "address":"",
                    "orgPath":"zh_1008",
                    "lastUpdateDate":null,
                    "description":"",
                    "branchName":"3",
                    "sort":1,
                    "creationDate":1667205588000,
                    "finCode":"",
                    "areaId":1,
                    "parentCode":"zh",
                    "areaName":"中国",
                    "createdBy":"wcbi",
                    "children":null,
                    "orgCode":"hpwd6",
                    "isEnabled":"1",
                    "name":"黄埔网点6",
                    "operationId":null,
                    "id":1587001376361279489,
                    "fullname":"黄埔网点6"
                },
                {
                    "i18nCode":null,
                    "lastUpdatedBy":null,
                    "address":"",
                    "orgPath":"zh_1009",
                    "lastUpdateDate":null,
                    "description":"",
                    "branchName":"3",
                    "sort":1,
                    "creationDate":1667205591000,
                    "finCode":"",
                    "areaId":1,
                    "parentCode":"zh",
                    "areaName":"中国",
                    "createdBy":"wcbi",
                    "children":null,
                    "orgCode":"hpwd7",
                    "isEnabled":"1",
                    "name":"黄埔网点7",
                    "operationId":null,
                    "id":1587001390571581442,
                    "fullname":"黄埔网点7"
                },
                {
                    "i18nCode":null,
                    "lastUpdatedBy":null,
                    "address":"",
                    "orgPath":"zh_1010",
                    "lastUpdateDate":null,
                    "description":"",
                    "branchName":"3",
                    "sort":1,
                    "creationDate":1667205595000,
                    "finCode":"",
                    "areaId":1,
                    "parentCode":"zh",
                    "areaName":"中国",
                    "createdBy":"wcbi",
                    "children":null,
                    "orgCode":"hpwd8",
                    "isEnabled":"1",
                    "name":"黄埔网点8",
                    "operationId":null,
                    "id":1587001406639960066,
                    "fullname":"黄埔网点8"
                },
                {
                    "i18nCode":null,
                    "lastUpdatedBy":null,
                    "address":"",
                    "orgPath":"zh_1011",
                    "lastUpdateDate":null,
                    "description":"",
                    "branchName":"3",
                    "sort":1,
                    "creationDate":1667205599000,
                    "finCode":"",
                    "areaId":1,
                    "parentCode":"zh",
                    "areaName":"中国",
                    "createdBy":"wcbi",
                    "children":null,
                    "orgCode":"hpwd9",
                    "isEnabled":"1",
                    "name":"黄埔网点9",
                    "operationId":null,
                    "id":1587001422834167809,
                    "fullname":"黄埔网点9"
                },
                {
                    "i18nCode":null,
                    "lastUpdatedBy":null,
                    "address":"",
                    "orgPath":"zh_1012",
                    "lastUpdateDate":null,
                    "description":"",
                    "branchName":"3",
                    "sort":1,
                    "creationDate":1667205666000,
                    "finCode":"",
                    "areaId":1,
                    "parentCode":"zh",
                    "areaName":"中国",
                    "createdBy":"wcbi",
                    "children":null,
                    "orgCode":"thwd2",
                    "isEnabled":"1",
                    "name":"天河网点2",
                    "operationId":null,
                    "id":1587001706075516930,
                    "fullname":"天河网点2"
                }
            ],
            "orgCode":"zh",
            "isEnabled":"1",
            "name":"银行总行",
            "operationId":null,
            "id":1,
            "fullname":"银行总行"
        }
    ]
))


Mock.mock('/api/service/user/getPage', 'get', {
  code: 0,
  msg: 'success',
  data: {
    result: users,
    total: 20,
    size: 10,
    current: 1,
    orders: [],
    optimizeCountSql: true,
    hitCount: false,
    countId: null,
    maxLimit: null,
    searchCount: true,
    pages: 2,
  },
})
=======
>>>>>>> ad24299c2cbfb338e7f56e5a1e147b4269455d60
