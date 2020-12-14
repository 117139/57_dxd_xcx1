<template>
	<view>
		<view v-if="datas" class="pj_js dis_flex">
			<image class="sj_tx" :src="getimg(datas.user.avatar)"></image>
			<view class="flex_1 sj_msg dis_flex_c ju_b">
				<view class="w100 dis_flex aic ju_b">
					<view class="sj_name">{{datas.user.real_name}}</view>
					<view class="sj_tel">{{datas.user.phone}}</view>
				</view>
				<view class="sj_xj">
					目前服务星级:
					<text v-for="(item,index) in 5" :class="index<datas.rate?'active':''" class="iconfont icon-wujiaoxingxingxingshoucangdianji-copy"></text>
				
				</view>
			</view>
		</view>
		<view class="pj_box">
			<view class="pj_tit dis_flex aic ju_c">
				<view></view>
				<text>评价司机</text>
				<view></view>
			</view>
			<view class="pj_df dis_flex aic ju_c">
				<text v-for="(item,index) in 5" @tap="df_fuc(index)" :class="xj>index?'active':''" class="iconfont icon-wujiaoxingxingxingshoucangdianji-copy"></text>
			</view>
			<view class="pj_text_box">
				<textarea placeholder="请输入你的评价" v-model="content" maxlength="200"></textarea>
				<view class="w100 dis_flex ju_b">
					<view></view>
					<view>{{content.length}}/200</view>
				</view>
			</view>
			<view class="pj_btn" @tap="sub">立即评价</view>
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
				id:'',
				o_id:'',
				datas:'',
				content:"",
				xj:0
			}
		},
		computed: {
			...mapState(['hasLogin','loginDatas']),
		},
		onLoad(option) {
			this.id=option.id
			this.o_id=option.o_id
			this.getdata()
		},
		methods: {
			getimg(img){
				return service.getimg(img)
			},
			getdata(){
				var that =this
				var datas={
					token:that.loginDatas.token,
					id:that.id,
				}
				var jkurl="/my/estimate_show"
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
						that.datas=datas
				
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
			},
			sub(){
				var that =this
				console.log(this.content)
				if(!this.content){
					uni.showToast({
						icon:'none',
						title:'请输入你的评价'
					})
					return
				}
				var datas={
					token:that.loginDatas.token,
					id:that.id,
					rate:that.xj,
					remake:that.content
				}
				var jkurl="/my/estimate_save"
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
						var pages = getCurrentPages();   //当前页面
						var prevPage = pages[pages.length - 2];   //上一页面
						prevPage.setData({
						  //直接给上一个页面赋值
						  set_pl: true,
						});
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
			},
			df_fuc(num){
				this.xj=num+1
			}
		}
	}
</script>

<style scoped>
	.pj_js{
		width: 100%;
		padding: 50upx 40upx;
		box-sizing: border-box;
		border-bottom: 1px solid #F7F7F7;
	}
	.sj_tx{
		width: 85upx;
		height: 86upx;
		border-radius: 50%;
		margin-right: 28upx;
	}
	.sj_msg{
		height: 90upx;
	}
	.sj_name{
		font-size: 34upx;
		
		font-family: PingFang;
		font-weight: bold;
		color: #333;
	}
	.sj_tel{
		font-size: 28upx;
		color: #666;
	}
	.sj_xj{
		
		font-size: 26upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
	}
	.sj_xj text{
		margin-left: 8upx;
		color: #E0E0E0;
	}
	.iconfont.active{
		color: #FFDA22;
	}
	.pj_box{
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
	}
	.pj_tit{
		width: 100%;
		margin-bottom: 40upx;
	}
	.pj_tit view{
		width: 79upx;
		height: 1px;
		background: #A6A6A6;
	}
	.pj_tit text{
		font-size: 23upx;
		color: #333;
		margin: 0 16px;
	}
	.pj_df {
		margin-bottom: 45upx;
	}
	.pj_df text{
		font-size: 56upx;
		color: #E0E0E0;
		margin: 0 10upx;
	}
	.pj_text_box{
		width: 100%;
		padding: 25upx 35upx;
		box-sizing: border-box;
		background: #F7F7F7;
		border-radius: 4upx;
	}
	.pj_text_box textarea{
		width: 100%;
		height: 170upx;
	}
	.pj_btn{
		position: fixed;
		bottom: 40upx;
		left: 30upx;
		right: 30upx;
		width: 690upx;
		height: 88upx;
		background: #FFDA22;
		border-radius: 44upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
