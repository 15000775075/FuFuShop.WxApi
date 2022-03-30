<template>
	<view class="warp">
		<view class="top_list">
			<view class="top_tab">
				<view 
					class="tab_list" 
					v-for="(item,index) in topNavList" 
					:key="index" 
					@tap="onTopTabs(index)"
				>	
					<view class="tab_item" :class="tabIndex==index?'active':''">{{item}}</view>
				</view>
			</view>
		</view>
		<view v-if="tabIndex == 0" class="phone_css">
			<input type="text" disabled v-model="phone" placeholder="点击授权获取手机号"/>
			<button type="default" open-type="getPhoneNumber" @getphonenumber="getphonenumber">点击授权</button>
		</view>
		<view v-else class="phone_css2">
			<view class="t_login_passList">
				<input
					class="input_css"
					v-model="phone"
					type="number"
					border="none"
					placeholder="请输入手机号码"
				></input>
			</view>
			<view class="t_login_passList">
				<input
					class="input_css2"
					v-model="code"
					type="number"
					border="none"
					placeholder="请输入验证码"
				></input>
				<view class="code">
					<view v-if="!isGetCode" @tap="getCode" style="color:#FF4544">获取验证码</view> 
					<view v-else style="color:#B2B2B2">{{codeTime}} 秒后重发</view>
				</view>
			</view>
		</view>
		<view class="bot_btn">确认</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				topNavList:['直接授权','手动输入'],
				tabIndex:0,
				phone:'',
				code:'',        //验证码
				isGetCode:false,   //是否已经获取验证码
				codeTime:60,
			};
		},
		methods:{
			onTopTabs(index){
				this.tabIndex = index;
			},
			getphonenumber(e){
				console.log('获取手机号需要的信息',e.detail)
			},
			// 获取验证码
			getCode(){
				const iphone = this.account;
				const that = this;
				if( !/^1[3456789]\d{9}$/.test(iphone) ){
					uni.showToast({
						title:'请输入手机号',
						icon:'none',
						duration:1500
					})
					return;
				};
				// https(urlList.getPhoneCode+'/'+iphone,'GET','','正在获取验证码').then(data => {
				// 	that.isGetCode = true;
				// 	uni.showToast({
				// 		title:'验证码获取成功',
				// 		icon:'none',
				// 		duration:1500,
				// 	});
				// 	let time = 60;
				// 	let Interval = setInterval(function () {
				// 		time--;
				// 		if (time > 0) {
				// 			that.codeTime = time;
				// 		} else {
				// 			clearInterval(Interval);
				// 			that.isGetCode = false;
				// 			that.codeTime = 60;
				// 		}
				// 	}, 1000)
				// }).catch(err => {
				// 	uni.showToast({
				// 		title:err,
				// 		icon:'none',
				// 		duration:1500
				// 	})
				// })
			},
		}
	}
</script>

<style lang="scss" scoped>
.warp{
	width: 100%;
	height: 100vh;
	background-color:#F7F7F7;
	display: flex;
	flex-direction: column;
	align-items: center;
	.top_list{
		width: 100%;
		background-color: white;
		position: sticky;
		top: 0;
		display: flex;
		flex-direction: column;
		.top_tab{
			width: 100%;
			height: 100rpx;
			display: flex;
			flex-direction:row;
			align-items: center;
			justify-content: center;
			.tab_list{
				width: 25%;
				height: 100%;
				display: flex;
				flex-direction:row;
				align-items: center;
				justify-content: center;
				font-size: 29rpx;
				.tab_item{
					height:60rpx;
					width: 100%;
					border-radius: 35rpx;
					font-family: PingFangSC-Ultralight,ans-serif;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;
				}
				.active{
					color: white;
					background-color:#FF4544;
				}
			}
		}
	}
	.phone_css{
		width: 100%;
		margin-top: 20rpx;
		height: 150rpx;
		background-color: white;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		input{
			width: 500rpx;
			height: 85rpx;
			margin-left: 30rpx;
			text-indent:10px;
			background-color:#F7F7F7;
		}
		button{
			font-size: 29rpx;
			color: red;
			background-color: white;
		}
		button::after{
			border: none;
		}
	}
	.phone_css2{
		width: 100%;
		margin-top: 20rpx;
		padding: 20rpx 0 20rpx 0;
		background-color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.t_login_passList{
			width:650rpx;
			padding: 20rpx 0rpx;
			border-bottom: 1rpx solid #e6e6e6;
			display: flex;
			flex-direction: row;
			align-items: center;
			.input_css{
				width:650rpx;
				height: 70rpx;
				// padding-top:10rpx;
			}
			.input_css2{
				width: 450rpx;
				height: 70rpx;
				// padding-top:10rpx;
			}
			.code{
				margin-left: 20rpx;
				width: 200rpx;
				display: flex;
				justify-content: flex-end;
				border-left: 1rpx solid #e6e6e6;
				font-size: 31rpx;
			}
		}
	}
	.bot_btn{
		width: 690rpx;
		height:80rpx;
		color: white;
		background-color:#FF4544;
		border-radius:40rpx;
		margin-top: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
</style>
