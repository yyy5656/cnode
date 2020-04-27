//封装请求数据接口post方法
export const requestPost=(params,datas)=>{
  //定义公共的url部分
  const baseurl="https://cnodejs.org/api/v1";
  return new Promise((resolve,reject)=>{
      wx.request({
            ...params,//结构参数
            url:baseurl+params.url,
            header:{
              "Content-Type":"application/x-www-form-urlencoded"
            },
            data:datas, 
            method:'POST',
            success:(result)=>{
              resolve(result);
            },
            fail:(err)=>{
              reject(err);
            }
          });
  })
}