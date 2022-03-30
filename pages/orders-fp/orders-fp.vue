<template>
	<view class="warp">
		<image v-if="fpUrl" :src="fpUrl"></image>
		<view v-else class="noFp">
			暂无发票
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fpUrl:''
			};
		},
		onLoad(options) {
			console.log('查看发票的订单ID-',options.id)
		}
	}
</script>

<style lang="scss" scoped>
.warp{
	width: 100%;
	image{
		width: 100%;
		height: auto;
	}
	.noFp{
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-top: 50rpx;
		font-size: 29rpx;
		color: #828282;
	}
}
</style>
