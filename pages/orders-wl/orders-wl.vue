<template>
	<view class="warp">
		<image v-if="fpUrl" :src="fpUrl"></image>
		<view v-else class="noFp">
			暂无物流信息
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
				fpUrl: '',
				Logistics:{}
			};
		},
		onLoad(options) {
			console.log('查看发票的订单ID-', options.id)
			if (options.id != '' && options.id !== undefined)
				this.getLogistics(options.id);
		},
		methods: {
			getLogistics(id) {
				let param = {
					"code": id,
					"no": id,
					"mobile": ""
				};
				https(urlList.logisticsByApi, 'post', param, '更新订单').then(data => {
					this.Logistics = data.data.list
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.warp {
		width: 100%;

		image {
			width: 100%;
			height: auto;
		}

		.noFp {
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
