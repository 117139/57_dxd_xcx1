<template>
	<view class="content_wrap">
		<view class="head_box" :class="{'cur_H':PageScroll>10}" :style="style">
			个人中心
		</view>
		<!-- <view v-if="sj_type==0" class="qiehuan_btn" @tap="setsj_type(1)">切换</view> -->
		<!-- <view v-if="sj_type==1" class="qiehuan_btn" @tap="setsj_type(0)">切换</view> -->
		<block v-if="sj_type==1">
			<view v-if="hasLogin" class="my_box">
				<image class="my_box_bg" src="/static/images/mybg_01.jpg"></image>
				<view class="user_box dis_flex aic">
					<image class="user_tx" :src="getimg(loginDatas.avatar)"></image>
					<view class="flex_1">
						<view class="user_name">{{loginDatas.real_name?loginDatas.real_name:loginDatas.nickname}}</view>
					</view>
				</view>
			</view>
			<view v-if="!hasLogin" class="my_box">
				<image class="my_box_bg" src="/static/images/mybg_01.jpg"></image>
				<view class="user_box dis_flex aic">
					<image class="user_tx" src="/static/images/tx_m2.jpg"></image>
					<view class="flex_1">
						<view class="user_name" @tap="jump" data-url="/pages/login/login">登录/注册</view>
					</view>
				</view>
			</view>
			<view  v-if="hasLogin" class="usermsg_box">
				<view class="user_gongsi dis_flex aic">
					<image class="mygs" src="../../static/images/mygs.png"></image>
					<view class="oh1">公司名称:[{{loginDatas.company.title}}]</view>
				</view>
				<scroll-view class="weixin_dblist" scroll-x="true" bindscroll="scroll" style="width: 100%">
					
						<view v-for="(item,index) in loginDatas.company.users" class="weixin_db_box">
							<view class="weixin_db">
								<view class="d1 dis_flex ju_b">
									<view class="db_name">{{item.real_name}}</view>
									<view class="db_tel">{{item.phone}}</view>
								</view>
								<view class="d2 db_sfz">身份证：{{item.person_auth_id_card}}</view>
								<view class="d2  db_status">已审核绑定微信</view>
							</view>
						</view>
				</scroll-view>
			</view>
			<view class="my_list_box">
				<view class="my_list" >
					<view class="my_li" @tap="jump" data-url="../my_address/my_address" :data-login='true' :data-haslogin='hasLogin'>
						<view class="my_icon"><image src="../../static/images/myicon1.png" mode="aspectFit"></image></view>
						<view class="flex_1">发货地址</view>
						<text class="iconfont icon-next-m"></text>
					</view>
					<view class="my_li" @tap="jump" data-url="../my_shr/my_shr" :data-login='true' :data-haslogin='hasLogin'>
						<view class="my_icon"><image src="../../static/images/myicon2.png" mode="aspectFit"></image></view>
						<view class="flex_1">收货人</view>
						<text class="iconfont icon-next-m"></text>
					</view>
					<view class="my_li" @tap="jump" data-url="../my_wuliu/my_wuliu" :data-login='true' :data-haslogin='hasLogin'>
						<view class="my_icon"><image src="../../static/images/myicon3.png" mode="aspectFit"></image></view>
						<view class="flex_1">物流公司</view>
						<text class="iconfont icon-next-m"></text>
					</view>
					<view class="my_li" @tap="jump" data-url="../my_yf/my_yf" >
						<view class="my_icon"><image src="../../static/images/myicon4.png" mode="aspectFit"></image></view>
						<view class="flex_1">运费余额</view>
						<text class="iconfont icon-next-m"></text>
					</view>
					<view class="my_li" @tap="jump" data-url="../my_chanpin/my_chanpin" :data-login='true' :data-haslogin='hasLogin'>
						<view class="my_icon"><image src="../../static/images/myicon5.png" mode="aspectFit"></image></view>
						<view class="flex_1">公司产品</view>
						<text class="iconfont icon-next-m"></text>
					</view>
					<view class="my_li" @tap="jump" data-url="../my_pinglun/my_pinglun" :data-login='true' :data-haslogin='hasLogin'>
						<view class="my_icon"><image src="../../static/images/myicon6.png" mode="aspectFit"></image></view>
						<view class="flex_1">我的评价</view>
						<text class="iconfont icon-next-m"></text>
					</view>
					<view class="my_li" @tap="jump" data-url="../about/about?type=about" :data-login='false' :data-haslogin='hasLogin'>
						<view class="my_icon"><image src="../../static/images/myicon7.png" mode="aspectFit"></image></view>
						<view class="flex_1">关于我们</view>
						<text class="iconfont icon-next-m"></text>
					</view>
					<view class="my_li" @tap="jump" data-url="../my_fankui/my_fankui" :data-login='false' :data-haslogin='hasLogin'>
						<view class="my_icon"><image src="../../static/images/myicon8.png" mode="aspectFit"></image></view>
						<view class="flex_1">帮助反馈</view>
						<text class="iconfont icon-next-m"></text>
					</view>
					<view class="zzc_box" v-if="fk_show" @tap="fk_show=false">
						<view class="fk_box"  @tap.stop="">
							<view class="d1" @tap.stop="call" data-tel="4008888888">400-8888-888</view>
							<view class="d2">客服小程序官方联系方式</view>
						</view>
					</view>
				</view>
			</view>
		</block>
		<!-- 司机 -->
		<block v-if="sj_type==0">
			<view v-if="hasLogin" class="my_box">
				<image class="my_box_bg" src="/static/images/my_sjbg_01.jpg"></image>
				<view class="user_box sj_box dis_flex aic">
					<image class="user_tx" :src="getimg(loginDatas.avatar)"></image>
					<view class="flex_1">
						<view class="user_name">{{loginDatas.real_name?loginDatas.real_name:loginDatas.nickname}}<text>{{getTel(loginDatas.phone,3,4)}}</text></view>
						<view class="user_sfz">身份证号：{{getTel(loginDatas.person_auth_id_card,3,2)}}</view>
					</view>
				</view>
			</view>
			<view v-if="!hasLogin" class="my_box">
				<image class="my_box_bg" src="/static/images/my_sjbg_01.jpg"></image>
				<view class="user_box sj_box dis_flex aic">
					<image class="user_tx" src="/static/images/tx_m2.jpg"></image>
					<view class="flex_1">
						<view class="user_name" @tap="jump" data-url="/pages/login/login">登录/注册</view>
					</view>
				</view>
			</view>
			<view style="width: 100%;height: 65upx;background: #F8F9FA;"></view>
			<view class="my_list_box">
				<view class="my_list" >
					<view class="my_li" @tap="jump" data-url="../my_sj_yf/my_sj_yf" >
						<view class="my_icon"><image src="../../static/images/myicon4.png" mode="aspectFit"></image></view>
						<view class="flex_1">运费余额</view>
						<text class="iconfont icon-next-m"></text>
					</view>
					<view class="my_li" @tap="jump" data-url="../my_sj_pj/my_sj_pj" :data-login='false' :data-haslogin='hasLogin'>
						<view class="my_icon"><image src="../../static/images/myicon6.png" mode="aspectFit"></image></view>
						<view class="flex_1">我的评价</view>
						<text class="iconfont icon-next-m"></text>
					</view>
				</view>
			</view>
		</block>
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
				yhxy: false,
				datas_xy: {
					body: ''
				},
				btnkg: 0,
				time_zz:'你好',
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				datas: '',
				indicatorDots: true,
				autoplay: true,
				interval: 3000,
				duration: 500,
				PageScroll:'',
				fk_show:false
			};
		},
		onLoad() {
			var yhxy = uni.getStorageSync('yhxy')
			if (!yhxy) {
				this.yhxy = true
			}
			
			
		},
		onShow() {
			service.wxlogin()
		},
		onPageScroll(e){
			// console.log(e)
			this.PageScroll=e.scrollTop
			
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName','sj_type','loginDatas']),
			
			style0() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var padd_top = CustomBar
				var style = `padding-top:${padd_top}px;`;
				
				return style
			},
			style() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;

				return style
			},
			
			style2(){
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var style = `padding-top:${CustomBar}px;`;
				
				return style
			}
		},
		onPullDownRefresh() {
			console.log('下拉')
			this.getdata()
		},
		onReachBottom() {
			console.log('上拉')
		},
		methods: {
			...mapMutations(['login','logindata','logout','setplatform','setsj_type']),
			scroll(e) {
			    console.log(e)
			  },
			call(e){
				console.log(e)
				service.call(e)
			},
			bindLogin() {
				uni.navigateTo({
					url: '../login/login',
				});
			},
			jump(e) {
				var that = this
				console.log(that.btnkg)
				console.log(e.currentTarget.dataset.url)
				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
					setTimeout(function() {
						that.btnkg = 0
					}, 1000)
				}
				
				service.jump(e)
			},
			getimg(img){
				return service.getimg(img)
			},
			getTel(num,num1,num2){
				return service.getTel(num,num1,num2)
			}
		}
	}
</script>

<style scoped>
	page{
		font-family: PingFang;
	}
	.content_wrap{
		position: relative;
		/* min-height: 100vh; */
		box-sizing: border-box;
		background: #F8F9FA;
	}
	.cu_custom_box{
		z-index: 99999;
	}
	.index_bg{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 355upx;
		z-index: 0;
	}
	.head_box{
		position: fixed;
		width: 100%;
		top: 0;
		text-align: center;
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		z-index: 99999;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		transition: all .5s;
	}
	.cur_H{
		background: #fff;
		color: #333;
	}
	
	
	.my_box{
		width: 100%;
		height: 348upx;
		position: relative;
	}
	.my_box_bg{
		position: absolute;
		top: 0;
		width: 100%;
		height: 348upx;
		z-index: 0;
	}
	.user_box{
		position: absolute;
		top: 147upx;
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
	}
	.user_tx{
		width: 138upx;
		height: 138upx;
		border-radius: 50%;
		margin-right: 22upx;
	}
	.user_name{
		font-size: 42upx;
		line-height: 90upx;
		color: #333;
		font-weight: bold;
		font-family: PingFang;
	}
	
	
	.usermsg_box{
		width: 100%;
		padding: 0 30upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		margin-bottom: 25upx;
		background: #fff;
	}
	.user_gongsi{
		width: 100%;
		height: 100upx;
		font-size: 30upx;
		color: #212D3B;
	}
	.mygs{
		width: 37upx;
		height: 30upx;
		margin-right: 33upx;
	}
	.weixin_dblist{
		width: 100%;
		padding-bottom: 20px;
		height: 183upx;
		white-space:nowrap;
	}
	.weixin_db_box{
		min-width: 406upx;
		height: 163upx;
		padding-top: 10upx;
		padding-bottom: 10upx;
		padding-left: 5upx;
		margin-right: 30upx;
		display: inline-block;
	}
	
	.weixin_db{
		width: 100%;
		height: 163upx;
		padding: 20upx 25upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		background: #FFFFFF;
		box-shadow: 0px 0px 10upx 0px rgba(0, 0, 0, 0.1);
		border-radius: 4upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	
	.db_name{
		font-size: 28upx;
		color: #333;
		font-weight: bold;
		
	}
	.db_tel{
		font-size: 26upx;
		color: #333;
	}
	.db_sfz{
		font-size: 24upx;
		color: #333;
	}
	.db_status{
		font-size: 24upx;
		color: #4E8AE3;
	}
	
	
	
	
	
	
	.my_list_box{
		width: 100%;
		padding: 0 10upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}
	.my_list{
		width: 100%;
		padding: 20upx 30upx;
		box-sizing: border-box;
		background: #fff;
	}
	.my_li{
		width: 100%;
		height: 100upx;
		/* border-bottom: 1px solid #EDEDED; */
		display: flex;
		align-items: center;
		color: #212D3B;
		font-size: 28upx;
	}
	.my_icon{
		width: 64upx;
		display: flex;
		align-items: center;
		font-size: 30upx;
		color: #666;
	}
	.my_icon image{
		width: 35upx;
		height: 35upx;
	}
	.my_li>.iconfont{
		font-size: 22upx;
		color: #999;
	}
	.zzc_box{
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 999;
		background: rgba(0,0,0,.5);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.fk_box{
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		
		width: 600upx;
		height: 302upx;
		background: #FFFFFF;
		border-radius: 20upx;
	}
	.fk_box .d1{
		font-size: 32upx;
		color: #444;
		margin: 25upx auto;
	}
	.fk_box .d2{
		font-size: 28upx;
		color: #666;
		margin: 25upx auto;
	}
	
	
	.qiehuan_btn{
		position: fixed;
		top: 30upx;
		/* #ifdef MP-WEIXIN */
		top:140upx;
		/* #endif */
		right: 30upx;
		width: 80upx;
		height: 80upx;
		font-size: 20upx;
		color: #fff;
		border-radius: 50%;
		z-index: 950;
		background: #FED24D;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
	}
	
	/* 司机 */
	.sj_box{
		top: 179upx;
		left: 30upx;
		margin: 0 auto;
		width: 690upx;
		height: 195upx;
		background: #FFFFFF;
		box-shadow: 0px 7px 10px 0px rgba(0, 0, 0, 0.02);
		border-radius: 15px;
	}
	.user_name text{
		font-size: 26upx;
		color: #333;
		margin-left: 5upx;
	}
	.user_sfz{
		font-size: 22upx;
		color: #999;
	}
</style>
