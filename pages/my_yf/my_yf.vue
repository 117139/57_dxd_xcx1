<template>
	<view>
		<view class="main">
			<view class="qian_banner p_img_div" style="background-image: url(/static/images/qianbg.jpg);">
				<view class="q_tit">账户余额(元)</view>
				<view class="q_money"> {{money_sum?money_sum:'0.00'}}</view>
				<view class="q_sy dis_flex aic ju_b">
					<view class="dis_flex aic">
						<view class="pay_btn" @tap="jump" data-url="/pages/my_chongzhi/my_chongzhi">充值</view> <span>现在充值，尊享</span><em>{{9.8}}</em>折优惠
					</view>
				</view>
			</view>
			
			<view class="sj_box2 dis_flex ju_b">
				<view class="flex_1" style="border-right: 1px solid #EEEEEE;">
					<view class="sr_name">年度支出</view>
					<view class="sr_num">{{money_year}}元</view>
				</view>
				<view  class="flex_1">
					<view class="sr_name">本月支出</view>
					<view class="sr_num">{{money_month}}元</view>
				</view>
			</view>
			<view style="width: 100%;background: #F1F1F1;height: 10upx;"></view>
			<view class="box1 boxsiz">
				<view class="xl_time_box dis_flex aic ju_b boxsiz">
					<view></view>
					<picker mode="date" fields="month" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="xl_time dis_flex aic ju_c">
							<span>{{gettime(date)}}</span>
							<image src="/static/images/xl_icon.png" mode="aspectFit"></image>
						</view>
					</picker>
				</view>
				<view v-if="datas.length==0" class="zanwu">暂无数据</view>
				<view v-else class="qian_li boxsiz dis_flex aic ju_b" v-for="(item,index) in datas" @tap="jump" 
				 :data-url="'/pages/orderDetails/orderDetails?type='+item.orders.status+'&id='+item.order_id">
					<view class="li_l dis_flex ju_a">
						<view class="d1">{{item.title}}</view>
						<view class="d2">{{item.create_time}}</view>
					</view>
					<view class="li_l dis_flex ju_a" style="align-items: flex-end;">
						<view class="d2">{{item.orders.no}}</view>
						<view v-if="item.plus_minus==0" class="li_r li_r1">{{item.price}}元</view>
						<!-- <view v-else class="li_r">+元</view> -->
						<view v-if="item.plus_minus==1" class="li_r">{{item.price}}元</view>
					</view>
				</view>
				<view v-if="data_last" class="data_last">我可是有底线的哟~</view>



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
				btnkg:0,
				money_sum:'',
				datas: [],
				date: new Date(),
				page:1,
				size:20,
				data_last:false
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName','sj_type','loginDatas']),
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		onLoad() {
			var value = new Date()
						
			var year = value.getFullYear();
			console.log(year)
			var month = value.getMonth() + 1;
			var strDate = value.getDate();
			if (month >= 1 && month <= 9) {
			  month = "0" + month;
			}
			this.date=year+'-'+month
			this.onRetry()
		},
		
		methods: {
			onPullDownRefresh() {
				this.onRetry()
			},
			onReachBottom() {
				this.getdatalist()
			},
			bindDateChange: function(e) {
				console.log(e)
				this.date = e.target.value
				this.onRetry()
			},
			onRetry(){
				this.page=1
				this.data_last=false
				this.datas=[]
				this.getdatalist()
			},
			getdatalist(){
			
				let that =this
				var jkurl='/my/bill'
				var month=that.date.split('-').join('')
				var datas={
					token:that.loginDatas.token||'',
					month:month, 
					page:that.page,
					page_size:that.size
				}
				console.log(datas)
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
						that.money_sum = datas.money_sum||0
						that.money_month = datas.money_month||0
						that.money_year = datas.money_year||0
						if(page_that==1){
							that.datas = datas.money_month_data.data
						}else{
							if(datas.money_month_data.data.length==0){
								that.data_last=true
								return
							}
							that.datas=that.datas.concat(datas.money_month_data.data)
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
			gettime(value,type) {
			  var seperator1 = "-";
			  value = new Date(value)
			
			  var year = value.getFullYear();
			  console.log(year)
			  var month = value.getMonth() + 1;
			  var strDate = value.getDate();
			  if (month >= 1 && month <= 9) {
			    month = "0" + month;
			  }
			  if (strDate >= 0 && strDate <= 9) {
			    strDate = "0" + strDate;
			  }
				if(type=='now'){
					return year+'-'+month
				}
					
			  var currentdate = year + '年' + month + '月';
			  return currentdate
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}年${month}月`;
			},
			jump(e) {
			  service.jump(e)
			},
		}
	}
</script>

<style scoped>
	.boxsiz {
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}

	.main {
		background: #fff;
		width: 100%;
	}

	.qian_banner {
		width: 690upx;
		height: 296upx;
		background: #FDB700;
		border-radius: 27upx;
		margin: 27upx auto;
	}

	.q_tit {
		font-size: 24upx;
		line-height: 24upx;
		padding-top: 40upx;
		text-align: center;
		color: #fff;
	}

	.q_money {
		text-align: center;
		line-height: 150upx;
		font-size: 90upx;
		color: #fff;
		font-weight: bold;
		position: relative;
	}

	.q_money span {
		position: absolute;
		top: 25px;
		right: 25px;
		font-size: 16px;
		line-height: 16px;
		height: 25px;
		padding: 0 6px;
		color: #fff;
		border-radius: 25px;
		border: 1px solid #fff;
	}

	.q_sy {
		font-size: 24upx;
		color: #fff;
		padding: 0 15upx;
		margin-top: 10upx;
	}

	.q_sy span {
		font-size: 24upx;
		color: #fff;
		margin-right: 4px;
	}

	.q_sy em {
		font-size: 36upx;
		color: #fff;
		font-style: italic;
		margin-right: 4px;
	}

	.sj_box2>view{
		padding:25upx 30upx;
	}
	.sr_name{
		font-size: 34upx;
		color: #999;
	}
	.sr_num{
		font-size: 34upx;
		color: #333;
	}
	.pay_btn {
		width: 102upx;
		height: 40upx;
		background: #FFFFFF;
		border: 1px solid #FFFFFF;
		box-shadow: 0px -6upx 27upx 0px rgba(0, 0, 0, 0.08);
		border-radius: 20upx;
		color: #FF8B00;
		font-size: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 20upx;
	}

	.xl_time_box {
		padding: 30upx 30upx 10upx;
		width: 100%;
	}

	.xl_time {
		font-size: 13px;
		color: #FE9400;
		width: 109px;
		height: 20px;
		border: 1px solid rgba(254, 148, 0, 1);
		box-shadow: 0px -6px 27px 0px rgba(0, 0, 0, 0.08);
		border-radius: 10px;
	}

	.xl_time image {
		width: 16upx;
		height: 16upx;
	}

	.qian_li {
		width: 100%;
		padding: 0 15px;
		height: 50px;
	}

	.li_l {
		flex-direction: column;

	}

	.li_l .d1 {
		font-size: 28upx;
		color: #292929;
	}

	.li_l .d2 {
		font-size: 20upx;
		color: #999;
	}

	.li_r {
		font-size: 14px;
		color: #FF8600;
	}
	.li_r1{
		color: #919191;
	}
</style>
