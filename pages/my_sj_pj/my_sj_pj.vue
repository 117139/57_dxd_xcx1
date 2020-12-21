<template>
	<view>
		<view v-if="datas" class="div_img1 gwxq_cj">
			<view class="dis_flex_c aic w100">
				<view class='pj_name dis_flex aic'>
					<image class="pj_tx" :src="getimg(datas.user.avatar)"></image>
					<view class="">
						<view class="sj_name">{{datas.user.real_name}}</view>
						<view class="sj_tel">{{datas.user.phone}}</view>
					</view>
				</view>
				<view class="pj_xj dis_flex">
					<i v-for="(item,index) in 5" :class="index<datas.satisficing?'active':''" class="iconfont icon-wujiaoxingxingxingshoucangdianji-copy"></i>
					
				</view>
				<view class="gw_cj_d1 tac">{{datas.per_rate}}%<br>满意度</view>
				<view class="gw_cj_d3 dis_flex aic">
					<view class="gwd31">好评(<span v-if="datas.per_a>0">{{datas.per_a}}%</span><span v-else class="c9">暂无</span>)</view>
					<view class="gwd32">
						<view class="gwd32_b" :style="'width: '+datas.per_a+'%;'"></view>
					</view>
				</view>
				<view class="gw_cj_d3 dis_flex aic">
					<view class="gwd31">中评(<span v-if="datas.per_b>0">{{datas.per_b}}%</span><span v-else class="c9">暂无</span>)</view>
					<view class="gwd32">
						<view class="gwd32_b" :style="'width: '+datas.per_b+'%;'"></view>
					</view>
				</view>
				<view class="gw_cj_d3 dis_flex aic">
					<view class="gwd31">差评(<span v-if="datas.per_c>0">{{datas.per_c}}%</span><span v-else class="c9">暂无</span>)</view>
					<view class="gwd32">
						<view class="gwd32_b" :style="'width: '+datas.per_c+'%;'"></view>
					</view>
				</view>

			</view>
		</view>
		<view class="pj_ts">投诉举报或建议</view>
		<view class="pj_tsbox">
			<view v-if="datas.remake.length==0" class="zanwu">暂无数据</view>
			<view v-for="(item,index) in datas.remake">{{index+1}}.{{item}}</view>
			
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
				datas:'',
				content:"",
				xj:0
			}
		},
		computed: {
			...mapState(['hasLogin','loginDatas']),
		},
		onLoad() {
			this.getdata()
		},
		methods: {
			getimg(img){
				return  service.getimg(img)
			},
			getdata() {
				var that = this
				var datas = {
					token: that.loginDatas.token
				}
				var jkurl = "/my/estimate_list"
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
		}
	}
</script>

<style scoped>
	.iconfont.active{
		color: #FFDA22;
	}
	.gwxq_cj {
		width: 691upx;
		height: 618upx;
		background: #FFFFFF;
		box-shadow: 0px 0px 10upx 0px rgba(0, 0, 0, 0.1);
		margin: 30upx auto 0;
		padding-top: 65upx;

	}

	.pj_name {
		margin-bottom: 70upx;
	}

	.pj_tx {
		width: 86upx;
		height: 86upx;
		border-radius: 50%;
		margin-right: 35upx;
	}

	.sj_name {
		font-size: 34upx;
		font-family: PingFang;
		font-weight: bold;
		color: #333333;
	}

	.sj_tel {
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #666;
	}

	.pj_xj {
		font-size: 40upx;
		color: #FFA889;
	}

	.gw_cj_d1 {
		margin-top: 24upx;
		margin-bottom: 45upx;
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		text-align: center;
	}

	.gwd31 {
		width: 180upx;
		font-size: 24upx;
		color: #333;
	}

	.c9 {
		color: #999;
	}

	.gwd32 {
		width: 352upx;
		height: 5upx;
		background: #E3E7ED;
		border-radius: 3upx;
		margin-left: 8upx;
	}

	.gw_cj_d3 {
		margin-bottom: 30upx;
	}

	.gwd32_b {

		height: 5upx;
		background: #3677F1;
		border-radius: 3upx;
	}

	.pj_ts {
		width: 100%;
		height: 100upx;
		padding: 0 30upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		display: flex;
		align-items: center;

		font-size: 30upx;
		font-family: PingFang;
		font-weight: bold;
		color: #333333;
	}

	.pj_tsbox {
		width: 691upx;
		min-height: 422upx;
		background: #FFFFFF;
		box-shadow: 0px 0px 10upx 0px rgba(0, 0, 0, 0.1);
		margin: 0 auto;
		padding: 60upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		position: relative;
		overflow: hidden;
	}

	.pj_tsbox view {
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
	}

	.pj_tsbox::before {
		content: '';
		position: absolute;
		top: -45upx;
		left: -80upx;
		width: 160upx;
		height: 90upx;
		border-radius: 160upx;
		background: #F4DE5D;
		opacity: 0.22;
	}

	.pj_tsbox view+view {
		margin-top: 55upx;
	}
</style>
