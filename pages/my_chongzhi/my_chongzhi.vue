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
	export default {
		data() {
			return {
				cz_num:''
			}
		},
		methods: {
			sub(){
				if(!this.cz_num){
					uni.showToast({
						icon:'none',
						title:'请输入充值金额'
					})
					return
				}
				uni.showToast({
					icon:'none',
					title:'充值操作'
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
