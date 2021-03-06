var app = getApp();

Page({
    data: {
        kdname: "",
        kdnum: ""
    },
    bindnameInput: function(t) {
        this.setData({
            kdname: t.detail.value
        });
    },
    bindnumInput: function(t) {
        this.setData({
            kdnum: t.detail.value
        });
    },
    onLoad: function(t) {
        var e = t.id;
        this.setData({
            id: e
        }), this.refresh();
    },
    refresh: function(t) {
        var e = this, n = e.data.id;
        app.util.request({
            url: "entry/wxapp/StoreOrderInfo",
            cachetime: "0",
            data: {
                order_id: n
            },
            success: function(t) {
                console.log(t), t.data.time = app.ormatDate(t.data.time), console.log(t.data.address.length), 
                22 < t.data.address.length && e.setData({
                    height: 40
                }), e.setData({
                    oreder_info: t.data
                });
            }
        });
    },
    Deliver: function(t) {
        var e = this, n = this.data.kdname, a = this.data.kdnum;
        if (console.log(this.data.oreder_info.is_zt, n, a), 2 != this.data.oreder_info.is_zt || "" != n && "" != a) {
            var o = e.data.id;
            app.util.request({
                url: "entry/wxapp/DeliveryOrder",
                cachetime: "0",
                data: {
                    order_id: o,
                    kd_name: n,
                    kd_num: a
                },
                success: function(t) {
                    console.log(t), wx.showToast({
                        title: "操作成功",
                        icon: "",
                        image: "",
                        duration: 2e3,
                        mask: !0,
                        success: function(t) {
                            setTimeout(function() {
                                e.refresh();
                            }, 1e3);
                        },
                        fail: function(t) {},
                        complete: function(t) {}
                    });
                }
            });
        } else wx.showModal({
            title: "提示",
            content: "请填写发货快递名称及快递单号"
        });
    },
    complete: function(t) {
        var e = this;
        console.log(t);
        var n = e.data.id;
        app.util.request({
            url: "entry/wxapp/CompleteOrder",
            cachetime: "0",
            data: {
                order_id: n
            },
            success: function(t) {
                console.log(t), wx.showToast({
                    title: "操作成功",
                    icon: "",
                    image: "",
                    duration: 2e3,
                    mask: !0,
                    success: function(t) {
                        setTimeout(function() {
                            e.refresh();
                        }, 2e3);
                    },
                    fail: function(t) {},
                    complete: function(t) {}
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});