<template>
	<view class="content_wrap">
	
		<view v-if="datas&&datas.body" class="xieyi_main" v-html="get_fwb(datas.body)">
		</view>
		<view v-else-if="type=='about'" class="xieyi_main"  >
			<image src="../../static/images/about_03.jpg" mode="aspectFit" style="width: 691upx;height: 1180upx;"></image>
		</view>
		<view v-else-if="type=='yszc'" class="xieyi_main"  >
			<view style="font-size: 45upx;font-weight: bold;text-align: center;margin-bottom: 40upx;">达鑫达隐私协议</view>
			<view style="margin-bottom: 40upx;">欢迎您使用达鑫达</view>
				
		</view>
		<view v-else-if="type=='yhsz'" class="xieyi_main"  >
			<view style="font-size: 45upx;font-weight: bold;text-align: center;margin-bottom: 40upx;">用户协议</view>
			<view style="margin-bottom: 40upx;">欢迎您使用“达鑫达小程序”及相关服务</view>
			
			<view>用的服务条款为准。如用户使用该服务，视为对相关服务条款的接受
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
				title:'隐私协议',
				type:0,
				datas:''
			}
		},
		onLoad(Option) {
			var that =this
			console.log(Option)
			
			
			if(Option.type=='yszc'){
				that.type=Option.type
				that.title='隐私协议'
				uni.setNavigationBarTitle({
					title:'隐私协议'
				})
			}
			if(Option.type=='about'){
				that.type=Option.type
				that.title='关于我们'
				uni.setNavigationBarTitle({
					title:'关于我们'
				})
				that.getdata('about_us')
			}
			if(Option.type=='yhsz'){
				that.type=Option.type
				that.title='用户守则协议'
				uni.setNavigationBarTitle({
					title:'用户守则协议'
				})
			}
			if(Option.type==3){
				that.type=Option.type
				that.title='用户协议'
			}
			if(Option.type==4){
				that.type=Option.type
				that.title='自动续费服务规则'
			}
			// this.getdata()
		},
		methods: {
			get_fwb(str){
				return service.get_fwb(str)
			},
			getdata(keyword){
				
				///api/info/list
				var that =this
				var data={
					keyword:keyword
				}
				//selectSaraylDetailByUserCard
				var jkurl = '/info/list'
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
						that.datas = datas
						
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
			}
		}
	}
</script>

<style scoped>
	.cu-custom{
		border-bottom: 1px solid #DBDBDB;
	}
	 .xieyi_main{
		 width: 100%;
		 padding: 10px 30upx;
		 -webkit-box-sizing: border-box;
		 -moz-box-sizing: border-box;
		 box-sizing: border-box;
		 font-size: 28upx;
		 color: #333;
	 }
	 .xieyi_main image{
		 max-width: 100%;
	 }
</style>
