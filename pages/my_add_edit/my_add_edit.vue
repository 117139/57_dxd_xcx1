<template>
	<view>
		<view class="hengxian"></view>
		<form class="container" @submit="formSubmit">
			<view class="addmsg aic">
				<view class="msgtit">物流公司</view>
				<input class="msgsrk" name="wuliu" v-model="wuliu" type="text" placeholder="请填写物流公司" />
			</view>
			<view class="addmsg aic">
				<view class="msgtit">发货人</view>
				<input class="msgsrk" name="name" v-model="uname" type="text" placeholder="请填写发货人姓名" />
			</view>
			<view class="addmsg aic">
				<view class="msgtit">手机号</view>
				<input class="msgsrk" name="tel" v-model="phone" type="number" placeholder="请填写发货人手机号码" />
			</view>

			<!-- <region-picker class="addmsg" mode="region" :jsonData="areaJson" @change="bindRegionChange" :value="region"> -->
				<picker @change="bindRegionChange" :value="region" mode="region">
                   
					<view class="addmsg aic">
						<view class="msgtit">省市区</view>
						<input class="msgsrk" name="address" type="text" placeholder="请选择地区" :value="region"
						 disabled />
						 <text class="iconfont icon-next-m" style="color: #999;font-size: 20upx;"></text>
						
						 <view style="width: 90upx;"></view>
					</view>
				</picker>
			<!-- </region-picker> -->
			<view class="addmsg aift">
				<view class="msgtit">详细地址</view>
				<textarea class="msgsrk" name="xxaddress" v-model="xxaddress" type="text" placeholder="街道、楼牌号等" maxlength="40" />
				
				<view @tap.stop="dingwei" class="dw_btn">定位</view>
			</view>
			<view class="addmsg aic">
				<view class="">设置默认地址</view>
				<switch :checked="moren" class="mrdz" @change="switch1Change" color="#FFDA22" />
				<input hidden type="text" name="moren" :value="moren" />
			</view>
			<!-- <view class="definebtn">保存</view> -->
			<button class="definebtn" form-type="submit">保存</button>
		</form>

	</view>
</template>

<script module="filter" lang="wxs" src="../../utils/filter.wxs"></script>
<script>
	import service from '../../service.js';
	import regionPicker from "@/components/region-picker/region-picker.vue"
	import QQMapWX from'../../libs/qqmap-wx-jssdk.js';
	var qqmapsdk;
	var location = "";
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				btnkg: 0, //0ok  1off
				id: '',
				wuliu:'',
				uname: '',
				phone: '',
				region_id:[1, 35, 36],
				region: [],
				moren: false,
				xxaddress: '',
				areaJson:{},
				ldata:true,
				latitude:'',
				longitude:''
			}
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginDatas'
			])
		},
		components: {
			regionPicker
		},
		onLoad: function(option) {
			var that =this
			if (option.address) {
				var address=JSON.parse(option.address)
				console.log(address)
			  //设置变量 address 的值
				this.id=address.id
				this.wuliu=address.company_name
				this.uname=address.name
				this.phone=address.phone
				this.region[0] = address.province
				this.region[1] = address.city
				this.region[2] = address.district
				this.xxaddress = address.address
				this.latitude = address.coordinate_x
				this.longitude = address.coordinate_y
				if(address.default==1){
					this.moren=true
				}else{
					this.moren=false
				}
				
			}
			 
			// } else {
			  // 实例化API核心类
			  qqmapsdk = new QQMapWX({
			    //此key需要用户自己申请
			    key: 'ULRBZ-FBEAW-QLLR7-RUBGJ-SGQPJ-YOFFU'
			  });
			  var that = this;
			  // 调用接口
			  qqmapsdk.reverseGeocoder({
			    success: function (res) {
			      console.log(res);
			      
			    },
			    fail: function (res) {
			      //console.log(res);
			
			    },
			    complete: function (res) {
			      //console.log(res);
			    }
			  });
			// }
			
			
			

		},
		onShow() {
			var that =this
			wx.getSetting({
			  success: (res) => {
			    console.log(res.authSetting['scope.userLocation'])
			    if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {//非初始化进入该页面,且未授权
			      that.ldata= false
			    } else if (res.authSetting['scope.userLocation'] == undefined) {//初始化进入
			      // that.getLocation(that);
			      that.ldata=  false
			    }
			    else { //授权后默认加载
			      console.log('授权后默认加载')
			      // that.getLocation(that);
			      that.ldata= true
			    }
			  }
			})
		},
		methods: {
			dingwei(){
				this.moveToLocation()
				return
				uni.getLocation({
				    type: 'gcj02', //返回可以用于uni.openLocation的经纬度
				    success: function (res) {
				        const latitude = res.latitude;
				        const longitude = res.longitude;
				        uni.openLocation({
				            latitude: latitude,
				            longitude: longitude,
				            success: function () {
				                console.log('success');
				            }
				        });
				    }
				});
			},
			//移动选点
			moveToLocation: function () {
			  var that = this;
			  wx.chooseLocation({
			    success: function (res) {
			      console.log(res);
						 
			      
			     
			      that.longitude=res.longitude
			      that.latitude=res.latitude
						
						// 调用接口
						qqmapsdk.reverseGeocoder({
							location: {
								latitude: res.latitude,
								longitude: res.longitude
							},
						  success: function (res) {
						    console.log(res.result);
								var add=res.result
								 that.xxaddress=add.formatted_addresses.recommend
								 // that.xxaddress=res.formatted_addresses
								var newarr=[add.ad_info.province,add.ad_info.city,add.ad_info.district]
						    that.region=newarr
						  },
						  fail: function (res) {
						    //console.log(res);
									
						  },
						  complete: function (res) {
						    //console.log(res);
						  }
						});
			    },
			    fail: function (err) {
			      console.log(err)
			    }
			  });
			},
			//选择地区
			bindRegionChange(e) {
				console.log('picker发送选择改变，携带值为', e.detail)
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.region = e.detail.value
				this.region_id = e.detail.code
			},
			//设置默认
			switch1Change(e) {
				console.log('switch1 发生 change 事件，携带值为', e.detail.value)
				this.moren = e.detail.value == true ? 1 : 0
			},
			getarea() {
				var that =this
				var jkurl='/area'
				var data={}
				service.get(jkurl, data,
					function(res) {
						that.btnkg = 0
						// if (res.data.code == 1) {
						if (res.data.code == 1) {
							var datas = res.data.data
							// console.log(typeof datas)

							if (typeof datas == 'string') {
								datas = JSON.parse(datas)
							}
							
							that.areaJson=datas
						} else {
							if (res.data.msg) {
								uni.showToast({
									icon: 'none',
									title: res.data.msg
								})
							} else {
								uni.showToast({
									icon: 'none',
									title: '操作失败'
								})
							}
						}
					},
					function(err) {
						that.btnkg = 0

						uni.showToast({
							icon: 'none',
							title: '获取数据失败'
						})

					}
				)
			},
			//提交表单
			formSubmit(e) {
				let that = this

				console.log('form发生了submit事件，携带数据为：', e.detail.value)
				let formresult = e.detail.value
				//wuliu
				if (formresult.wuliu == '') {
					wx.showToast({
						title: '物流公司不能为空',
						duration: 2000,
						icon: 'none'
					});
					return false;
				}
				if (formresult.name == '') {
					wx.showToast({
						title: '发货人姓名不能为空',
						duration: 2000,
						icon: 'none'
					});
					return false;
				}
				if (!(/^1\d{10}$/.test(formresult.tel))) {
					wx.showToast({
						title: '手机号码有误',
						duration: 2000,
						icon: 'none'
					});
					return false;
				}
				if (that.region.length==0) {
					wx.showToast({
						title: '请选择地区',
						duration: 2000,
						icon: 'none'
					});
					return false;
				}
				if (formresult.xxaddress == '') {
					wx.showToast({
						title: '请填写详情地址',
						duration: 2000,
						icon: 'none'
					});
					return false;
				}

				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
				}
				var jkurl = '/my/address'
				var data = {
					token: that.loginDatas.token,
					company_name: formresult.wuliu,
					name: formresult.name,
					phone: formresult.tel,
					province: that.region[0],
					city: that.region[1],
					district: that.region[2],
					address: formresult.xxaddress,
					coordinate_x:that.latitude,
					coordinate_y:that.longitude,
					type:1,
					default: that.moren ? 1 : 0
				}
				if (that.id) {
					data = {
						id: that.id,
						token: that.loginDatas.token,
						company_name: formresult.wuliu,
						name: formresult.name,
						phone: formresult.tel,
						province: that.region[0],
						city: that.region[1],
						district: that.region[2],
						address: formresult.xxaddress,
						coordinate_x:that.latitude,
						coordinate_y:that.longitude,
						type:1,
						default: that.moren ? 1 : 0,
						op:'update'
					}
				}
				// uni.showToast({
				// 	icon: 'none',
				// 	title: '操作成功'
				// })
				// setTimeout(() => {
				// 	uni.navigateBack()
				// }, 1000)
				// return
				service.P_post(jkurl, data).then(res => {
					that.btnkg = 0
					console.log(res)
					if (res.code == 1) {
						uni.showToast({
							icon: 'none',
							title: '操作成功'
						})
						setTimeout(() => {
							uni.navigateBack()
						}, 1000)
					
					} else {
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '操作失败'
							})
						}
					}
				}).catch(e => {
					that.btnkg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '操作失败'
					})
				})
			}
		}
	}
</script>

<style scoped>
	.dw_btn{
		width: 80upx;
		height: 100upx;
		background: #fff;
		position: relative;
		top: -50upx;
		z-index: 99;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #FFAE22;
		font-size: 28upx;
		border: 0;
		padding: 0;
	}
	.dw_btn::after{
		display: none;
	}
	.container {
		width: 100%;
		display: block;
		padding: 0 28rpx;
		box-sizing: border-box;
		background-color: #fff;
		position: relative;
	}

	.addmsg {
		width: 694rpx;
		min-height: 90rpx;
		border-bottom: 1px solid #F3F3F3;
		display: flex;
		justify-content: space-between;
		
		font-size: 26rpx;
		color: #333;
	}
	
	.addmsg textarea{
		height: 180upx;
		text-align: left;
		padding: 30upx 10upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		text-align: left;
	}
	.msgtit {
		width: 138rpx;
		font-size: 28upx;
		line-height: 100upx;
		color: #666;
	}

	.msgsrk {
		flex: 1;
		text-align: right;
		font-size: 28upx;
	}

	.definebtn {
		position: fixed;
		border-radius: 0;
		bottom: 30rpx;
		left: 28rpx;
		right: 28rpx;
		height: 84rpx;
		border-radius: 44upx;
		margin-top: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #333;
		font-size: 28rpx;
		background-color: #FFDA22;
	}

	.wx-switch-input {
		width: 86rpx !important;
		height: 50rpx !important;
	}

	.wx-switch-input::before {
		width: 84rpx !important;
		height: 48rpx !important;
	}

	.wx-switch-input::after {
		width: 44rpx !important;
		height: 44rpx !important;
	}
</style>
