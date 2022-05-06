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
		<view class="bot_list">
			
			<block v-for="(item,index) in goodList" :key="index">
				<view class="good_time">{{item.time}}</view>
				<view class="good_content">
					<block v-for="(val,ind) in goodList" :key="ind">
						<view class="goods_list" @tap="goodDetail(item.goodsId)">
							<image class="image_good" :src="val.goodImage"></image>
							<view class="good_name">{{val.goodsName}}</view>
							<view class="good_price">
								<view>￥{{val.price}}</view>
								<view class="rig_cart" @tap.stop="onGoodNav(val.id)">···</view>
							</view>
						</view>
					</block>
					
				</view>
			</block>
		</view>
		<uni-popup ref="popup" type="share" background-color="#fff">
			<view class="popup_css">
				<view class="popup_top">
					<view class="fx_item" @tap="onCollection">
						<view class="fx_img">
							<uni-icons type="heart" size="29"></uni-icons>
						</view>
						<view class="fx_name">收藏</view>
					</view>
					<view class="fx_item" style="margin-left:30rpx;" @tap="onClear">
						<view class="fx_img">
							<uni-icons type="trash" size="29"></uni-icons>
						</view>
						<view class="fx_name">删除</view>
					</view>
				</view>
				<view class="popup_bot" @tap="closeFenx">取消</view>
			</view>
		</uni-popup>
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
				topNavList:['今日','昨日','近七日','近三十日','全部'],
				tabIndex:0,
				goodList:[
					{
						time:'2021-01-25',
						goods:[
							{
								id:111,
								name:'jk制服裙正版夏季短袖衬衫格裙套装女学生学院风格全套百搭百褶裙',
								img:'/static/images/index/good.jpg',
								price:'215.26',
								kc:100,
								buy_num:1,
								category:[
									{id:1001,text:'27黑色'},
									{id:1002,text:'28黑色'},
									{id:1003,text:'29黑色'},
									{id:1003,text:'25黑色'},
								]
							},
							{
								id:111,
								name:'jk制服裙正版夏季短袖衬衫格裙套装女学生学院风格全套百搭百褶裙',
								img:'/static/images/index/good.jpg',
								price:'215.26',
								kc:10,
								buy_num:1,
								category:[
									{id:1001,text:'27黑色 （9956款）'},
									{id:1002,text:'28黑色 （9956款）'},
									{id:1003,text:'29黑色 （9956款）'},
									{id:1003,text:'25黑色 （9956款）'},
								]
							},
						],
					},
					{
						time:'2021-01-26',
						goods:[
							{
								id:111,
								name:'jk制服裙正版夏季短袖衬衫格裙套装女学生学院风格全套百搭百褶裙',
								img:'/static/images/index/good.jpg',
								price:'215.26',
								kc:100,
								buy_num:1,
								category:[
									{id:1001,text:'27黑色'},
									{id:1002,text:'28黑色'},
									{id:1003,text:'29黑色'},
									{id:1003,text:'25黑色'},
								]
							},
							{
								id:111,
								name:'jk制服裙正版夏季短袖衬衫格裙套装女学生学院风格全套百搭百褶裙',
								img:'/static/images/index/good.jpg',
								price:'215.26',
								kc:10,
								buy_num:1,
								category:[
									{id:1001,text:'27黑色 （9956款）'},
									{id:1002,text:'28黑色 （9956款）'},
									{id:1003,text:'29黑色 （9956款）'},
									{id:1003,text:'25黑色 （9956款）'},
								]
							},
							{
								id:111,
								name:'jk制服裙正版夏季短袖衬衫格裙套装女学生学院风格全套百搭百褶裙',
								img:'/static/images/index/good.jpg',
								price:'215.26',
								kc:10,
								buy_num:1,
								category:[
									{id:1001,text:'27黑色 （9956款）'},
									{id:1002,text:'28黑色 （9956款）'},
									{id:1003,text:'29黑色 （9956款）'},
									{id:1003,text:'25黑色 （9956款）'},
								]
							},
							{
								id:111,
								name:'jk制服裙正版夏季短袖衬衫格裙套装女学生学院风格全套百搭百褶裙',
								img:'/static/images/index/good.jpg',
								price:'215.26',
								kc:10,
								buy_num:1,
								category:[
									{id:1001,text:'27黑色 （9956款）'},
									{id:1002,text:'28黑色 （9956款）'},
									{id:1003,text:'29黑色 （9956款）'},
									{id:1003,text:'25黑色 （9956款）'},
								]
							},
						],
					},
				],
				param: {
					page: 1,
					limit: 10,
					order: "id",
					where: "",
					otherData:JSON.stringify({startTime:"2022-05-05",endTime:"2022-05-08"}),
					id:0
				}
			};
		},
		onLoad() {
			this.getGoodsbrowsing();
		},
		methods:{
			onTopTabs(index){
				this.tabIndex = index;
			},
			getGoodsbrowsing() {
				let param = this.param;
				https(urlList.getGoodsbrowsing, 'post', param, '更新足迹').then(data => {
					this.goodList = data.data.list
				});
			},
			goodDetail(id){
				uni.navigateTo({
					url:'/pages/goodDetail/goodDetail?id=' + id
				})
			},
			onGoodNav(id){
				console.log('功能',id)
				this.$refs.popup.open()
			},
			closeFenx(){
				this.$refs.popup.close()
			},
			onCollection(){
				console.log('收藏')
			},
			onClear(){
				console.log('删除')
			}
		}
	}
</script>

<style lang="scss" scoped>
.warp{
	width: 100%;
	height: 100vh;
	background-color: #F7F7F7;
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
				width: 18%;
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
	.bot_list{
		width: 750rpx;
		height: calc(100vh - 100rpx);
		overflow-y: auto;
		// border: 1rpx solid red;
		.good_time{
			height: 80rpx;
			// padding-left: 20rpx;
			width: 94%;
			margin: 0 auto;
			display: flex;
			align-items: center;
			font-size: 27rpx;
			color: #545454;
		}
		.good_content{
			width: 100%;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			.goods_list{
				width:216.67rpx;
				background-color: white;
				border-radius:7rpx;
				overflow: hidden;
				padding: 0 0 20rpx 0;
				margin-left: 25rpx;
				margin-bottom: 50rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				.image_good{
					width: 100%;
					height: 220rpx;
					// border-top-right-radius:20rpx;
				}
				.good_name{
					width: 95%;
					font-size: 26rpx;
					margin-top: 10rpx;
					color: #555555;
					display: -webkit-box;
					overflow: hidden;
					text-overflow: ellipsis;
					word-wrap: break-word;
					white-space: normal !important;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
				.good_price{
					width: 90%;
					margin: 0 auto;
					color: red;
					margin-top: 10rpx;
					font-size: 28rpx;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;
					.rig_cart{
						color: #8d8d8d;
						font-size: 30rpx;
						font-weight: bold;
					}
				}
			}
		}
	}
	.popup_css{
		width: 100%;
		display: flex;
		flex-direction: column;
		.popup_top{
			width: 100%;
			height: 300rpx;
			background-color:#F2F2F2 ;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			.fx_item{
				height: 200rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				.fx_img{
					height: 100rpx;
					width: 100rpx;
					border-radius:10rpx;
					display: flex;
					align-items: center;justify-content: center;
					background-color: white;
					image{
						height: 70rpx;
						width: 70rpx;
					}
				}
				.fx_name{
					font-size: 29rpx;
					margin-top: 20rpx;
				}
			}
		}
		.popup_bot{
			width: 100%;
			height: 100rpx;
			background-color: white;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	

}
</style>
