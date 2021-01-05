<template>
	<view>
		<view class="cz_box">
			<view class="cz_tit">充值金额</view>
			<view class="dis_flex aife cz_num">￥<input type="number" placeholder="请输入" v-model="cz_num"></view>
			<view class="cz_btn" @tap="sub">充值</view>
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
				cz_num:''
			}
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginDatas',
				'sj_type'
			])
		},
		methods: {
			sub(){
				var that =this
				if(!this.cz_num){
					uni.showToast({
						icon:'none',
						title:'请输入充值金额'
					})
					return
				}
				var datas = {
					token: that.loginDatas.token || '',
					money: this.cz_num
				}
				if (this.btnkg == 1) {
					return
				}
				this.btnkg = 1
				uni.showLoading({
					mask: true,
					title: '正在生成订单'
				})
				var jkurl="/my/charge"
				
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
	.cz_box{
		width: 100%;
		padding: 0 30upx;
	}
	.cz_tit{
		height: 100upx;
		font-size: 30upx;
		color: #333;
	}
	.cz_num{
		font-size: 40upx;
		color: #333;
		border-bottom: 1px solid #eee;
		padding: 10upx 0;
	}
	.cz_num input{
		font-size: 60upx;
		padding-left: 30upx;
		height: 100upx;
	}
	.cz_btn{
		margin-top: 100upx;
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
</style>
