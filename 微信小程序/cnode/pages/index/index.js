import{request} from"../../request/index.js";
const app = getApp()

Page({
  //subnav侧边栏的动画
  data: {
    extraClasses: '',
    dis:'subnav_r-none',
    // 页面数据
    list:[],
  },
  triggerTransition: function () {
    this.setData({
      extraClasses: 'subnav-transition',
      dis:'subnav_r-block'
    })
  },
  touchstart:function () {
    console.log(0);
    this.setData({
      dis:"subnav_r-none",
      extraClasses: ''
    })
  },
  onLoad:function () {
    //原生的数据请求方式，如果请求下一页数据的时候，应嵌套，多次刷新后就会变成回调地狱，应封装呈promise
    request({url:"/topics"})
      .then(result=>{
        console.log(result);
        this.setData({
              list:[...this.data.list,...result.data.data]
            })
    });
    
    
  },
  onReachBottom:function (params) {
    request({url:"/topics"})
      .then(result=>{
        console.log(result);
        this.setData({
          list:[...this.data.list,...result.data.data]
            })
      })
      //获取下一页数据
      .then(result=>{
        this.setData({
          list:[...this.data.list,...result.data.data]
        })
      })
  },
  //上拉页面刷新
  //1.封装请求接口的函数
  //2.获取第一页数据
  //3.用onReachBottom监视，调用请求接口函数，页码+1 
  //4.将请求的数组拼接到原数组
})

