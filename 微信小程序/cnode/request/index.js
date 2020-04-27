//封装请求数据接口
export const request=(params)=>{
  //定义公共的url部分
  const baseurl="https://cnodejs.org/api/v1";
  return new Promise((resolve,reject)=>{
      wx.request({
            ...params,//结构参数
            url:baseurl+params.url,
            success:(result)=>{
              resolve(result);
            },
            fail:(err)=>{
              reject(err);
            }
          });
  })
}
  