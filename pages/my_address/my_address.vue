<template>
	<view class="h_main">
		<view class="add_list">
			<view class="add_li dis_flex ju_b" v-for="(item,index) in datas">
				<view class="add_l" @tap="get_add(item)">
					<view class="d1 dis_flex aife">{{item.name}}<text>{{item.phone}}</text><text class="add_moren" v-if="item.default==1">默认</text></view>
					<view class="d2">{{item.company_name}}</view>
					<view class="d3">{{item.province}} {{item.city}} {{item.district}} {{item.address}}</view>
				</view>
				<view class="add_r dis_flex_c ju_a aic" >
					<text class="iconfont icon-shanchu" @tap="addressDel(item)" :data-id="item.id"></text>
					<view class="add_rhx"></view>
					<text @tap="jump" :data-url="'/pages/my_add_edit/my_add_edit?address='+JSON.stringify(item)">编辑</text>
				</view>
			</view>
		</view>
		<view class="add_btn" style="opacity: 0;">新增地址</view>
		<view class="b_b_btns">
			<view class="add_btn" @tap="jump" data-url="/pages/my_add_edit/my_add_edit">新增地址</view>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				btnkg: 0,
				page:1,
				size:20,
				datas:[],
				type:0,
				show_num:0
			}
		},
		onLoad(option) {
			this.type = option.type || 0
			this.onRetry()
		},
		onShow() {
			if(this.show_num>0){
				this.onRetry()
			}
			this.show_num++
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'sj_type', 'loginDatas']),
		},
		methods: {
			get_add(item) {
				if (this.type == 1) {
					var pages = getCurrentPages();   //当前页面
					var prevPage = pages[pages.length - 2];   //上一页面
					prevPage.setData({
					  //直接给上一个页面赋值
					  getaddress: item,
					});
					uni.navigateBack()
				}
			},
			
			addressDel(item){
				let that =this
				wx.showModal({
					content:"确定要删除该地址吗?",
					success(res) {
						if (res.confirm) {
							console.log('用户点击确定')
							if(that.btnkg==1){
								return
							}else{
								that.btnkg=1
							}
			        var jkurl='/my/address'
			        var data={
			        	type:1,
			        	id:item.id,
								token: that.loginDatas.token,
								company_name: item.company_name,
								name: item.name,
								phone: item.phone,
								province: item.province,
								city: item.city,
								district: item.district,
								address: item.address,
								coordinate_x:item.coordinate_x,
								coordinate_y:item.coordinate_y,
								default:item.default,
			        	op:'del'
			        }
							service.P_post(jkurl, data).then(res => {
								that.btnkg = 0
								console.log(res)
								if (res.code == 1) {
									uni.showToast({
										icon:'none',
										title:'操作成功'
									})
									that.onRetry()
								
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
							console.log('用户点击取消')
						}
					}
				})
			},
			onPullDownRefresh() {
				this.onRetry()
			},
			onReachBottom() {
				this.getdata()
			},
			onRetry() {
				this.page = 1
				this.data_last = false
				this.datas = []
				this.getdata()
			},
			getdata() {
				var that = this
				var datas = {
					token: that.loginDatas.token || '',
					type:1,
					page: that.page,
					page_size: that.size
				}
				var page_that=that.page
				if (that.data_last) return
				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
				}
				//selectSaraylDetailByUserCard
				var jkurl = '/my/addressList'
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
						if (page_that == 1) {
							that.datas = datas.data
						} else {
							if (datas.data.length == 0) {
								that.data_last = true
								return
							}
							that.datas = that.datas.concat(datas.data)
						}
						that.page++
			
						console.log(datas)
			
			
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
			jump(e) {
				var that = this

				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
					setTimeout(function() {
						that.btnkg = 0
					}, 1000)
				}

				service.jump(e)
			},
		}
	}
</script>

<style scoped>
	
	.h_main {
		min-height: 100vh;
		padding-top: 20upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		background: #F6F6F6;
	}

	.add_btn {
		width: 690upx;
		height: 88upx;
		background: #FFDA22;
		border-radius: 44upx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 30upx auto 30upx;
		font-size: 30upx;
		color: #333;
		font-weight: bold;

		font-family: PingFang SC;
	}

	.add_list {
		width: 100%;

	}

	.add_li {
		width: 100%;
		min-height: 203upx;
		background: #FFFFFF;
		padding: 10px 35upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		margin-bottom: 20upx;
	}


	.add_l {
		width: 520upx;
	}

	.add_l .d1 {

		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #292929;
		margin-bottom: 15upx;
	}

	.add_l .d1 text {

		font-size: 22upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #999999;
		margin-left: 10upx;
	}

	.add_l .d1 .add_moren {
		min-width: 52upx;
		min-height: 28upx;
		background: #FFDA22;
		border-radius: 4upx;
		font-size: 20upx;
		color: #333;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.add_l .d2 {
		font-size: 26upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #292929;
		margin-bottom: 15upx;
	}

	.add_l .d3 {
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #292929;
	}

	.add_rhx {
		width: 70rpx;
		height: 2rpx;
		background: #D7D7D7;
	}

	.add_r text {

		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
	}

	.add_r .iconfont {
		font-size: 30upx;
	}
	
</style>
