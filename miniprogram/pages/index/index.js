Page({
  data: {
    //轮播图配置
    autoplay: true,
    interval: 3000,
    duration: 1200
  },
  onLoad: function () {
    var that = this; 
    var data = {
      "datas": [
        {
          "id": 1,
          "images": "/images/1.png"
        },
        {
          "id": 2,
          "images": "/images/2.png"
        },
        {
          "id": 3,
          "images": "/images/3.png"
        }
      ]
    }; 
  },

  chuantupian() {
    let that = this;
    let timestamp = (new Date()).valueOf();
    wx.chooseImage({
     success: chooseResult => {
      wx.showLoading({
       title: '上传中',
      })
      // 将图片上传至云存储空间
      wx.cloud.uploadFile({
       // 指定上传到的云路径
       cloudPath: 'user/abc.png',
       // 指定要上传的文件的小程序临时文件路径
       filePath: chooseResult.tempFilePaths[0],
       // 成功回调
       success: res => {
        console.log('上传成功', res)
        wx.hideLoading()
        wx.showToast({
         title: '上传图片成功',
        })
        if (res.fileID) {
         that.setData({
          zhaopian: '图片如下',
          imgUrl: res.fileID
         })
        }
  
       },
      })
     },
    })
   },

   /**
   * 页面的初始数据
   */
  data: {
    addressList:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var arr = wx.getStorageSync('addressList') || [];
    console.info("缓存数据：" + arr);
    // 更新数据  
    this.setData({
      addressList: arr
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad();
  },
  addAddress:function(){
    wx.navigateTo({ url: '../address/address' });
  },
  addAddress1:function(){
    wx.navigateTo({ url: '../lookFor/lookFor' });
  },
  /* 删除item */
  delAddress: function (e) {
    this.data.addressList.splice(e.target.id.substring(3), 1);
    // 更新data数据对象  
    if (this.data.addressList.length > 0) {
      this.setData({
        addressList: this.data.addressList
      })
      wx.setStorageSync('addressList', this.data.addressList);
    } else {
      this.setData({
        addressList: this.data.addressList
      })
      wx.setStorageSync('addressList', []);
    }
  }

})