<template>
	<view class="container">
		<view class="h_tit">完善资料</view>
		<input class="login_msg" type="text" placeholder="请输入公司名" v-model="gs_name">
		<input class="login_msg" type="text" placeholder="请输入姓名" v-model="user_name" maxlength="10">
		<input class="login_msg" type="text" placeholder="请输入您身份证号" v-model="sfz">
		<checkbox-group  @change="change_fuc">
		<label class="dis_flex aic yhsz">
		  <checkbox :value="cb"  style="transform:scale(0.6)" />查看<text @tap="jump" data-url="../about/about?type=yhsz">《用户守则协议》</text>
		</label>
		</checkbox-group>
		<view class="login_msgbtn" @tap="sub">提交</view>
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
				cb:1,
				gs_name:'',
				user_name:'',
				sfz:'',
				sub_type:false,
				token:'',
				phone:''
			}
		},
		onLoad(option) {
			if(option.phone){
				this.phone=option.phone
			}
			this.token=uni.getStorageSync('token')
		},
		methods: {
			change_fuc(e){
				console.log(e.detail)
				if(e.detail.value.length==0){
					this.sub_type=false
				}else{
					this.sub_type=true
				}
			},
			jump(e){
				service.jump(e)
			},
			sub(){
				var  that =this
				if(!this.gs_name){
					uni.showToast({
						icon:'none',
						title:'请输入公司名'
					})
					return
				}
				if(!this.user_name){
					uni.showToast({
						icon:'none',
						title:'请输入姓名'
					})
					return
				}
				if(!this.sfz){
					uni.showToast({
						icon:'none',
						title:'请输入您身份证号'
					})
					return
				}
				if(!this.sub_type){
					uni.showToast({
						icon:'none',
						title:'请先查看用户守则'
					})
					return
				}
				console.log(this.gs_name)
				console.log(this.user_name)
				console.log(this.sfz)
				
				
				var datas={
					token:that.token,
					phone:that.phone,
					school_name:that.gs_name,
					real_name:that.user_name,
					person_auth_id_card:that.sfz,
				}
				var jkurl = '/my/setInfo'
				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
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
				
						uni.showToast({
							icon:'none',
							title:'提交成功，请等待分配'
						})
						setTimeout(function(){
							uni.navigateBack({
								delta:2
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
	.container{
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
	}
	.h_tit{
		
		font-family: PingFang;
		font-weight: bold;
		color: #161616;
		font-size: 48upx;
		padding-top: 40upx;
		padding-bottom: 150upx;
	}
	.login_msg{
		width: 100%;
		font-size: 30upx;
		height: 100upx;
		line-height: 100upx;
		margin-top: 30upx;
		border-bottom: 1px solid #F4F4F4;
	}
	.yhsz{
		margin-top: 50upx;
		font-size: 24upx;
		color: #333;
	}
	.uni-checkbox-input.uni-checkbox-input-checked{
		border: 2px solid #FFCC33;
	}
	.login_msgbtn{
		width: 690upx;
		height: 88upx;
		background: #FFDA22;
		border-radius: 44upx;
		position: fixed;
		bottom: 30upx;
		left: 30upx;
		right: 30upx;
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
