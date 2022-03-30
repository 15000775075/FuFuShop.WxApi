<template>
	<view class="warp">
		<view class="top_name">
			<uni-icons type="contact" size="30" color="#989898" style="margin-right: 10rpx;"></uni-icons>描述相符
			<uni-rate style="margin-left: 20rpx;" v-model="value"/>
		</view>
		<view class="content">
			<textarea 
				v-model="orderContent" 
				maxlength=200 
				placeholder="宝贝满足你的期待吗？说说你的使用心得,分享给想买的他们吧"
			/>
		</view>
		<view class="btn">发布</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value:0,
				orderContent:'',
			};
		}
	}
</script>

<style lang="scss" scoped>
.warp{
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	.top_name{
		width: 90%;
		height: 100rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 29rpx;
		color: #747474;
	}
	.content{
		width: 100%;
		height: 500rpx;
		position: relative;
		box-sizing: border-box;
		padding: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		textarea{
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			padding: 20rpx;
			background:#F5F5F5;
			// border: 1rpx solid #dadadaff;
			border-radius: 16rpx;
			font-size: 28rpx;
		}
	}
	.btn{
		width: 90%;
		height:70rpx;
		background-color: #2979FF;
		border-radius: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 50rpx;
		color: white;
		font-size: 29rpx;
	}
}
</style>
