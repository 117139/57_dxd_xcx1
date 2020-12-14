import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: false,
		hasLogin: false,
		platform:'',
		userName: "游客",
		loginDatas:'',
		company:'',
		uid:'',
		phone:'',
		token:'',
		laheiArr:[],
		uuid:'',
		
		
		
		new_xz:[],    //批量操作
		new_problem:'' ,//新问题
		
		
		sj_type:0,
		shouquan:''
	},
	mutations: {
		setsj_type(state, sj_type) {
			state.sj_type=sj_type
			
			// uni.showToast({
			// 	icon:'none',
			// 	title:'切换'
			// })
			
		},
		wxshouquan(state, shouquan) {
			state.shouquan = shouquan || '';
		},
		setuuid(state, uuid) {
			state.uuid = uuid || 'h5';
		},
		login(state, userName) {
			state.userName = userName || '新用户';
			state.hasLogin = true;
			console.log(userName)
			console.log(state.userName)
		},
		lahei(state, id) {
			// state.userName = userName || '新用户';
			// state.hasLogin = true;
			state.laheiArr.push(id)
			console.log(state.laheiArr)
		},
		logindata(state, logindata) {
			state.loginDatas = logindata || '';
			Vue.set(state,'loginDatas',logindata)
			// state.company=logindata.company
			// state.uid= logindata.id
			// state.phone= logindata.phone
			// state.token= logindata.token
			console.log(logindata)
			console.log(state.loginDatas)
		},
		setplatform(state, platform) {
			state.platform = platform || 'android';
		},
		logout(state) {
			state.userName = "游客";
			state.hasLogin = false;
		},
		
		// ****************************************
		//评论操作
		setnew_xz(state, new_xz) {
			state.new_xz = new_xz||[];
		},
		//新题
		setnew_problem(state, new_problem) {
			state.new_problem = new_problem||[] ;
		},
	}
})

export default store
