<template>
	<view class="warp">
		<image class="top_bg" src="/static/images/integral/integral.jpg"></image>
		<view class="top_nav">
			<view class="nav_top">
				<view class="jf_text">我的积分</view>
				<view class="jf_num">0</view>
			</view>
			<view class="nav_bot">
				<view class="duihuan" @tap="goUrl(1)">
					<uni-icons type="gift" color="#ccc" size="25"></uni-icons>
					<text>我的兑换</text>
				</view>
				<view class="duihuan" @tap="goUrl(2)">
					<uni-icons type="wallet" color="#ccc" size="25"></uni-icons>
					<text>积分收支</text>
				</view>
			</view>
		</view>
		<view class="bot_goods">
			<view class="goods_nav">
				<view class="nav_item"><view></view>优惠购专区</view>
				<view class="nav_item">
					<view class="item_list">全部</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			goUrl(num){
				let url = '';
				if(num == 1){
					url = '/pages/my-exchange/my-exchange'
				}else{
					url = '/pages/integral-record/integral-record'
				}
				uni.navigateTo({
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
	background-color: #F7F7F7;
	display: flex;
	flex-direction: column;
	.top_bg{
		width: 100%;
		height: 250rpx;
	}
	.top_nav{
		width: 550rpx;
		height: 170rpx;
		margin: 0 auto;
		margin-top: -220rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.nav_top{
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			.jf_text{
				color: #ccc;
				font-size: 28rpx;
				margin-bottom: 10rpx;
			}
			.jf_num{
				font-size: 35rpx;
				color:#ECB786 ;
				font-weight: bold;
			}
		}
		.nav_bot{
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			.duihuan{
				display: flex;
				flex-direction: row;
				align-items: center;
				color:white;
				font-size: 29rpx;
				text{
					margin-left: 10rpx;
				}
			}
		}
	}
	.bot_goods{
		width: 100%;
		// border: 1rpx solid red;
		height: calc(100vh - 250rpx);
		margin-top:80rpx;
		display: flex;
		flex-direction: column;
		.goods_nav{
			width: 100%;
			height: 200rpx;
			display: flex;
			flex-direction: column;
			background-color: white;
			.nav_item{
				width: 100%;
				height: 99rpx;
				border-bottom: 1rpx solid #efefef;
				display: flex;
				flex-direction: row;
				align-items: center;
				color: #767676;
				font-size: 29rpx;
				view{
					height: 40rpx;
					width: 4rpx;
					background-color: red;
					margin-right:20rpx;
					margin-left: 30rpx;
				}
				.item_list{
					height:60rpx;
					width: 120rpx;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;
					border-radius:30rpx;
					background-color: #FF4544;
					color: white;
				}
			}
		}
	}
}
</style>
