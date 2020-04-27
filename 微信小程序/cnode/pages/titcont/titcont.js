import{request} from"../../request/index.js";
import{requestPost} from"../../request/index_post.js"  
Page({
  data: {
    listcon:{},
    isCollect:'',
    id:"",
    accessToken:''
  },
  onLoad:function (option) {
    let urlid=option.id; 
    request({url:"/topic/"+urlid})
    .then(result=>{
      console.log(result);
        this.setData({
          listcon:result.data.data
        })
    });
    //获取accessToken
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET',
      data:{
        grant_type:'client_credential',
        appid:'wx8371627003f5bacd',
        secret:'2af8db542c0d05f8e23afdc44815f137'
      },
      success:(result)=>{
        console.log(result);
        this.setData({
          accessToken:result.data.access_token
        });
      }
    });

  },
  collect:function (params) { 
    var that=this;
    let id=this.data.listcon.id//获取收藏主题的id
    let accesstoken=this.data.accessToken;//获取用户的accesstoken  
    let isCollect=this.data.listcon.is_collect;
    if(this.data.listcon.is_collect==false){
    requestPost({url:"/topic_collect/collect"},{accesstoken:'accesstoken',topic_id:'id'})//收藏主题的接口请求
    //但问题来了，我的post请求一直报401(这个问题搞了一两都没有弄清楚)，然后我现在有点懵了，所以先把我弄得发了吧
    //这个收藏功能没有能够实现，点到全部页面重新再加载到详情页面时，收藏的就会消息，我知道怎么用本地缓存数据来改这个方法
    .then(result=>{
            console.log(result);
            if(!result.success){
              var listcon = that.data.listcon;
              listcon.is_collect = !listcon.is_collect;
              that.setData({ 
                listcon: listcon
              });
            }
          })
    }else{
      requestPost({url:"/topic_collect/de_collect"},{accesstoken:'accesstoken',topic_id:'id'})//取消收藏主题的接口请求
      .then(result=>{
              console.log(result);
              if(!result.success){
                var listcon = that.data.listcon;
                listcon.is_collect = !listcon.is_collect;
                that.setData({ 
                  listcon: listcon
                });
              }
            })
    }
        }
})