<template>
	<view>
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view class="container" v-if="htmlReset==0" style="height: 100vh;">
			<!-- <view class="hengxian"></view> -->
			<view class='dis_flex ju_a w100 pb40 pt20 bgfff tab_box'>
				<block v-for="(item,idx) in data_list">
					<view :class="type==idx?'typecur':'c9'" :data-type="idx" @tap='bindcur'>{{item}}</view>
				</block>

			</view>
			<view class="zanwu" v-if="datas.length==0">暂无内容</view>
			<view v-else class="order_list">
				<view class="order_li" v-for="(item,index) in datas">
					<view class="order_li_box1">
						<view class="order_gs dis_flex aic">
							<image class="pl_tx" :src="getimg(item.user.avatar)"></image>
							<view class="pl_name">{{item.user.real_name}}</view>
							<view class="flex_1"></view>
							<view class="pl_name" style="max-width: 320upx!important;flex: none;font-size: 22upx;">{{item.order_goods.no}}</view>
						</view>
						<view v-if="type==0" class="order_msg dis_flex aic">
							评价星级:
							<text v-for="(item_xj,index_xj) in 5" :class="index_xj<item.rate?'active':''" class="iconfont icon-wujiaoxingxingxingshoucangdianji-copy"></text>
						</view>
						<view v-if="type==0" class="pl_msg">
							{{item.remake}}
						</view>
						<view v-else class="pl_msg">
							暂无评价
						</view>
					</view>
					<view class="order_cz dis_flex aic">
						<!-- <view v-if="type==0" @tap="jump" data-url="/pages/pingjia/pingjia">查看</view> -->
						<view v-if="type==1" @tap="jump" :data-url="'/pages/pingjia/pingjia?id='+item.id+'&o_id='+item.order_id">评价</view>
					</view>
				</view>
			</view>

			<view v-if="data_last" class="data_last">我可是有底线的哟~</view>


		</view>
	</view>
</template>

<script module="filter" lang="wxs" src="../../utils/filter.wxs"></script>
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
				htmlReset: 0,
				data_last: false,
				data_list: [
					'已评价',
					'未评价'
				],
				datas: [],
				page: 1,
				size: 20,
				type: 0, //99全部订单  1：代付款 2：待收货 3：待评价  4：待代言



			}
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginDatas',
				'wxlogin',
			]),

		},
		onLoad(option) {
			this.onRetry()
		},
		onShow() {
			var that =this
			let pages = getCurrentPages();
			let currPage = pages[pages.length - 1];
			if (currPage.data.set_pl) {
			      //将携带的参数赋值
			        
			    this.onRetry()
					currPage.setData({
					  set_pl: false,
					});
					
			   
					
			 
				
			}
		},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {
			this.onRetry()
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			this.getdatalist()
		},
		methods: {
			...mapMutations(['dy_fb_fuc']),
			getimg(img){
				return service.getimg(img)
			},
			onRetry() {
				this.page = 1
				this.data_last = false
				this.datas = []
				this.getdatalist()
			},
			getdatalist() {

				let that = this
				var jkurl = '/my/estimate_list'
				
				var datas = {
					token: that.loginDatas.token || '',
					is_re:that.type==1?0:1,
					page: that.page,
					page_size: that.size
				}
				console.log(datas)
				if (that.data_last) return
				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
				}
				var page_that = that.page
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

					} else {
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '获取数据失败'
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
			bindcur(e) {
				var that = this
				console.log(e.currentTarget.dataset.type)
				if (that.type == e.currentTarget.dataset.type) return
				that.type = e.currentTarget.dataset.type
				// that.getOrderList()
				this.onRetry()
			},
			jump(e) {
				service.jump(e)
			},
		}
	}
</script>

<style scoped>
	page {
		background: #f8f8f8;
	}
	.iconfont.active{
		color: #FFDA22;
	}
	.container {
		/* min-height: 100vh; */
		background: #f8f8f8;
		padding: 80rpx 30upx 10rpx;
		box-sizing: border-box;
	}

	.tab_box {
		position: fixed;
		top: 0;
		left: 0;
		/* #ifndef MP-WEIXIN */
		top: calc(44px + env(safe-area-inset-top));
		/* #endif */
		height: 80upx;
		line-height: 80upx;
		z-index: 90;
		font-size: 30rpx;
		background: #fff;
		border-top: 1px solid #F1F2F4;
	}

	.goodsImg image {
		width: 100%;
		height: 100%;
	}

	.zanwu {
		font-size: 24rpx;
		color: #999;
		line-height: 140rpx;
		text-align: center;
	}

	.typecur {
		padding-bottom: 12rpx;
		border-bottom: 6rpx solid #F9B234;
		color: #333;
	}

	.order_li {
		margin-top: 22upx;
		width: 100%;
		background: #fff;
	}

	.order_li_box1 {
		width: 100%;
		padding: 30upx 30upx 5upx;
		box-sizing: border-box;
	}

	.order_gs {
		font-size: 34upx;
		color: #333;
		font-weight: bold;
		margin-bottom: 15upx;
	}

	.order_gs text {
		color: #FFC200;
		font-size: 40upx;
		margin: 0 20upx;
	}

	.order_msg {
		width: 100%;
		font-size: 26upx;
		color: #999;
		margin-bottom: 25upx;
	}

	.pl_tx {
		width: 69upx;
		height: 69upx;
		border-radius: 50%;
		margin-right: 23upx;
	}

	.pl_name {
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
	}

	.order_msg {
		font-size: 26upx;
		color: 33px;
	}

	.order_msg text {
		color: #A6A6A6;
		font-size: 26upx;
	}

	.pl_msg {
		width: 100%;
		padding: 20upx 34upx;
		box-sizing: border-box;
		background: #FBFAFA;

		font-size: 26upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
	}


	.order_cz {
		width: 100%;
		padding: 15upx 30upx;
		box-sizing: border-box;
		flex-direction: row-reverse;
	}

	.order_cz view {
		width: 139upx;
		height: 49upx;
		background: #FFFFFF;
		border: 2upx solid #D7D7D7;
		border-radius: 4upx;
		margin-left: 17upx;
		display: flex;
		align-items: center;
		justify-content: center;

		font-family: PingFang SC;
		font-weight: bold;
		font-size: 26upx;
		color: #767676;
	}
</style>
