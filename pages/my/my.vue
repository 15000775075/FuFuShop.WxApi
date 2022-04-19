<template>
	<view class="warp">
		<view class="top_info">
			<image src="/static/images/my/my-bg.png"></image>
		</view>
		<view class="top_avatar">
			<image :src="userInfo.avatarImage?userInfo.avatarImage:'/static/images/my/avatar.png'"></image>
			<view v-if="userInfo.nickName" class="name">{{userInfo.nickName}}</view>
			<view v-else class="name" @tap="getuserinfo">点击登录</view>
		</view>
		<view class="top_tab1">
			<view class="tab1_item" @tap="goUrl(1)">
				<view class="tab1_item_top">0</view>
				<view class="tab1_item_bot">
					<image src="/static/images/my/sc.png"></image>
					<text>我的收藏</text>
				</view>
			</view>
			<view class="rig_bor"></view>
			<view class="tab1_item" @tap="goUrl(2)">
				<view class="tab1_item_top">0</view>
				<view class="tab1_item_bot">
					<image src="/static/images/my/zj.png"></image>
					<text>我的足迹</text>
				</view>
			</view>
		</view>
		<view class="top_tab2">
			<view class="tab1_item" @tap="goUrl(3)">
				<view class="tab1_item_top">0</view>
				<view class="tab1_item_bot">
					<image src="/static/images/my/jif.png"></image>
					<text>积分</text>
				</view>
			</view>
			<view class="rig_bor"></view>
			<view class="tab1_item" @tap="goUrl(4)">
				<view class="tab1_item_top">0</view>
				<view class="tab1_item_bot">
					<image src="/static/images/my/yhq.png"></image>
					<text>优惠券</text>
				</view>
			</view>
		</view>
		<view class="my_tabs">
			<view class="tabs_top" @tap="goUrl(5,0)">
				<view class="tabs_top_lef">我的订单</view>
				<view class="tabs_top_rig">查看更多 ></view>
			</view>
			<view class="tabs_bot">
				<view class="tabs_item" v-for="(item,index) in tabs" :key="index" @tap="goUrl(5,item.num)">
					<image :src="item.img"></image>
					<text>{{item.text}}</text>
				</view>
			</view>
		</view>
		<view class="my_tabs mar-top">
			<view class="tabs_top">
				<view class="tabs_top_lef">其他服务</view>
			</view>
			<view class="tabs_bot2">
				<view class="tabs2_item" v-for="(item,index) in botTabs" :key="index" @tap="goUrl(item.num)">
					<block v-if="item.num">
						<view class="tabs2_item_lef">
							<image :src="item.img"></image>
							<text>{{item.text}}</text>
						</view>
					</block>
					<block v-else>
						<button class="ke_css_btn" open-type="contact">
							<image :src="item.img"></image>
							<text>{{item.text}}</text>
						</button>
					</block>
					<uni-icons type="right" style="margin-right: 15rpx;" color="#8a8a8a"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const {
		urlList,
		https
	} = require('@/static/api');
	export default {
		data() {
			return {
				userInfo: {},
				tabs: [{
						img: '/static/images/my/tabs1.png',
						text: '待付款',
						num: 1,
					},
					{
						img: '/static/images/my/tabs2.png',
						text: '待发货',
						num: 2,
					},
					{
						img: '/static/images/my/tabs3.png',
						text: '待收货',
						num: 3,
					},
					{
						img: '/static/images/my/tabs4.png',
						text: '已完成',
						num: 4,
					},
					{
						img: '/static/images/my/tabs5.png',
						text: '售后',
						num: 111,
					},
				],
				botTabs: [{
					
						img: '/static/images/my/tabs2-1.png',
						text: '收货地址',
						num: 7
					},
					{
						img: '/static/images/my/tabs2-2.png',
						text: '绑定手机号',
						num: 8
					},
					{
						img: '/static/images/my/tabs2-3.png',
						text: '我的收藏',
						num: 1
					},
					{
						img: '/static/images/my/tabs2-4.png',
						text: '我的足迹',
						num: 2
					},
					{
						img: '/static/images/my/tabs2-5.png',
						text: '客服'
					},
					{
						img: '/static/images/my/tabs2-6.png',
						text: '清除缓存',
						num: 9
					},
				]
			};
		},
		onLoad() {
			const that = this;
			uni.getStorage({
				key: 'user_info',
				success: function(res) {
					console.log('登录信息', res.data);
					that.userInfo = res.data;
				}
			});
			console.log(that.userInfo);
		},
		methods: {
			goUrl(num, orderNum) {
				switch (num) {
					case 1:
						uni.navigateTo({
							url: '/pages/myCollection/myCollection'
						})
						break;
					case 2:
						uni.navigateTo({
							url: '/pages/myFootPrint/myFootPrint'
						})
						break;
					case 3:
						uni.navigateTo({
							url: '/pages/my-integral/my-integral'
						})
						break;
					case 4:
						console.log('优惠券')
						uni.navigateTo({
							url: '/pages/coupon/coupon'
						})
						break;
					case 5:
						if (orderNum == 111) {
							uni.navigateTo({
								url: '/pages/adter-sales/adter-sales'
							})
						} else {
							uni.navigateTo({
								url: '/pages/orders/orders?tabIndex=' + orderNum
							})
						}
						break;
					case 7:
						console.log('收货地址')
						uni.navigateTo({
							url: '/pages/address/address'
						})
						break;
					case 8:
						console.log('绑定手机号')
						uni.navigateTo({
							url: '/pages/bind-phone/bind-phone'
						})
						break;
					case 9:
						console.log('清除缓存')
						uni.showModal({
							content: '确定要清理缓存?',
							success: function(res) {
								if (res.confirm) {
									wx.clearStorage({
										success: (res) => {
											uni.showToast({
												title: '清理成功',
												icon: 'none',
												duration: 1500
											})
										},
									})
									// https(urlList.clearStorage,'GET','','正在清理...').then(data => {
									// 	wx.clearStorage({
									// 		success: (res) => {
									// 			wx.reLaunch({
									// 				url: '/pages/login/login',
									// 			})
									// 		},
									// 	})
									// }).catch(err => {
									// 	uni.showToast({
									// 		title:err,
									// 		icon:'none',
									// 		duration:1500
									// 	})
									// })
								}
							}
						})
						break;
				}
			},
			getuserinfo() {
				const that = this
				uni.getUserProfile({
					desc: "用于完善会员资料",
					success: (res1) => {
						console.log(res1.userInfo);
						wx.login({
							success: res => {
								
								if (res.code) {
									let postData = {
										code: res.code,
										userinfo: res1.userInfo
										// platUserInfoMap: {
										// 	encryptedData: res1.encryptedData,
										// 	iv: res1.iv,
										// }
									};
									https(urlList.wxlogin, 'POST', postData, '登录中').then(data => {
										console.log('请求成功', data)
										uni.setStorageSync('token',data.data.auth.token);
										uni.setStorageSync('user_info',data.data.user);
										uni.showToast({
											title:"登录成功"
										})
										that.userInfo = data.data.user;
									}).catch(err => {
										console.log('请求失败', err)
									})
								} else {
									console.log('获取用户登录态失败！' + res.errMsg)
								}
							}
						})
						// that.userInfo = res1.userInfo;
						// uni.showToast({
						// 	icon:"none",
						// 	title:'获取成功'
						// })
						// uni.setStorage({
						//     key: 'user_info',
						//     data:res1.userInfo,
						// });
					},
					fail: (err) => {
						console.log(err)
						uni.showToast({
							icon: "none",
							title: '用户拒绝获取'
						})
					}
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	.warp {
		width: 100%;
		height: 100%;
		background-color: #F7F7F7;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;

		.top_info {
			width: 100%;
			height: 350rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.top_avatar {
			position: absolute;
			top: 80rpx;
			display: flex;
			flex-direction: column;
			align-items: center;

			image {
				height: 140rpx;
				width: 140rpx;
				border-radius: 50%;
			}

			.name {
				margin-top: 20rpx;
				color: white;
			}
		}

		.top_tab1 {
			width: 700rpx;
			height: 140rpx;
			color: #505050;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;

			.tab1_item {
				width: 50%;
				height: 80%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.tab1_item_top {
					font-size: 28rpx;
					margin-left: 50rpx;
					margin-bottom: 5rpx;
				}

				.tab1_item_bot {
					font-size: 30rpx;
					width: 100%;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;

					image {
						height: 45rpx;
						width: 45rpx;
						margin-right: 15rpx;
					}
				}
			}

			.rig_bor {
				width: 1rpx;
				height: 30rpx;
				background-color: #a1a1a1;
			}
		}

		.top_tab2 {
			width: 700rpx;
			height: 120rpx;
			color: #505050;
			border: 1rpx solid #f4f4f4;
			background-color: white;
			border-radius: 20rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;

			.tab1_item {
				width: 50%;
				height: 80%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.tab1_item_top {
					font-size: 28rpx;
					color: #FFBB43;
					font-weight: bold;
					margin-left: 50rpx;
				}

				.tab1_item_bot {
					font-size: 30rpx;
					width: 100%;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;

					image {
						height: 35rpx;
						width: 35rpx;
						margin-right: 15rpx;
					}
				}
			}

			.rig_bor {
				width: 1rpx;
				height: 50rpx;
				background-color: #d4d4d4;
			}
		}

		.mar-top {
			margin-bottom: 50rpx;
		}

		.my_tabs {
			padding: 25rpx 0 25rpx 0;
			width: 700rpx;
			color: #505050;
			border-radius: 20rpx;
			background-color: white;
			margin-top: 30rpx;
			display: flex;
			flex-direction: column;
			align-items: center;

			.tabs_top {
				width: 650rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;

				.tabs_top_lef {
					font-size: 35rpx;
					color: #353535;
				}

				.tabs_top_rig {
					font-size: 27rpx;
					color: #878787;
				}
			}

			.tabs_bot {
				width: 700rpx;
				margin-top: 30rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;

				.tabs_item {
					width: 20%;
					display: flex;
					flex-direction: column;
					align-items: center;

					image {
						height: 70rpx;
						width: 70rpx;
					}

					text {
						font-size: 27rpx;
						margin-top: 15rpx;
					}
				}
			}

			.tabs_bot2 {
				width: 100%;
				margin-top: 30rpx;
				display: flex;
				flex-direction: column;

				.tabs2_item {
					height: 100rpx;
					width: 100%;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;
					color: #6d6d6d;
					font-size: 31rpx;

					.tabs2_item_lef {
						display: flex;
						flex-direction: row;
						align-items: center;

						image {
							height: 50rpx;
							width: 50rpx;
							margin-right: 20rpx;
							margin-left: 20rpx;
						}
					}

					button::after {
						border: none
					}

					.ke_css_btn {
						width: 100%;
						height: 100%;
						color: #6d6d6d;
						font-size: 31rpx;
						background-color: white;
						border: none;
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: flex-start;

						image {
							height: 50rpx;
							width: 50rpx;
							margin-right: 20rpx;
							margin-left: -7rpx;
						}
					}
				}
			}
		}


	}
</style>
