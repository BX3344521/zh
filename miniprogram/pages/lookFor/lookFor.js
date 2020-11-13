Page({
  data: {
    username:"",
    phone:"",
    kd:"",
    ss:""
  },
  userNameInput:function(e)
  {
    this.setData({
      userName: e.detail.value
    })
  },
  phoneInput:function(e)
  {
    this.setData({
      phone: e.detail.value
    })
  },
  kdInput: function (e) {
    this.setData({
      kd: e.detail.value
    })
  },
  bindReplaceInput: function (e) {
    var value = e.detail.value
    var pos = e.detail.cursor
    var left
    if (pos !== -1) {
      // 光标在中间
      left = e.detail.value.slice(0, pos)
      // 计算光标的位置
      pos = left.replace(/11/g, '2').length
    }

    // 直接返回对象，可以对输入进行过滤处理，同时可以控制光标的位置
    return {
      value: value.replace(/11/g, '2'),
      cursor: pos
    }

    // 或者直接返回字符串,光标在最后边
    // return value.replace(/11/g,'2'),
  },
  bindHideKeyboard: function (e) {
    if (e.detail.value === '123') {
      // 收起键盘
      wx.hideKeyboard()
    }
  },
  res: function(e) {
    const db = wx.cloud.database()
    db.collection('user').add({
      data: {
        username: e.detail.value.username,
        phone: e.detail.value.phone,
        kd: e.detail.value.kd,
        ss: e.detail.value.ss
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          username: e.detail.value.username,
          phone: e.detail.value.phone,
          kd: e.detail.value.kd,
          ss: e.detail.value.ss
        })
        wx.showToast({
          title: '新增记录成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },
})