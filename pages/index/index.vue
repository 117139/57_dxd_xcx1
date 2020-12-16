<template>
	<view class="content">
		<swiper class="swiper" :indicator-dots="indicatorDots"
			indicator-color="#FFFFFF" indicator-active-color="#FE9901"
		 :autoplay="autoplay" :interval="interval" :duration="duration" circular='true'>
				<swiper-item v-for="(item,idx) in banner">
					
						<!-- <image v-if="item.url" class="swi_img" :src="getimg(item.body)" mode="aspectFill"
						 @tap="jump" :data-url="'../Turl/Turl?url='+item.url"></image> -->
						 <!-- /'../webview/webview?url='+datas.url -->
						<!-- <image v-else class="swi_img" :src="getimg(item.body)" mode="aspectFill"
						 @tap="jump" data-url="../ad_zz/ad_zz"></image> -->
						 <image class="swi_img" :src="getimg(item.body)" mode="aspectFill"
						 @tap="jump" data-url=""></image>
				</swiper-item>
			
		</swiper>
		<view class="index_box">
			<view v-if="order_process" class="index_tit">订单流程</view>
			<view>
				<image v-if="order_process.length>0" class="index_dd" :src="getimg(order_process[0].body)" mode="aspectFill"></image>
			</view>
			<view v-if="service_tel||company_address" class="index_kf">
				<image class="index_kf_bg" src="../../static/images/index_09.jpg"></image>
				<view  class="kf_box dis_flex ju_b">
					<view class="dis_flex_c ju_a kf_msg" >
						<view v-if="service_tel.length>0" class="kf_tel oh1">客服电话:
							<text v-for="(item,index) in service_tel" @tap="call" :data-tel="item.body">{{item.body}}{{index!=service_tel.length-1?' ':''}}</text>
						</view>
						<view v-if="company_address.length>0" class="kf_add oh1"><text class="iconfont icon-weizhi"></text>公司地址:{{company_address[0].body}}</view>
					</view>
					<view><text class="iconfont icon-dianhua"></text></view>
				</view>
			</view>
			<view class="wl_List">
				<block v-for="(item,index) in datas">
					<image  class="wl_li" :src="getimg(item.body)" mode="aspectFill"></image>
				</block>
				<view v-if="datas.length==0" class="zanwu">暂无数据</view>
				<view v-if="data_last" class="data_last">我可是有底线的哟~</view>
			</view>
		</view>
		<image v-if="sj_type==1" @tap="jump" data-url="/pages/order/order" class="xiandan" src="../../static/images/xiadan.png"></image>
		
		
		<view v-if="show_tk" class="tk_big_box dis_flex aic ju_c">
			<view class="dis_flex_c aic ju_c">
				<view class="dis_flex_c tk_box">
					<view class="tk_tit">提示</view>
					<view class="tk_msg">为了更好的服务，小程序需要在分配订单时向您发送消息</view>
					<view class="dis_flex ju_a ">
						<view class="dy_btn dy_btn1" @tap="authMsg">订阅</view>
						<view class="dy_btn" @tap="authMsg_on">取消</view>
					</view>
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
				title: 'Hello',
				indicatorDots: true,
				autoplay: true,
				interval: 3000,
				duration: 500,
				
				banner:'',
				company_address:'',
				order_process:'',
				service_tel:'',
				page:1,
				size:20,
				datas:[],
				data_last:false,
				
				show_tk:false
			}
		},
		watch: {
			hasLogin() {
				var that =this
				console.log('watch')
				wx.getSetting({
					withSubscriptions:true,
				  success (res) {
				    console.log('res.authSetting')
				    console.log(res)
				    console.log(res.authSetting)
						var itemSettings = res.subscriptionsSetting.itemSettings
						console.log('itemSettings')
						console.log(itemSettings)
						     if (itemSettings) {
						       if (itemSettings['-I6lIPrxg8bcr5AdAUtzPuksKa9hodpyD58cKPHfR8I'] === 'accept') {
						         console.log('is accredit：ok')
						       }else{
										 that.show_tk=true
									 }
						     }else{
									 that.show_tk=true
								 }
				    // res.authSetting = {
				    //   "scope.userInfo": true,
				    //   "scope.userLocation": true
				    // }
				  }
				})
			}
		},
		onShareAppMessage() {
			
		},
		onPullDownRefresh() {
			this.onRetry()
		},
		onReachBottom() {
			this.getdata_list()
		},
		computed: {
			...mapState(['hasLogin','loginDatas','sj_type'])
		},
		onLoad() {
			this.getdata()
			this.getdata_list()
		},
		onShow() {
			// this.smsTest()
		},
		methods: {
			...mapMutations(['setnew_problem']),
			authMsg(event) {
				var that =this
				uni.requestSubscribeMessage({
					tmplIds: ['-I6lIPrxg8bcr5AdAUtzPuksKa9hodpyD58cKPHfR8I'],
					success: function(res) {
						console.log(res)
						that.show_tk=false
						uni.showToast({
							icon:'none',
							title:'订阅消息成功'
						})
					},
					fail: function(err) {
						console.log(err)
						uni.showToast({
							icon:'none',
							title:'订阅消息失败'
						})
					}
			
				})
			
			},
			authMsg_on(e){
				var that =this
				uni.showModal({
						title: '温馨提示',
						content: '拒绝后您将无法获取提示消息',
						confirmText:"知道了",
						showCancel:false,
						success: function (res) {
							///点击知道了的后续操作 
							///如跳转首页面 
							that.show_tk=false
						}
				});
			},
			call(e){
				return service.call(e)
			},
			onRetry(){
				this.getdata()
				this.page=1
				this.datas=[]
				this.data_last=false
				this.getdata_list()
			},
			getimg(img){
				return service.getimg(img)
			},
			get_fwb(str){
				return service.get_fwb(str)
			},
			getdata(){
				
				///api/info/list
				var that =this
				var data={
					keyword:'banner,order_process,service_tel,company_address,'
				}
				//selectSaraylDetailByUserCard
				var jkurl = '/info/list'
				if(this.data_last){
					return
				}
				if(that.btnkg==1){
					return
				}else{
					that.btnkg=1
				}
				uni.showLoading({
					title: '正在获取数据'
				})
				service.P_get(jkurl, data).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
							
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						// that.datas = datas
						that.banner=datas.banner
						that.company_address=datas.company_address
						that.order_process=datas.order_process
						that.service_tel=datas.service_tel
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
					that.btn_kg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})
			},
			getdata_list(){
				
				///api/info/list
				var that =this
				var data={
					keyword:'logistics_list',
					per_page:this.size,
					page:this.page
				}
				//selectSaraylDetailByUserCard
				var jkurl = '/info/list'
				uni.showLoading({
					title: '正在获取数据'
				})
				var page_that=this.page
				service.P_get(jkurl, data).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
							
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						
						if(page_that==1){
							that.datas = datas.data
						}else{
							if(datas.data.length==0){
								that.data_last=true
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
					that.btn_kg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})
			},
			jump(e){
				service.jump(e)
			}
			
		}
	}
</script>

<style scoped>
	.swiper{
		
		width: 100%;
		height: 339upx;
	}
	.swi_img{
		width: 100%;
		height: 339upx;
	}
	.index_box{
		width: 100%;
		padding: 10upx 30upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}
	.index_tit{
		width: 100%;
		padding:28upx 20upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		position: relative;
		font-size: 36upx;
		line-height: 38upx;
		color: #333;
		font-weight: bold;
		
		font-family: PingFang;
	}
	.index_tit::before{
		position: absolute;
		top: 32upx;
		left: 0;
		width: 6upx;
		height: 32upx;
		background: #FE9901;
		content: '';
	}
	.index_dd{
		width: 100%;
		height: 672upx;
	}
	.xiandan{
		width: 148upx;
		height: 148upx;
		border-radius: 50%;
		position: fixed;
		bottom: 50upx;
		/* #ifndef MP-WEIXIN */
		bottom:120upx;
		/* #endif */
		right: 30upx;
	}
	.index_kf{
		width: 100%;
		height: 148upx;
		background: linear-gradient(-38deg, #FFC200, #FFD300);
		box-shadow: 0px 0px 10upx 0px rgba(0, 0, 0, 0.17);
		border-radius: 74upx;
		overflow: hidden;
		position: relative;
		margin: 45upx -0px;
		padding: 30upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}
	.index_kf_bg{
		width: 100%;
		height: 148upx;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		border-radius: 74upx;
	}
	.wl_List{
		width: 100%;
	}
	.wl_li{
		width: 100%;
		height: 152upx;
		border-radius: 2upx;
		margin-bottom: 27upx;
	}
	.icon-dianhua{
		font-size: 86upx;
		color: #fff;
	}
	.kf_box{
		position: absolute;
		top: 30upx;
		bottom: 30upx;
		right: 30upx;
		left: 60upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}
	.icon-weizhi{
		font-size: 26upx;
		color: #8F6705;
	}
	.kf_msg{
		height: 86upx;
	}
	.kf_tel{
		color: #604405;
		font-size: 30upx;
		font-weight: bold;
		line-height: 30upx;
	}
	.kf_add{
		font-size: 26upx;
		line-height: 26upx;
		color: #333;
	}
</style>
