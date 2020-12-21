<template>
	<view>
		<view style="width: 100%;height: 11upx;background: #F6F6F6;"></view>
		<view v-if="!datas" class="zanwu">暂无数据</view>
		<view v-if="datas" class="order_box">
			<view class="d1 dis_flex aic ju_b">
				<view class="d1_l">发</view>
				<view class="flex_1">
					<view class="w100 od_li dis_flex aic ju_b">
						<view>{{datas.f_address.name}}</view>
						<view @tap="call" :data-tel="datas.f_address.phone">{{datas.f_address.phone}}</view>
					</view>
					<view class="w100 od_li1">{{datas.f_address.company_name}}</view>
					<view class="w100 od_li2">{{datas.f_address.address}}</view>
				</view>
				<view v-if="sj_type==0" class="order_dh" @tap="map_dp(datas.f_address)">
					<text class="iconfont icon-daohang"></text>导航至起点
				</view>
			</view>
			<view class="d1 dis_flex aic ju_b">
				<view class="d1_l d1_l1">收</view>
				<view class="flex_1">
					<view class="w100 od_li dis_flex aic ju_b">
						<view>{{datas.s_address.name}}</view>
						<view  @tap="call" :data-tel="datas.s_address.phone">{{datas.s_address.phone}}</view>
					</view>
					<view class="w100 od_li2">{{datas.s_address.address}}</view>
				</view>
			</view>
			<view class="d1 dis_flex aic ju_b">
				<view class="d1_l d1_l1">物</view>
				<view class="flex_1">
					<view class="w100 od_li dis_flex aic  ju_b">
						<view>{{datas.w_address.name}}</view>
						<view @tap="call" :data-tel="datas.w_address.phone">{{datas.w_address.phone}}</view>
					</view>
					<view class="w100 od_li1">{{datas.w_address.company_name}}</view>
					<view class="w100 od_li2">{{datas.w_address.address}}</view>
				</view>

				<view v-if="sj_type==0" class="order_dh" @tap="map_dp(datas.w_address)" style="background:#4C8DED;">
					<text class="iconfont icon-daohang"></text>导航至终点
				</view>
			</view>
		</view>
		<view v-if="datas" style="width: 100%;height: 11upx;background: #F6F6F6;"></view>
		<view v-if="datas" class="order_box">
			<!-- <picker mode = "date" :value="fh_time" start="09:01" end="21:01" @change="bindTimeChange"> -->
			<view class="fh_time dis_flex aic ">
				<view class="fh_name">订单号：</view>

				<view class="fh_times flex_1">{{datas.no}}</view>
			</view>
			<view class="fh_time dis_flex aic ">
				<view class="fh_name">发货时间</view>

				<view class="fh_times flex_1">{{gettime(datas.delivery_time)}}</view>
			</view>
			<!-- </picker> -->
			<view class="fh_time dis_flex aic ">
				<view class="fh_name">货物重量</view>
				<view class=" flex_1"></view>
				<view class="fh_times flex_1">{{datas.weight}}kg</view>
			</view>
			<view class="hw_num dis_flex aift ju_b">
				<view class="fh_name">货物数量:</view>
				<view class="hw_list">
					<view class="hw_li dis_flex aic ju_b" v-for="(item,index) in datas.orderItem.product_data">
						<view class="dis_flex aic">{{item.name}}</view>
						<view class="numcz dis_flex aic">

							<view>{{item.num}}</view>
						</view>
					</view>


				</view>
			</view>
			<view v-if="type>0" class="hw_num dis_flex_c">
				<view class="fh_name">上门服务司机师傅:</view>
				<view v-if="type==1" class="zanwu">暂无分配</view>
				<view v-else class="sf_list w100">
					<view class="sf_li dis_flex aic" v-for="(item,index) in datas.orderWorker">
						<image class="sf_tx" :src="getimg(item.user.avatar)" mode="aspectFill"></image>
						<view class="sf_name flex_1">{{item.user.real_name}}</view>
						<view class="sf_tel" @tap="call" :data-tel="item.user.phone">{{item.user.phone}}</view>
					</view>
				</view>
			</view>

			<view v-if="type>2||sj_type==0&&type>1" class="fh_time dis_flex aic ">
				<view class="fh_name">运费合计：</view>
				<view class=" flex_1"></view>
				<view class="fh_times flex_1">￥{{datas.total_amount}}元</view>
			</view>
			<view v-if="sj_type==0&&type>2&&datas.worker_money" class="fh_time dis_flex aic ">
				<view class="fh_name">人均运费：</view>
				<view class=" flex_1"></view>
				<view class="fh_times flex_1">￥{{datas.worker_money}}元</view>
			</view>
			<view v-if="type>2" class="fh_time dis_flex aic ">
				<view class="fh_name">支付状态：</view>
				<view class=" flex_1"></view>
				<view v-if="datas.payment_status==1" class="fh_times flex_1">已支付</view>
				<view v-else class="fh_times flex_1">未支付</view>
			</view>
			<view v-if="sj_type==0&&type==3" class="hw_num dis_flex_c no_bottom">
				<view class="fh_name">添加照片:</view>
				<view class="sj_img_list dis_flex">
					<view class="sj_img_li" v-for="(item,index) in sj_img">
						<image class="img_del" src="../../static/images/img_del.png" mode="aspectFill" @tap="imgdel" :data-idx="index"></image>
						<image mode="aspectFill" :src="getimg(item)" @tap="pveimg" :data-src="getimg(item)"></image>
					</view>
					<view class="sj_img_li" v-if="sj_img.length<9">
						<image mode="aspectFill" src="../../static/images/upimg_03.jpg" @tap="upimg"></image>
					</view>

				</view>
			</view>
			<view v-if="type>3" class="hw_num dis_flex_c no_bottom">
				<view class="fh_name">司机上传照片:</view>
				<view class="sj_img_list dis_flex">
					<block v-for="(item,index) in datas.orderWorker">
						<view class="sj_img_li" v-for="(item1,index1) in item.img">
							<image mode="aspectFill" :src="getimg(item1)" @tap="pveimg" :data-src="getimg(item1)"></image>
						</view>
					</block>

				</view>
			</view>

			<view style="width: 100%;height: 140upx;"></view>
			<!-- 用户 -->
			<block v-if="sj_type==1">
				<view v-if="type==1" class="order_bottom dis_flex aic ju_c">
					<view class="order_yf" style="text-align: center;padding-left: 0;">订单待分配</view>

				</view>
				<view v-if="type==2" class="order_bottom dis_flex aic ju_b">
					<view class="order_yf flex_1 dis_flex aic">运费： <input placeholder-class="order_yf_int" type="number" v-model="orderMoney"
						 placeholder="请输入" /> 元</view>
					<view class="order_btn" @tap="set_orderMoney">确定价格</view>
				</view>
				<view v-if="type==3&&datas.payment_status!=1" class="order_bottom dis_flex aic ju_b">
					<view class="order_yf flex_1 dis_flex aic">运费： <text style="color: #FF3030;font-size: 36upx;margin-right: 10upx;">{{datas.total_amount}}
						</text> 元</view>
					<view class="order_btn order_btn1" @tap="pay">立即支付</view>
					<view v-if="loginDatas.vip==1" class="order_btn" @tap="pay1">签约月结</view>
				</view>
				<view v-if="type==3&&datas.payment_status==1" class="order_bottom dis_flex aic ju_c">
					<view class="order_yf" style="text-align: center;padding-left: 0;">订单已支付</view>
				</view>
			</block>
			<!-- 司机 -->
			<block v-if="sj_type==0">
				<view v-if="type==2" class="order_bottom order_bottom1 dis_flex aic ju_a">
					<!-- <view class="sjjd_btn" @tap="order_back">拒绝接单</view> -->
					<view class="sjjd_btn" style="background: #FFDA22;width: 690upx;" @tap="order_next">立即接单</view>
				</view>
				<view v-if="type==3" class="order_bottom order_bottom1 dis_flex aic ju_a">

					<view class="sjjd_btn" style="background: #FFDA22;width: 690upx;" @tap="order_ok">完成订单</view>
				</view>
			</block>

		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	import service from '../../service.js';
	import biaofunDatetimePicker from '@/components/biaofun-datetime-picker/biaofun-datetime-picker.vue';
	import QQMapWX from '../../libs/qqmap-wx-jssdk.js';
	var qqmapsdk;
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				btnkg: 0,
				type: 0,
				id: '',
				fh_time: '',
				datas: '',
				sj_img: [],
				orderMoney: ''
			}
		},
		/**
		 * 页面用到的组件
		 */
		components: {
			biaofunDatetimePicker
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginDatas',
				'sj_type'
			])
		},
		onLoad(option) {
			this.id = option.id || ''
			this.type = option.type || ''
			this.getdata()
		},
		methods: {
			getTel(num, num1, num2) {
				return service.getTel(num, num1, num2)
			},
			getimg(img) {
				return service.getimg(img)
			},
			gettime(time) {
				if (!time) {
					return
				}
				time = time.split('-').join('.').split(':')
				return time[0] + ':' + time[1]
			},
			map_dp(data) {
				let that = this
				let plugin = requirePlugin('routePlan');
				let key = 'ULRBZ-FBEAW-QLLR7-RUBGJ-SGQPJ-YOFFU'; //使用在腾讯位置服务申请的key
				let referer = '达鑫达'; //调用插件的app的名称
				let endPoint = JSON.stringify({ //终点
					'name': data.address,
					'latitude': parseFloat(data.coordinate_x),
					'longitude': parseFloat(data.coordinate_y)
				});
				console.log(endPoint)
				uni.navigateTo({
					url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint + '&navigation=1'
				});
			},
			order_back() {
				var that = this
				uni.showModal({
					title: '提示',
					content: '确定要拒绝该订单吗',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							var jkurl = '/order/orderAccecp'
							if (that.btnkg == 1) {
								return
							}
							that.btnkg = 1
							var datas = {
								token: that.loginDatas.token,
								id: that.id,
								status: 0
							}
							service.P_post(jkurl, datas).then(res => {

								that.btnkg = 0
								console.log(res)
								if (res.code == 1) {
									var datas = res.data
									console.log(typeof datas)

									if (typeof datas == 'string') {
										datas = JSON.parse(datas)
									}
									console.log(datas)
									uni.showToast({
										icon: 'none',
										title: '拒绝成功'
									})
									setTimeout(() => {
										uni.navigateBack({
											delta: 1
										})
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
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})






			},
			// 接单
			order_next() {
				var that = this
				var jkurl = '/order/orderAccecp'
				if (that.btnkg == 1) {
					return
				}
				that.btnkg = 1
				var datas = {
					token: that.loginDatas.token,
					id: that.id,
					status: 1
				}
				service.P_post(jkurl, datas).then(res => {

					that.btnkg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)

						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						console.log(datas)
						uni.showToast({
							icon: 'none',
							title: '接单成功'
						})
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
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
			},
			//完成订单
			order_ok() {
				var that = this
				
				if (that.sj_img.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请上传图片'
					})
					return
				}
				var datas = {
					token: that.loginDatas.token,
					id: that.id,
					img: that.sj_img.join(',')
				}
				var jkurl = '/order/orderFinish'
				if (that.btnkg == 1) {
					return
				}
				that.btnkg = 1
				service.P_post(jkurl, datas).then(res => {

					that.btnkg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)

						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						console.log(datas)
						uni.showToast({
							icon: 'none',
							title: '操作成功'
						})
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
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
			},

			//获取详情
			getdata() {

				let that = this
				var jkurl = '/order/orderShow'
				var datas = {
					token: that.loginDatas.token || '',
					status: that.type, //1未分配 2未接单 3已接单 4已送达
					id: that.id
				}

				uni.showLoading({
					title: '正在获取数据'
				})
				service.P_post(jkurl, datas).then(res => {

					that.btnkg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)

						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						console.log(datas)

						that.datas = datas


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
						title: '获取数据失败'
					})
				})
			},

			//设置运费
			set_orderMoney() {
				var that = this
				var jkurl = '/order/orderMoney'
				if (!that.orderMoney) {
					uni.showToast({
						icon: 'none',
						title: '请输入运费'
					})
					return
				}
				var datas = {
					token: that.loginDatas.token,
					id: that.id,
					money: that.orderMoney
				}
				service.P_post(jkurl, datas).then(res => {

					that.btnkg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)

						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						console.log(datas)
						uni.showToast({
							icon: 'none',
							title: '操作成功'
						})
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
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
			},
			pay() {
				var that = this
				var jkurl = '/order/orderPay'
				var status = 1
				var datas = {
					token: that.loginDatas.token || '',
					id: that.id,
					status: status //status=1 or 0，1微信支付，0余额，
				}
				if (this.btnkg == 1) {
					return
				}
				this.btnkg = 1
				uni.showLoading({
					mask: true,
					title: '正在生成订单'
				})

				service.P_post(jkurl, datas).then(res => {
					that.btnkg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)

						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						console.log(res)
						if (status == 0) {
							uni.showToast({
								icon: 'none',
								title: '支付成功'
							})
							setTimeout(function() {
								uni.navigateBack()
							}, 1000)
						} else {
							service.wxpay(res.data, 'fwb').then(res => {
								uni.showToast({
									icon: 'none',
									title: '支付成功'
								})
								setTimeout(function() {
									uni.navigateBack()
								}, 1000)
							}).catch(e => {
								that.btnkg = 0
								uni.showToast({
									icon: 'none',
									title: '微信支付失败'
								})

							})
						}



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


			},
			pay1() {
				var that = this
				var jkurl = '/order/orderPay'
				var status = 0
				var datas = {
					token: that.loginDatas.token || '',
					id: that.id,
					status: status //status=1 or 0，1微信支付，0余额，
				}
				if (this.btnkg == 1) {
					return
				}
				this.btnkg = 1
				uni.showLoading({
					mask: true,
					title: '正在生成订单'
				})

				service.P_post(jkurl, datas).then(res => {
					that.btnkg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)

						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						console.log(res)
						if (status == 0) {
							uni.showToast({
								icon: 'none',
								title: '月结支付成功'
							})
							setTimeout(function() {
								uni.navigateBack()
							}, 1000)
						} else {
							service.wxpay(res.data, 'fwb').then(res => {
								uni.showToast({
									icon: 'none',
									title: '月结支付成功'
								})
								setTimeout(function() {
									uni.navigateBack()
								}, 1000)
							}).catch(e => {
								that.btnkg = 0
								uni.showToast({
									icon: 'none',
									title: '微信支付失败'
								})

							})
						}



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

			},
			sub() {
				uni.showToast({
					icon: 'none',
					title: '操作成功'
				})
				setTimeout(function() {
					uni.navigateBack({
						delta: 1
					})
				}, 1000)
			},
			changeDatetimePicker(date) {
				console.log('选择的日期时间数据：', date);
			},
			bindTimeChange(e) {
				console.log(e)
			},
			hw_num(e) {
				console.log(e)
			},
			//多选
			duoxuan(item, index) {
				if (item.type == true) {
					var datas = index.currentTarget.dataset
					Vue.set(item, 'type', false);

				} else {
					Vue.set(item, 'type', true);

				}
			},
			num_fuc(item, d) {
				var datas = d.currentTarget.dataset
				var num = item.num || 0
				if (datas.type == '-') {

					if (num < 1) {
						return
					} else {
						num--
					}

				} else {

					num++

				}
				console.log(num)
				Vue.set(item, 'num', num);
			},
			jump(e) {
				service.jump(e)
			},
			pveimg(e) {
				service.pveimg(e)
			},
			call(e){
				service.call(e)
			},
			upimg() {
				var that = this
				// 从相册选择1张图
					var z_count = 9 - that.sj_img.length
				uni.showActionSheet({
						itemList: ['拍照', '相册'],
						success: function (res) {
								console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
								var sourceType=['camera', 'album']
								if(res.tapIndex==0){
									 sourceType=['camera']
								}else{
									sourceType=['album']
								}
								uni.chooseImage({
									count: z_count,
									sizeType: ['original', 'compressed'],
									sourceType:sourceType,
									success: function(res) {
										console.log(res)
										const tempFilePaths = res.tempFilePaths
								
										const imglen = that.sj_img.length
								
										if (imglen == 9) {
											wx.showToast({
												icon: 'none',
												title: '最多可上传九张'
											})
											return
										} else {
											// that.sj_img=that.sj_img.concat(res.tempFilePaths).slice(0,9)
										}
										// return
										that.upimg1(tempFilePaths, 0)
								
									}
								});
						},
						fail: function (res) {
								console.log(res.errMsg);
						}
				});
			
				
			},
			upimg1(imgs, i) {
				var that = this
				const imglen = that.sj_img.length
				var newlen = Number(imglen) + Number(i)
				if (imglen == 9) {
					wx.showToast({
						icon: 'none',
						title: '最多可上传九张'
					})
					return
				}
				var newdata = that.sj_img

				uni.uploadFile({
					url: service.IPurl + '/upload', //仅为示例，非真实的接口地址
					filePath: imgs[i],
					name: 'file',
					formData: {
						token: that.loginDatas.token
					},
					success(res) {
						// console.log(res.data)
						var ndata = JSON.parse(res.data)
						if (ndata.code == 1) {
							console.log(imgs[i], i, ndata.data)
							var newdata = that.sj_img
							console.log(i)
							newdata.push(ndata.data)
							that.sj_img = newdata
							// i++
							// that.upimg(imgs, i)
							var news1 = that.sj_img.length

							var news1 = that.sj_img.length
							if (news1 < 9 && i < imgs.length - 1) {
								i++
								that.upimg1(imgs, i)
							}
						} else {
							uni.showToast({
								icon: "none",
								title: "上传失败"
							})
						}
					}
				})
			},
			imgdel(e) {
				var that = this
				console.log(e.currentTarget.dataset.idx)
				uni.showModal({
					title: '提示',
					content: '确定要删除这张图片吗',
					success(res) {
						if (res.confirm) {
							console.log('用户点击确定', e.currentTarget.dataset.type)
							that.sj_img.splice(e.currentTarget.dataset.idx, 1)

						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			}
		}
	}
</script>

<style scoped>
	.order_box {
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
	}

	.order_box .d1 {
		padding: 30upx 0px;
	}

	.order_box .d1+.d1 {
		border-top: 1px solid #F6F6F6;
	}

	.d1_l {
		width: 62upx;
		height: 62upx;
		background: #222222;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;

		font-size: 29upx;
		font-family: PingFang;
		font-weight: bold;
		color: #FFFFFF;
		margin-right: 30upx;
	}

	.d1_l1 {
		background: #FED24D;
		color: #222;
	}

	.d1 .iconfont {
		margin-left: 60upx;
		font-size: 26upx;
	}

	.od_li {
		font-size: 32upx;
		color: #333;
		font-family: PingFang;
		font-weight: bold;
		margin-bottom: 20upx;
	}

	/* .od_li view{
		flex: 1;
	} */
	.od_li view+view {
		font-size: 28upx;

		font-family: PingFang SC;
		font-weight: bold;
	}

	.od_li1 {
		font-size: 26upx;
		color: #333;
		font-family: PingFang;

		font-weight: bold;
		margin-bottom: 20upx;
	}

	.od_li2 {
		font-size: 26upx;
		color: #333;

		font-family: PingFang SC;
		font-weight: bold;
	}

	.fh_time {
		width: 100%;
		min-height: 100upx;
		border-bottom: 1px solid #F6F6F6;
	}

	.fh_name {

		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
	}

	.fh_times {
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: bold;
		text-align: right;
		color: #333333;
	}

	.fh_next {
		margin-left: 50upx;
		font-size: 26upx;
	}

	.danwei {
		font-size: 30upx;
		color: #333;
		margin-left: 25upx;
	}

	.fh_zl {
		min-width: 0;
		width: 199upx;
		height: 58upx;
		background: #EFEFEF;
		text-align: center;
		font-size: 30upx;
	}

	.hw_num {
		width: 100%;
		padding-top: 30upx;
		/* padding-bottom: 130upx; */
		border-bottom: 1px solid #F6F6F6;
	}

	.hw_list {
		width: 490upx;
	}

	.hw_li {
		margin-bottom: 20upx;
		font-size: 26upx;
		color: #666;
	}

	.num_type {
		width: 20upx;
		height: 20upx;
		margin-right: 12upx;
	}

	.numcz image {
		width: 42upx;
		height: 42upx;
		border-radius: 50%;
	}

	.numcz view {
		width: 50upx;
		text-align: center;
		font-size: 25upx;
		color: #333;
	}

	.order_bottom {
		width: 100%;

		height: 100upx;

		background: #FFFFFF;
		box-shadow: 0px 3upx 10upx 0px rgba(0, 0, 0, 0.1);
		position: fixed;
		left: 0;
		bottom: 0;
	}

	.order_bottom1 {
		height: 140upx;
		padding-top: 10upx;
		padding-bottom: 30upx;
	}

	.sf_list {
		padding-top: 14upx;
	}

	.sf_li {
		width: 100%;
		padding: 14upx 0;
		box-sizing: border-box;
	}

	.sf_tx {
		width: 70upx;
		height: 70upx;
		border-radius: 50%;
		margin-right: 25upx;
	}

	.sf_name {

		font-size: 38upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
	}

	.sf_tel {
		font-size: 26upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
	}

	.order_btn {
		width: 184upx;
		height: 100%;
		background: #FF6666;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 34upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
	}

	.order_yf {
		padding-left: 32upx;
		font-size: 24upx;
		color: #333;
	}

	.order_yf input {
		width: 130upx;
		border-bottom: 1px solid #999;
		margin: 0 10upx;
		text-align: center;
		font-size: 32upx;
		color: #333;
	}

	.order_yf_int {
		color: #FF3030;
	}

	.order_btn1 {
		background: #FFD34E;
		color: #333333;
	}

	.sj_img_list {
		flex-wrap: wrap;
		margin-top: 20upx;
	}

	.sj_img_li {
		width: 33%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10upx 0;
		position: relative;
	}

	.sj_img_li image {
		width: 210upx;
		height: 205upx;
		border-radius: 10upx;
	}

	.sj_img_li .img_del {
		width: 30upx;
		height: 30upx;
		background: #FF4B4B;
		border-radius: 15upx;
		position: absolute;
		top: 0;
		right: 0;
		z-index: 10;
	}

	/* 司机--- */
	.order_dh {
		width: 173upx;
		height: 43upx;
		background: #0FCF86;
		border-radius: 22upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24upx;
		color: #fff;
	}

	.order_dh .iconfont {
		margin-left: 0;
		font-size: 24upx;
		color: #fff;
		margin-right: 5upx;
	}

	.no_bottom {
		padding-bottom: 10upx;
		border-bottom: 1px solid #F6F6F6;
	}

	.sjjd_btn {
		width: 302upx;
		height: 88upx;

		background: #C3C3C3;
		border-radius: 44upx;
		display: flex;
		align-items: center;
		justify-content: center;

		font-size: 40upx;
		font-family: PingFang;
		font-weight: bold;
		color: #333333;
	}
</style>
