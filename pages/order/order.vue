<template>
	<view>
		<view style="width: 100%;height: 11upx;background: #F6F6F6;"></view>
		<view class="order_box">
			<view class="d1 dis_flex aic ju_b" @tap="jump" data-url="/pages/my_address/my_address?type=1">
				<view class="d1_l" >发</view>
				<view v-if="address" class="flex_1">
					<view class="w100 od_li dis_flex aic">
						<view>{{address.company_name}}</view>
						<view>{{address.phone}}</view>
					</view>
					<view class="w100 od_li1">{{address.name}}</view>
					<view class="w100 od_li2">{{address.province}} {{address.city}} {{address.district}} {{address.address}}</view>
				</view>
				<view v-else class="flex_1 dis_flex aic">
					<view class="w100 od_li dis_flex aic" style="margin-bottom: 0;">
						<view>请选择</view>
					</view>
					
				</view>
				<text class="iconfont icon-next-m"></text>
			</view>
			<view class="d1 dis_flex aic ju_b"  @tap="jump" data-url="/pages/my_shr/my_shr?type=1">
				<view class="d1_l d1_l1">收</view>
				<view v-if="shr" class="flex_1">
					<view class="w100 od_li dis_flex aic">
						<view>{{shr.name}}</view>
						<view>{{shr.phone}}</view>
					</view>
					<view class="w100 od_li2">{{shr.province}} {{shr.city}} {{shr.district}} {{shr.address}}</view>
				</view>
				<view v-else class="flex_1 dis_flex aic">
					<view class="w100 od_li dis_flex aic" style="margin-bottom: 0;">
						<view>请选择</view>
					</view>
					
				</view>
				<text class="iconfont icon-next-m"></text>
			</view>
			<view class="d1 dis_flex aic ju_b" @tap="jump" data-url="/pages/my_wuliu/my_wuliu?type=1">
				<view class="d1_l d1_l1">物</view>
				<view v-if="wuliu" class="flex_1">
					<view class="w100 od_li dis_flex aic">
						<view>{{wuliu.company_name}}</view>
						<view>{{wuliu.phone}}</view>
					</view>
					<view class="w100 od_li1">{{wuliu.name}}</view>
					<view class="w100 od_li2">{{wuliu.province}} {{wuliu.city}} {{wuliu.district}} {{wuliu.address}}</view>
				</view>
				<view v-else class="flex_1 dis_flex aic" >
					<view class="w100 od_li dis_flex aic" style="margin-bottom: 0;">
						<view>请选择</view>
					</view>
				</view>
				<text class="iconfont icon-next-m"></text>
			</view>
		</view>
		<view style="width: 100%;height: 11upx;background: #F6F6F6;"></view>
		<view class="order_box">
			<!-- <picker mode = "date" :value="fh_time" start="09:01" end="21:01" @change="bindTimeChange"> -->
				<view class="fh_time dis_flex aic ">
					<view class="fh_name">发货时间</view>
					<biaofun-datetime-picker  class="fh_times flex_1"
						placeholder="立即发货"
						:defaultValue="fh_time"
						start="2000-02-03 02:08"
						end="2200-10-28 22:58"
						fields="minute"
						@change="changeDatetimePicker"
					></biaofun-datetime-picker>
					<!-- <view class="fh_times flex_1">{{fh_time?fh_time:'立即发货'}}</view> -->
					<text class="iconfont icon-next-m fh_next"></text>
				</view>
			<!-- </picker> -->
			<view class="fh_time dis_flex aic ">
				<view class="fh_name">货物重量</view>
				<view class=" flex_1"></view>
				<input class="fh_zl" type="number" placeholder="请输入" v-model="hwzl_num" />
				<view class="danwei">kg</view>
			</view>
			<view class="hw_num dis_flex aift ju_b">
				<view  class="fh_name">货物数量:</view>
				<view class="hw_list">
					<view class="hw_li dis_flex aic ju_b" v-for="(item,index) in hw_data"  >
						<view class="dis_flex aic" @tap="duoxuan(item,$event)" :data-idx="index">
							<image class="num_type" v-if="item.type" src="../../static/images/num_ok.png"></image>
							<image class="num_type" v-else src="../../static/images/num_no.png"></image>
							{{item.name}}
						</view>
						<view class="numcz dis_flex aic">
							<image src="../../static/images/num_down.png" @tap="num_fuc(item,$event)" :data-idx="index" data-type="-"></image>
							<view>{{item.num>0?item.num:'0'}}</view>
							<image src="../../static/images/num_up.png" @tap="num_fuc(item,$event)" :data-idx="index" data-type="+"></image>
						</view>
					</view>
					
					<view class="hw_li dis_flex aic">
						<view class="go_btn" @tap="jump" data-url="/pages/my_chanpin/my_chanpin">去添加<text class="iconfont icon-next-m"></text></view>
					</view>
				</view>
			</view>
			<view class="order_bottom dis_flex aic ju_c">
				 <view v-if="id" @tap="sub">提交</view>
				 <view v-else @tap="sub">立即下单</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	import service from '../../service.js';
	import biaofunDatetimePicker from '@/components/biaofun-datetime-picker/biaofun-datetime-picker.vue';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				id:'',
				type:'',
				fh_time:'',
				hw_data:[],
				address:'',
				shr:'',
				wuliu:'',
				page:1,
				size:100,
				hwzl_num:0,
				show_num:0,
				data_reset:[]
			}
		},
		/**
		 * 页面用到的组件
		 */
		components: {
			biaofunDatetimePicker
		},
		onLoad(option) {
			if(option.id){
				this.id=option.id||''
				this.type=option.type|| ''
				uni.setNavigationBarTitle({
					title:'修改订单'
				})
				this.getdata()
			}else{
				this.fh_time=this.gettime()
				this.getdata_cp()
			}
			
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'sj_type', 'loginDatas']),
		},
		onShow(){
			var that =this
			let pages = getCurrentPages();
			let currPage = pages[pages.length - 1];
			if (currPage.data.getaddress) {  
			      //将携带的参数赋值
			        
			    this.address=currPage.data.getaddress
			    // this.addressBack=true 
					
			  console.log(this.address, '地址')
				
			}
			if (currPage.data.getshr) {  
			      //将携带的参数赋值
			        
			    this.shr=currPage.data.getshr
			    // this.addressBack=true 
					
			  console.log(this.shr, 'shr')
				
			}
			if (currPage.data.getwuliu) {  
			      //将携带的参数赋值
			        
			    this.wuliu=currPage.data.getwuliu
			    // this.addressBack=true 
					
			  console.log(this.wuliu, 'wuliu')
				
			}
			if(this.show_num>0){
				if(that.data_reset.length>0){
					this.page=1
					this.getdata_cp(that.data_reset)
				}else{
					this.page=1
					this.getdata_cp()
				}
				
			}
			this.show_num++
		},
		methods: {
			gettime(time){
				if(!time){
					return
				}
				var n_year = time.getFullYear();
				var n_month = time.getMonth() + 1;
				var n_date = time.getDate();
				var n_hour = time.getHours();
				var n_minute = time.getMinutes();
				if(n_month<10){
					n_month='0'+n_month
				}
				if(n_date<10){
					n_date='0'+n_date
				}
				if(n_hour<10){
					n_hour='0'+n_hour
				}
				if(n_minute<10){
					n_minute='0'+n_minute
				}
				return  n_year+'-'+n_month+'-'+n_date+' '+n_hour+":"+n_minute
			},
			getdata(){
			
				let that =this
				var jkurl='/order/orderShow'
				var datas={
					token:that.loginDatas.token||'',
					status:that.type, //1未分配 2未接单 3已接单 4已送达
					id:that.id
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
						that.address=datas.f_address
						that.shr=datas.s_address
						that.wuliu=datas.w_address
						that.hwzl_num=datas.weight
						var old_time=datas.delivery_time.split(':')
						that.fh_time=old_time[0]+':'+old_time[1]
						that.data_reset=datas.orderItem.product_data
						that.getdata_cp(datas.orderItem.product_data)
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
			
			sub(){
				var that =this
				if(!that.address){
					uni.showToast({
						icon:'none',
						title:'请选择发货地址'
					})
					return
				}
				if(!that.shr){
					uni.showToast({
						icon:'none',
						title:'请选择收货人'
					})
					return
				}
				if(!that.wuliu){
					uni.showToast({
						icon:'none',
						title:'请选择物流公司'
					})
					return
				}
				if(!that.hwzl_num){
					uni.showToast({
						icon:'none',
						title:'请填写货物重量'
					})
					return
				}
				var cargo={}
				for(var i=0;i<that.hw_data.length;i++){
					if(that.hw_data[i].type){
						cargo[that.hw_data[i].id]={
							name:that.hw_data[i].name,
							num:that.hw_data[i].num,
						}
					}
				}
				cargo=JSON.stringify(cargo)
				
				if(cargo=='{}'){
					uni.showToast({
						icon:'none',
						title:'请添加货物数量'
					})
					return
				}
				console.log(cargo)
				var fh_time=''
				if(that.fh_time){
					fh_time=that.fh_time+':00'
				}else{
					console.log(that.gettime(new Date()))
					fh_time=that.gettime(new Date())+':00'
				}
				var data={
					token: that.loginDatas.token || '',
					cargo:cargo,
					f_address:that.address.id,
					s_address:that.shr.id,
					w_address:that.wuliu.id,
					delivery_time:fh_time,
					weight:that.hwzl_num,
				}
				var jkurl = '/order/orderSave'
				if(that.id){
					data={
						id:that.id,
						token: that.loginDatas.token || '',
						cargo:cargo,
						f_address:that.address.id,
						s_address:that.shr.id,
						w_address:that.wuliu.id,
						delivery_time:fh_time,
						weight:that.hwzl_num,
					}
					jkurl = '/order/orderUpdate'
				}
					
				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
				}
				uni.showLoading({
					title: '正在提交数据'
				})
				service.P_post(jkurl, data).then(res => {
					that.btnkg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
							
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						uni.showToast({
							icon:'none',
							title:'提交成功'
						})
						console.log(this.content)
						setTimeout(()=>{
							if(that.id){
								var pages = getCurrentPages();   //当前页面
								var prevPage = pages[pages.length - 2];   //上一页面
								prevPage.setData({
								  //直接给上一个页面赋值
								  order_reset: true,
								});
								uni.navigateBack({
									delta:1
								})
							}else{
								uni.switchTab({
									url:'/pages/orderlist/orderlist'
								})
							}
							
						},1000)
							
							
					} else {
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '提交失败'
							})
						}
					}
				}).catch(e => {
					that.btnkg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '提交失败'
					})
				})
				return
				uni.showToast({
					icon:'none',
					title:'提交成功，请等待分配'
				})
				setTimeout(function(){
					uni.redirectTo({
						url:'/pages/orderDetails/orderDetails?type=0'
					})
				},1000)
			},
			changeDatetimePicker(date) {
				console.log('选择的日期时间数据：', date);
				this.fh_time=date
			},
			bindTimeChange(e){
				console.log(e)
			},
			hw_num(e){
				console.log(e)
			},
			//多选
			duoxuan(item,index){
				if(item.type==true){
					var datas=index.currentTarget.dataset
					Vue.set(item, 'type', false);
					
				}else{
					Vue.set(item, 'type', true);
					if(!item.num){
						Vue.set(item, 'num', 1);
					}
				}
			},
			num_fuc(item,d){
				var datas=d.currentTarget.dataset
				var num=item.num||0
				if(datas.type=='-'){
					
					if(num<=1){
						return
					}else{
						num--
					}
					
				}else{
					
						num++
					
				}
				console.log(num)
				Vue.set(item, 'num', num);
				Vue.set(item, 'type', true);
			},
			getdata_cp(data_reset) {
				var that = this
				var datas = {
					token: that.loginDatas.token || '',
					page: that.page,
					page_size: that.size
				}
				var page_that=that.page
				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
				}
				//selectSaraylDetailByUserCard
				var jkurl = '/my/productList'
				// uni.showLoading({
				// 	title: '正在获取数据'
				// })
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
							that.hw_data = datas.data
						} else {
							if (datas.data.length == 0) {
								that.data_last = true
								return
							}
							that.hw_data = that.hw_data.concat(datas.data)
						}
						that.page++
						if(that.data_reset.length>0){
							for(var i=0;i<that.hw_data.length;i++){
								for(var j=0;j<that.data_reset.length;j++){
									if(that.hw_data[i].id==that.data_reset[j].id){
										Vue.set(that.hw_data[i],'type',true)
										Vue.set(that.hw_data[i],'num',that.data_reset[j].num)
									}
								}
							}
						}
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
			jump(e){
				service.jump(e)
			}
		}
	}
</script>

<style scoped>
	.order_box{
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
	}
	.order_box .d1{
		padding: 30upx 0px;
	}
	.order_box .d1+.d1{
		border-top: 1px solid #F6F6F6;
	}
	.d1_l{
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
	.d1_l1{
		background: #FED24D;
		color: #222;
	}
	.d1 .iconfont{
		margin-left: 60upx;
		font-size: 26upx;
	}
	.od_li{
		font-size: 32upx;
		color: #333;
		font-family: PingFang;
		font-weight: bold;
		margin-bottom: 20upx;
	}
	.od_li view{
		flex: 1;
	}
	.od_li view+view{
		font-size: 28upx;
		
		font-family: PingFang SC;
		font-weight: bold;
	}
	.od_li1{
		font-size: 26upx;
		color: #333;
		font-family: PingFang;
		
		font-weight: bold;
		margin-bottom: 20upx;
	}
	.od_li2{
		font-size: 26upx;
		color: #333;
		
		font-family: PingFang SC;
		font-weight: bold;
	}
	.fh_time{
		width: 100%;
		min-height: 100upx;
		border-bottom: 1px solid #F6F6F6;
	}
	.fh_name{
		
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
	}
	.fh_times{
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: bold;
		text-align: right;
		color: #999;
	}
	.fh_next{
		margin-left: 50upx;
		font-size: 26upx;
	}
	.danwei{
		font-size: 30upx;
		color: #333;
		margin-left: 25upx;
	}
	.fh_zl{
		min-width: 0;
		width: 199upx;
		height: 58upx;
		background: #EFEFEF;
		text-align: center;
		font-size: 30upx;
	}
	.hw_num{
		width: 100%;
		padding-top: 30upx;
		padding-bottom: 130upx;
	}
	.hw_list{
		width: 490upx;
	}
	.hw_li{
		margin-bottom: 20upx;
		font-size: 26upx;
		color: #333;
	}
	.num_type{
		width: 20upx;
		height: 20upx;
		margin-right: 12upx;
	}
	.numcz image{
		width: 42upx;
		height: 42upx;
		border-radius: 50%;
	}
	.numcz view{
		width: 50upx;
		text-align: center;
		font-size: 25upx;
		color: #333;
	}
	.order_bottom{
		width: 100%;
		
		height: 126upx;
		background: #F6F6F6;
		position: fixed;
		left: 0;
		bottom: 0;
	}
	.order_bottom view{
		width: 690upx;
		height: 88upx;
		background: #FFDA22;
		border-radius: 44upx;
		display: flex;
		align-items: center; 
		justify-content: center;
		
		font-size: 40upx;
		font-family: PingFang;
		font-weight: bold;
		color: #333333;
	}
	.go_btn{
		
		font-size: 26upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
	}
	.go_btn text{
		font-size: 18upx;
	}
</style>
