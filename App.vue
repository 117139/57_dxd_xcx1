<script>
	import Vue from 'vue'
	import service from './service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		onLaunch: function() {
			// AppID(小程序ID)wx60d60efe13603f6a
			//45af533997479e9ae6a403fa974c4c2b AppSecret(小程序密钥)45af533997479e9ae6a403fa974c4c2b
			var that =this
			console.log('App Launch')
			service.wxlogin()
			uni.getSystemInfo({
				success: function(e) {
					console.log(e);
					console.log(e.platform);
					that.setplatform(e.platform)
					// #ifndef MP
					console.log(e.statusBarHeight)
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
			
					// #ifdef MP-WEIXIN || MP-QQ
					Vue.prototype.StatusBar = e.statusBarHeight;
					let capsule = wx.getMenuButtonBoundingClientRect();
					if (capsule) {
						Vue.prototype.Custom = capsule;
						// Vue.prototype.capsuleSafe = uni.upx2px(750) - capsule.left + uni.upx2px(750) - capsule.right;
						Vue.prototype.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					}
					// #endif		
				
			
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin','loginDatas', 'uuid']),
			
		},
		methods: {
				...mapMutations(['login','logindata','logout','setplatform','setuuid']),
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "static/css/iconfont.css";
	
	@font-face {
		font-family: 'PingFang';
		src: url('static/fonts/PINGFANG MEDIUM.TTF') format('truetype');
	}
	@font-face {
		font-family: 'PingFang SC';
		src: url('static/fonts/PINGFANG LIGHT.TTF') format('truetype');
	}
	page{
		font-family: PingFang;
		/* font-weight: bold; */
		/* height: 100%; */
	}
	view{
		box-sizing: border-box;
	}
	.w100{
		width: 100%;
	}
	.hidden{
		display: none;
	}
	.zanwu{
		width: 100%;
		line-height: 240rpx;
		text-align: center;
		font-size: 28rpx;
		color: #999;
	}
	
	.dis_flex{
		display: flex;
	}
	.dis_flex_c{
		display: flex;
		flex-direction: column;
	}
	.aic{
		align-items: center;
	}
	.aift{
		align-items: flex-start;
	}
	.aife{
		align-items: flex-end;
	}
	.ju_a{
		justify-content: space-around;
	}
	.ju_b{
		justify-content: space-between;
	}
	.ju_c{
		justify-content: center;
	}
	.flex_1{
		flex: 1;
	}
	.oh1 {
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 1;
	    -webkit-box-orient: vertical;
	}
	
	.oh2 {
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 2;
	    -webkit-box-orient: vertical;
	}
	
	.oh3 {
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 3;
	    -webkit-box-orient: vertical;
	}
	
	.oh4 {
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 4;
	    -webkit-box-orient: vertical;
	}
	
	.b_b_btns{
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		background: #F6F6F6;
		box-sizing: 100;
	}
	
	.data_last{
		line-height: 100rpx;
		text-align: center;
		width: 100%;
		font-size: 24rpx;
		color: #666;
	}
	.xmfwb_box image,.xmfwb_box img,.xmfwb_box table,
	rich-text p,rich-text img,rich-text table{
		max-width: 100%!important;
	}
	.xcx_fwb_img{
		max-width: 100%!important;
	}
	.od_li view,
	.order_gs view{
		max-width: 300upx!important;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
</style>
