<template>
	<view class="warp">
		<view class="top_search">
			<uni-search-bar style="width:100%" v-model="searchValue" placeholder="订单号/商品名/收货人姓名/联系电话" radius="30"
				clearButton="none" cancelButton="none" />
		</view>
		<view class="top_search_time">
			<view class="lef_time_lef">下单时间</view>
			<view class="lef_time_rig">
				<uni-datetime-picker style="width: 650rpx" v-model="searchTime" type="daterange" rangeSeparator="至" />
			</view>
		</view>
		<view class="bot_goods">
			<scroll-view v-if="orders.length > 0" class="cen_goods" scroll-y scroll-top="0" scroll-anchoring
				@scrolltolower='upLoading' @refresherrefresh='downLoading'>
				<view v-for="(item,index) in orders" :key="index" class="orders_item">
					<view class="item_title">
						<view class="item_title_item">订单号：{{item.orderId}} </view>
						<view class="item_title_item" v-if="item.status==3">订单状态：已取消 </view>
						<view class="item_title_item" v-else-if="item.status==1 && item.payStatus==1">订单状态：代付款
						</view>
						<view class="item_title_item"
							v-else-if="item.status==1 && item.payStatus!=1 && item.shipStatus==1">
							订单状态：待发货 </view>
						<view class="item_title_item"
							v-else-if="item.status==1 && item.payStatus!=1 && item.shipStatus==2 ">订单状态：待收货 </view>
						<view class="item_title_item"
							v-else="item.status==1 && item.payStatus!=1 && item.shipStatus==2 && item.confirmStatus==2">
							订单状态：已完成 </view>
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

						<!-- 已付款 + 已发货 -->
						<view class="btn" v-if="item.payStatus!=1 && item.shipStatus==2" @tap="onLogistics(item.id)">
							查看物流
						</view>
						<!-- 已完成 -->
						<!-- <view class="btn"
								v-if="item.status===1 && item.payStatus!=1 && item.shipStatus!=1 && item.confirmStatus==2"
								@tap="onLookFp(item.id)">查看发票</view> -->
						<!-- 已完成+未评价 -->
						<view class="btn" v-if="item.confirmStatus==2 && !item.isComment" @tap="onEvaluate(item.id)">
							评价晒单
						</view>
						<!-- 待支付 未取消-->
						<view class="btn" v-if="item.payStatus==1 && item.status==1" @tap="onCancelOrder(item.orderId)">
							取消订单
						</view>
						<view class="btn color1" v-if="item.payStatus==1 && item.status!=3" @tap="onPay(item)">立刻支付
						</view>
						<!-- 已支付 -->
						<view class="btn color1" v-if="item.payStatus!=1" @tap="goGoodDetail(item.id)">再次购买</view>
					</view>
				</view>
				<uni-load-more :status="loadMoreStatus"></uni-load-more>
			</scroll-view>
			<view v-else class="cen_goods">
				<view class="no_goods">
					<image src="/static/images/common/no.png"></image>
					<text>暂无相关订单</text>
				</view>
			</view>
		</view>

		<view class="bot_btn">
			<view class="search_btn" @tap="onSearch(1)">重置</view>
			<view class="search_btn color1" @tap="onSearch(2)">搜索</view>
		</view>
	</view>
</template>

<script>
	const {
		urlList,
		https
	} = require('@/static/api');
	import LoadMore from '@/components/uni-load-more/uni-load-more.vue'
	export default {
		components: {
			LoadMore
		},
		data() {
			return {
				searchValue: '',
				searchTime: '',
				orders: [],
				param: {
					page: 1,
					limit: 6,
					status: 0,
					key: '',
					startTime: '',
					endTime: ''
				},
				loadMoreStatus: 'more'
			};
		},
		onLoad() {
			this.getOrderList();
		},
		methods: {
			onSearch(num) {
				if (num == 1) {
					this.searchValue = '';
					this.searchTime = '';
				} else {
					this.param.page = 1;
					this.param.key = this.searchValue;
					this.orders=[];
					if (this.searchTime != '') {
						this.param.startTime = this.searchTime[0];
						this.param.endTime = this.searchTime[1]
					}
					this.getOrderList();
					console.log('搜索', this.searchValue, this.searchTime)
				}
			},
			getOrderList() {
				let param = this.param;
				https(urlList.getOrderList, 'post', param, '加载中').then(data => {
					this.orders = this.orders.concat(data.data.list);
					if (data.data.list.length == this.param.limit) {
						this.param.page++;
						this.loadMoreStatus = 'more';
					} else
						this.loadMoreStatus = 'noMore';
				});
			},
			goGoodDetail(id) {
				uni.navigateTo({
					url: '/pages/goodDetail/goodDetail?id=' + id
				})
			},
			onLookFp(id) {
				uni.navigateTo({
					url: '/pages/orders-fp/orders-fp?id=' + id
				})
			},
			// 上拉加载
			upLoading() {
				console.log('上拉加载')
				if (this.loadMoreStatus === 'more') {
					this.loadMoreStatus = 'loading';
					this.getOrderList();
				}
			},
			// 下拉刷新
			downLoading() {},
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
			background-color: white;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
		}

		.top_search_time {
			width: 100%;
			height: 160rpx;
			background-color: white;
			display: flex;
			flex-direction: column;
			align-items: center;

			.lef_time_lef {
				width: 700rpx;
				margin-top: 20rpx;
				display: flex;
				font-size: 29rpx;
				color: #464646;
			}

			.lef_time_rig {
				width: 700rpx;
				margin-top: 10rpx;
			}
		}

		.bot_goods {
			width: 720rpx;
			height: calc(100vh - 261rpx);
			padding-bottom: 100rpx;
			// // border: 1rpx solid red;
			overflow-y: auto;
			display: flex;
			flex-direction: column;

			.item_title {
				width: 100%;
				padding: 20rpx 0rpx 20rpx 0rpx;
				font-size: 29rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;

				.item_title_item {
					padding: 6rpx;
				}
			}

			.orders_item {
				margin: 20rpx auto;
				width: 680rpx;
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

		.bot_btn {
			width: 100%;
			height: 100rpx;
			position: fixed;
			bottom: 0;
			display: flex;
			flex-direction: row;
			align-items: center;
			background-color: white;

			.search_btn {
				width: 50%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.color1 {
				background-color: #FF4544;
				color: white;
			}
		}
	}
</style>
