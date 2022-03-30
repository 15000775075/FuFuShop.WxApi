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
			<view class="coupon-item" v-for="(item,index) in coupon" :key="index">
				<view class="coupon-money">
					<view class="nick">{{item.seller_name}}使用</view>
					<view class="layof">￥{{item.money}}</view>
					<view class="end_time">{{item.end_time}}前使用</view>
					<view class="demand">{{item.title}}</view>
				</view>
				<block v-if="tabIndex !=0">
					<view class="get-btn color1">立即使用</view>
					<view class="noActive">{{tabIndex == 1?'已使用':'已过期'}}</view>
				</block>
				<block v-else>
					<view class="get-btn color" @tap="goIndex('/pages/index/index')">立即使用</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				topNavList:['未使用','已使用','已过期'],
				tabIndex:0,
				coupon:[{
						money: "150",
						title: "满2000减150元",
						ticket: "YMC_5c929fbf47235",
						seller_name: "百达翡丽官方旗舰店百达翡丽官方旗舰店",
						end_time: "2019-04-20 01:51:20",
						state: "1"
					},
					{
						money: "50",
						title: "满1000减50元",
						ticket: "YMC_5c929fbf47235",
						seller_name: "百达翡丽官方旗舰店",
						end_time: "2019-04-20 01:51:20",
						state: "1"
					},
				]
			};
		},
		methods:{
			onTopTabs(index){
				this.tabIndex = index;
			},
			goIndex(url){
				uni.switchTab({
					url
				})
			}
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
	.bot_list{
		width: 700rpx;
		height: calc(100vh - 101rpx);
		// border: 1rpx solid red;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow-y: auto;
		.coupon-item {
			width:100%; 
			height:auto; 
			border-radius:10rpx; 
			margin-top:22rpx; 
			background-color: white;
			border:1px solid #eee; 
			position:relative;
			.coupon-money {
				width:480rpx; 
				display: flex;
				flex-direction: column;
				align-items: center;
				padding:26rpx 0; 
				border:1px solid red; 	
				border-color:#eeeeee;
				.nick { 
					width:90%; 
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					height:50rpx; 
					line-height:30rpx; 
					font-size:24rpx; 
					color:#999999; 
					// margin-left: 20rpx;
				}
				.layof { 
					width:90%; 
					height:48rpx; 
					// border: 1rpx solid red;
					line-height:30rpx; 
					font-size:44rpx; 
					color:#FF4544; 
					font-weight:bold; 
				}
				.end_time { 
					width:90%; 
					height:40upx; 
					line-height:30upx; 
					font-size:24upx; 
					color:#999999; 
				}
				.demand { 
					width:90%; 
					height:30upx; 
					line-height:30upx; 
					font-size:24upx; 
					color:#999999; 
				}
			}
			.get-btn { 
				width:146rpx; 
				height:52rpx; 
				line-height:50rpx; 
				position:absolute; 
				top:50%; 
				right:26rpx; 
				margin-top:-26rpx; 
				text-align:center; 
				border-radius:60rpx; 
				font-size:24rpx; 
				float:right; 
			}
			.noActive{
				padding: 6rpx 15rpx;
				border: 4rpx solid #FF4544;
				color: #FF4544;
				border-radius: 5rpx;
				position: absolute;
				top: 80rpx;
				left: 300rpx;
				transform:rotate(13deg);
			}
			.color1{
				color:#919191;
				border:1px solid #919191; 
			}
			.color{
				color:#FF4544;
				border:1px solid #FF4544; 
			}
		}
		.coupon-item:after { 
			width:40rpx; 
			height:20rpx; 
			position:absolute; 
			left:460rpx; 
			top:-1px; 
			border-radius:0 0 40rpx 40rpx; 
			content:""; 
			display:block; 
			background:#F7F7F7; 
			border:1px solid #eeeeee; 
			border-top:0px; 
		}
		.coupon-item:before {
			width:40rpx; 
			height:20rpx; 
			position:absolute; 
			left:460rpx; 
			bottom:-1px; 
			border-radius:40rpx 40rpx 0 0; 
			content:""; 
			display:block; 
			background:#F7F7F7; 
			border:1px solid #eeeeee; 
			border-bottom:0px; 
		}
	}
}
</style>
