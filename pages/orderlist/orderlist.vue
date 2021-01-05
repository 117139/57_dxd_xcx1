<template>
	<view>
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view class="container" v-if="htmlReset==0" style="height: 100vh;">
		  <view  v-if="sj_type==1" class='dis_flex ju_a w100 pb40 pt20 bgfff tab_box'>
		    <block v-for="(item,idx) in data_list">
		      <view :class="type==item.type?'typecur':'c9'" :data-type="item.type" @tap='bindcur'>{{item.name}}</view>
		    </block>
		  		
		  </view>
			<!-- 司机导航 -->
			<view v-if="sj_type==0" class='dis_flex ju_a w100 pb40 pt20 bgfff tab_box'>
				<block v-for="(item,idx) in sj_data_list">
					<view :class="type==item.type?'typecur':'c9'" :data-type="item.type" @tap='bindcur'>{{item.name}}</view>
				</block>
					
			</view>
			<view class="zanwu" v-if="datas.length==0">暂无内容</view>
			<view v-else class="order_list">
				<view class="order_li" v-for="(item,index) in datas">
					<view class="order_li_box1">
						<view class="order_gs dis_flex aic">
							<view>{{item.f_address.company_name}}</view>
							<text class="iconfont icon-youbanjiantou"></text>
							<view>{{item.w_address.company_name}}</view>
						</view>
						<view class="order_msg dis_flex aic ju_b">
							<view class="order_shr">收货方：{{item.s_address.name}}</view>
							<view>{{gettime(item.delivery_time)}}</view>
						</view>
						<view class="order_msg1 dis_flex aic">
							<view class="order_add">
								<text class="iconfont icon-weizhi"></text>{{item.f_address.province}}
							</view>
							<view>订单号：{{item.no}}</view>
						</view>
					</view>
					<view class="order_cz dis_flex aic">
						<view @tap="jump" :data-url="'/pages/orderDetails/orderDetails?type='+type+'&id='+item.id">查看</view>
						<view v-if="sj_type==1&&type==1" @tap="order_del(item,index)">删除</view>
						<view v-if="sj_type==1&&type==1" @tap="jump" :data-url="'/pages/order/order?type='+type+'&id='+item.id">修改</view>
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
				btnkg:0,
				htmlReset:0,
				data_last:false,
				data_list:[
					{
						name:'未分配',
						type:1,
					},
					{
						name:'未接单',
						type:2,
					},
					{
						name:'已接单',
						type:3,
					},
					{
						name:'已送达',
						type:4,
					}
				],
				sj_data_list:[
					{
						name:'未接单',
						type:2,
					},
					{
						name:'已接单',
						type:3,
					},
					{
						name:'已送达',
						type:4,
					}
				],
				datas:[],
				page:1,
				size:20,
				type:1,    //1未分配 2未接单 3已接单 4已送达
				
				shopNum:[],
				sum:0,
				otype:-2,
				
				
				
				goods_sele: [],
				// goods_sele: [],
				xuan: false,
				all: false,
			}
		},
		computed:{
			...mapState([
				'hasLogin',
				'loginDatas',
				'wxlogin',
				'sj_type'
			]),
			
		},
		onLoad(option) {
			// if(option.type){
			// 	this.type=option.type
			// }
			// this.onRetry()
			if(this.sj_type==0){
				this.type=2
			}else{
				this.type=1
			}
			this.onRetry()
		},
		onShow(){
			
			this.onRetry()
			
			/*var that =this
			let pages = getCurrentPages();
			let currPage = pages[pages.length - 1];
			if (currPage.data.order_reset) {
			      //将携带的参数赋值
			        
			    this.onRetry()
					currPage.setData({
					  order_reset: false,
					});
					
			   
					
			  console.log(this.wuliu, 'wuliu')
				
			}*/
		},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function () {
		  this.onRetry()
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function () {
			this.getdatalist()
		},
		methods: {
			...mapMutations(['dy_fb_fuc']),
			gettime(time){
				if(!time){
					return
				}
				time=time.split('-').join('.').split(':')
				return time[0]+':'+time[1]
			},
			onRetry(){
				this.datas=[]
				this.page=1
				this.btnkg=0
				this.data_last=false
				if(this.hasLogin){
					this.getdatalist()
				}
			},
			order_del(item,index){
				var that =this
				uni.showModal({
				    title: '提示',
				    content: '是否删除该订单',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
										var jkurl='/order/orderDelete'
										var datas={
											token:that.loginDatas.token,
											id:item.id
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
													icon:'none',
													title:'操作成功'
												})
												that.datas.splice(index,1)
										
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
				});
			},
			
			getdatalist(){
			
				let that =this
				var jkurl='/order/orderList'
				var datas={
					token:that.loginDatas.token||'',
					status:that.type, //1未分配 2未接单 3已接单 4已送达
					page:that.page,
					page_size:that.size
				}
				if(that.data_last) return
				if(that.btnkg==1){
					return
				}else{
					that.btnkg=1
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
						if(page_that==1){
							
							that.datas = datas.data
						}else{
							if(datas.length==0){
								that.data_last=true
								return
							}
							that.datas =that.datas.concat(datas.data) 
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
			bindcur(e){
				var that =this
			  console.log(e.currentTarget.dataset.type)
				if(that.type== e.currentTarget.dataset.type) return
			  that.type= e.currentTarget.dataset.type
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
page{
  background: #f8f8f8;
}
.container{
	/* min-height: 100vh; */
	background: #f8f8f8;
	padding-top: 80rpx;
	
  padding-bottom: 10rpx;
	box-sizing: border-box;
}
.tab_box{
  position: fixed;
  top: 0;
	/* #ifndef MP-WEIXIN */
	top:calc(44px + env(safe-area-inset-top));
	/* #endif */
	height: 80upx;
	line-height: 80upx;
  z-index: 90;
  font-size: 30rpx;
	background: #fff;
	border-top: 1px solid #F1F2F4;
}
.goodsImg image{
	width: 100%;
	height:100%;
}
.zanwu{
	font-size: 24rpx;
	color: #999;
	line-height: 140rpx;
	text-align: center;
}

.typecur{
  padding-bottom: 12rpx;
  border-bottom: 6rpx solid #F9B234;
	color: #333;
}

.order_li{
	margin-top: 22upx;
	width: 100%;
	background: #fff;
}
.order_li_box1{
	width: 100%;
	padding: 30upx;
	box-sizing: border-box;
	border-bottom: 1px solid #F1F2F4;
}
.order_gs{
	font-size: 34upx;
	color: #333;
	font-weight: bold;
	margin-bottom: 15upx;
}
.order_gs text{
	color: #FFC200;
	font-size: 40upx;
	margin: 0 20upx;
}
.order_msg{
	width: 100%;
	font-size: 26upx;
	color: #999;
	margin-bottom: 25upx;
}
.order_shr{
	padding-left: 26upx;
	font-size: 30upx;
	color: #333;
	position: relative;
	line-height: 30upx;
}
.order_shr::before{
	top: 12upx;
	left: 0;
	content: '';
	position: absolute;
	width: 7upx;
	height: 7upx;
	background: #FFC200;
	border-radius: 50%;
}
.order_msg1{
	width: 100%;
	font-size: 20upx;
	color: #666;
}
.order_add{
	font-size: 24upx;
	color: #666;
	margin-right: 30upx;
}
.order_add text{
	font-size: 24upx;
	color: #666;
	margin-right: 10upx;
}
.order_cz{
	width: 100%;
	padding: 15upx 30upx;
	box-sizing: border-box;
	flex-direction: row-reverse;
}
.order_cz view{
	width: 156upx;
	height: 58upx;
	background: #FFFFFF;
	border: 2upx solid #D7D7D7;
	border-radius: 4upx;
	margin-left: 17upx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 28upx;
}
</style>
