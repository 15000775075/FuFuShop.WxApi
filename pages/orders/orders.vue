<template>
	<view class="warp">
		<view class="top_search">
			<view class="search" @tap="goSearch">
				<icon type="search" size="16" style="margin-right: 10rpx;" /> 搜索商品名称
			</view>
		</view>
		<view class="top_list">
			<view class="top_tab">
				<view class="tab_list" v-for="(item,index) in topNavList" :key="index" @tap="onTopTabs(index)">
					<view class="tab_item" :class="tabIndex==index?'active':''">{{item}}</view>
				</view>
			</view>
		</view>
		<view v-if="orders.length > 0" class="cen_goods">
			<view v-for="(item,index) in orders" :key="index" class="orders_item">
				<view class="item_title">
					<view>订单号：{{item.orderId}} </view>
				</view>
				<view class="item_good" v-for="(product,index) in item.items">
					<image :src="product.imageUrl" @tap="goGoodDetail(item.id)"></image>
					<view class="good_rig">
						<view class="good_rig_name">{{product.name}}</view>
						<view class="good_rig_category">{{product.addon}}</view>
					</view>
				</view>
				<view class="item_price">
					<view v-if="item.status===1 && item.payStatus===1">共{{item.items.length}} 件商品
						待付款：￥{{item.goodsAmount}}</view>
					<view v-else>共{{item.items.length}} 件商品 实付款：￥{{item.payedAmount}}</view>
				</view>
				<view class="item_price">

					<!-- 待发货 -->
					<!-- 待收货 -->
					<view class="btn" v-if="item.status===1 && item.payStatus!=1 && item.shipStatus!=1"
						@tap="onEvaluate(item.id)">查看物流</view>
					<!-- 已完成 -->
					<view class="btn"
						v-if="item.status===1 && item.payStatus!=1 && item.shipStatus!=1 && item.confirmStatus!=1"
						@tap="onLookFp(item.id)">查看发票</view>
					<view class="btn"
						v-if="item.status===1 && item.payStatus!=1 && item.shipStatus!=1 && item.confirmStatus!=1"
						@tap="onEvaluate(item.id)">评价晒单</view>
					<!-- 待支付 -->
					<view class="btn" v-if="item.status===1 && item.payStatus===1" @tap="onEvaluate(item.id)">取消订单
					</view>
					<view class="btn color1" v-if="item.status===1 && item.payStatus===1" @tap="onPay(item)">立刻支付</view>

					<view class="btn color1" v-if="item.payStatus!=1" @tap="goGoodDetail(item.id)">再次购买</view>
				</view>
			</view>
		</view>
		<view v-else class="cen_goods">
			<view class="no_goods">
				<image src="/static/images/common/no.png"></image>
				<text>暂无相关订单</text>
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
				topNavList: ['全部', '待付款', '待发货', '待收货', '已完成'],
				tabIndex: 0,
				orders: [],
				param: {
					page: 1,
					limit: 10,
					status: 0,
				}
			};
		},
		onLoad(options) {
			this.tabIndex = options.tabIndex;
			this.param.status = this.tabIndex;
			this.getOrderList();
		},
		methods: {
			getOrderList() {
				let param = this.param;
				https(urlList.getOrderList, 'post', param, '更新订单').then(data => {
					this.orders = data.data.list
				});
			},
			onTopTabs(index) {
				this.tabIndex = index;
				this.param.status = this.tabIndex === 0 ? -1 : this.tabIndex;
				this.getOrderList();
			},
			goSearch() {
				uni.navigateTo({
					url: '/pages/order-search/order-search'
				})
			},
			goGoodDetail(id) {
				uni.navigateTo({
					url: '/pages/goodDetail/goodDetail?id=' + id
				})
			},
			onEvaluate(id) {
				uni.navigateTo({
					url: '/pages/evaluate/evaluate?id=' + id
				})
			},
			onLookFp(id) {
				uni.navigateTo({
					url: '/pages/orders-fp/orders-fp?id=' + id
				})
			},
			onPay(item) {
				uni.showModal({
					title: "确认支付" + item.goodsAmount + "￥",
					success: (res) => {
						if (!res.confirm)
							uni.showToast({
								title: "取消支付",
								icon: "error"
							})
						else
							uni.showToast({
								title: "支付成功",
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
		height: 100vh;
		background-color: #F7F7F7;
		display: flex;
		flex-direction: column;
		align-items: center;

		.top_search {
			width: 100%;
			height: 100rpx;
			background-color: #F2F2F2;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;

			.search {
				width: 700rpx;
				height: 70rpx;
				color: #a5a5a5;
				background-color: white;
				border: 1rpx solid #f5f5f5;
				border-radius: 10rpx;
				font-size: 26rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
			}
		}

		.top_list {
			width: 100%;
			background-color: white;
			position: sticky;
			top: 0;
			display: flex;
			flex-direction: column;

			.top_tab {
				width: 100%;
				height: 100rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;

				.tab_list {
					width: 18%;
					height: 100%;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;
					font-size: 29rpx;

					.tab_item {
						height: 60rpx;
						width: 100%;
						border-radius: 35rpx;
						font-family: PingFangSC-Ultralight, ans-serif;
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: center;
					}

					.active {
						color: white;
						background-color: #FF4544;
					}
				}
			}
		}

		.cen_goods {
			width: 100%;
			height: calc(100vh - 201rpx);
			overflow-y: auto;
			display: flex;
			flex-direction: column;
			align-items: center;

			// border: 1rpx solid red;
			.orders_item {
				margin-top: 20rpx;
				margin-bottom: 20rpx;
				width: 660rpx;
				background-color: white;
				border-radius: 10rpx;
				padding: 20rpx 20rpx 0rpx 20rpx;
				display: flex;
				flex-direction: column;

				.item_good {
					width: 100%;
					height: 200rpx;
					background-color: #F8F8F8;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;

					image {
						height: 150rpx;
						width: 150rpx;
					}

					.good_rig_name {
						width: 480rpx;
						font-size: 26rpx;
						color: #555555;
						display: -webkit-box;
						overflow: hidden;
						text-overflow: ellipsis;
						word-wrap: break-word;
						white-space: normal !important;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}

					.good_rig_category {
						width: 480rpx;
						font-size: 26rpx;
						color: #555555;
						display: -webkit-box;
						overflow: hidden;
						text-overflow: ellipsis;
						word-wrap: break-word;
					}
				}

				.item_price {
					width: 100%;
					padding: 20rpx 0rpx 20rpx 0rpx;
					font-size: 29rpx;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: flex-end;
				}

				.item_title {
					width: 100%;
					padding: 20rpx 0rpx 20rpx 0rpx;
					font-size: 29rpx;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: flex-start;
				}

				.btn {
					height: 50rpx;
					width: 160rpx;
					background-color: #F8F8F8;
					font-size: 26rpx;
					border-radius: 30rpx;
					display: flex;
					color: #474747;
					align-items: center;
					justify-content: center;
					border: 1rpx solid #DCDCDC;
					margin-right: 20rpx;
				}

				.color1 {
					border: 1rpx solid red;
					color: red;
				}
			}

			.no_goods {
				display: flex;
				flex-direction: column;
				align-items: center;
				margin: 0 auto;
				font-size: 30rpx;
				color: #9d9d9d;

				image {
					width: 400rpx;
					height: 400rpx;
					margin-bottom: 10rpx;
				}
			}
		}
	}
</style>
