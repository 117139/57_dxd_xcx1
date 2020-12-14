<template>
	<view>
		<view class="container">
			<view class="add_box dis_flex ju_b">
				<input class="add_int" type="text" placeholder="请输入您的产品" v-model="newtab" confirm-type="done" @confirm="add_fuc">
				<view class="add_btn" @tap="add_fuc">添加</view>
			</view>
			<view class="cp_tit">我的产品</view>
			<view class="dis_flex cp_list ">
				<view v-if="datas.length==0" class="zanwu">暂无数据</view>
				<view class="cp_li" v-for="(item,index) in datas">
					<view class="oh1">{{item.name}}</view>
				</view>
			</view>
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
				newtab: '',
				datas: [],
				page: 1,
				size: 40
			}
		},
		onLoad() {
			this.onRetry()
			
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'sj_type', 'loginDatas']),
		},
		methods: {
			add_fuc() {
				var that = this
				if (!that.newtab) {
					uni.showToast({
						icon: 'none',
						title: '请输入您的产品'
					})
					return
				}
				///my/product
				var datas = {
					token: that.loginDatas.token || '',
					name: that.newtab
				}
			
				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
				}
				//selectSaraylDetailByUserCard
				var jkurl = '/my/product'
				uni.showLoading({
					title: '正在获取数据'
				})
				service.P_post(jkurl, datas).then(res => {
					that.btnkg = 0
					console.log(res)
					if (res.code == 1) {
				// 		var datas = res.data
				// 		console.log(typeof datas)
				
				// 		if (typeof datas == 'string') {
				// 			datas = JSON.parse(datas)
				// 		}
						// that.datas.push(that.newtab)
						that.newtab = ''
						that.onRetry()
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
				var jkurl = '/my/productList'
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
			}
		}
	}
</script>

<style scoped>
	.container {
		width: 100%;
		padding: 30upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}

	.add_box {
		width: 100%;
		margin-bottom: 5upx;
	}

	.add_int {
		min-width: 0;
		width: 519upx;
		height: 79upx;
		background: #FFFFFF;
		border: 1px solid #CCCCCC;
		border-radius: 4upx;
		padding: 0 25upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;

		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #9F9F9F;
	}

	.add_btn {
		width: 154upx;
		height: 80upx;
		background: #FFDA22;
		box-shadow: 0px 0px 10upx 0px rgba(34, 23, 20, 0.1);
		border-radius: 5upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28upx;
		color: #000;
	}

	.cp_tit {
		font-size: 30upx;
		color: #333;
		padding: 45upx 20upx;
		line-height: 30upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		position: relative;
		display: flex;
		align-items: center;
	}

	.cp_tit::before {
		content: '';
		position: absolute;
		left: 0;
		top: 46upx;
		width: 3upx;
		height: 28upx;
		background: #FFDA22;
	}

	.cp_list {
		width: 100%;
		flex-wrap: wrap;
	}

	.cp_li {
		width: 329upx;
		height: 80upx;
		padding: 0 30upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		background: #FFFFFF;
		box-shadow: 0px 0px 10upx 0px rgba(34, 23, 20, 0.1);
		border-radius: 11upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28upx;
		color: #333;
		margin-bottom: 34upx;
	}

	.cp_li:nth-child(2n) {
		margin-left: 30upx;
	}
</style>
