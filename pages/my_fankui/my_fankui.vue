<template>
	<view>
		 <view class="fk_box dis_flex ju_b">
			 <view class=" dis_flex aic">
				 客服电话
			 </view>
			 <view class="fk_tel">
				 <view v-for="(item,index) in datas">{{item.body}}</view>
				 <!-- <view>400-0008640</view> -->
			 </view>
		 </view>
		 <view class="fk_tit">意见反馈</view>
		 <view class="fk_text">
			 <textarea v-model="content" placeholder="请输入您的意见和建议~" maxlength="200"/>
			 <view class="dis_flex ju_b fk_num">
				 <view></view>
				 <view>{{content.length}}/200</view>
			 </view>
		 </view>
		 <view class="b_btns dis_flex aic ju_c">
			 <view @tap="sub">提交</view>
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
				datas:[],
				content:''
			}
		},
		onLoad() {
			this.getdata()
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'sj_type', 'loginDatas']),
		},
		methods: {
			...mapMutations(['setnew_problem']),
			sub(){
				var that =this
				if(!that.content){
					uni.showToast({
						icon:'none',
						title:'请输入您的意见和建议'
					})
					return
				}
				var data={
					token: that.loginDatas.token || '',
					body:that.content
				}
				//selectSaraylDetailByUserCard
				var jkurl = '/my/feedback'
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
							uni.navigateBack({
								delta:1
							})
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
			},
			getdata(){
				
				///api/info/list
				var that =this
				var data={
					keyword:'service_tel,'
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
						that.datas = datas.service_tel
						
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
	page{
		font-family: PingFang SC;
	}
	.fk_box{
		width: 100%;
		min-height: 150upx;
		padding: 30upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		border-bottom: 1px solid #F7F7F7;
		align-items: stretch;
		font-size: 28upx;
		font-weight: bold;
	}
	.fk_tel{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		font-weight: bold;
		font-size: 32upx;
		color: 33px;
	}
	.fk_tit{
		width: 100%;
		height: 95upx;
		display: flex;
		align-items: center;
		font-size: 28upx;
		color: #333;
		padding: 0 30upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		font-weight: bold;
	}
	.fk_text{
		width: 689upx;
		height: 259upx;
		background: #F7F7F7;
		border-radius: 4upx;
		margin: 0 auto;
	}
	.fk_text textarea{
		width: 100%;
		height: 198upx;
		padding: 30upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}
	.fk_num{
		padding: 0 30upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
	}
	.b_btns{
		position: fixed;
		bottom: 40upx;
		width: 100%;
		padding: 30upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}
	.b_btns view{
		font-size: 32upx;
		color: #333;
		width: 100%;
		height: 88upx;
		background: #FFDA22;
		border-radius: 44upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
	}
</style>
