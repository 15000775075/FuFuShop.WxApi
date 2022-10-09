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
		<scroll-view v-if="orders.length > 0" class="cen_goods" scroll-y scroll-top="0" refresher-enabled
			scroll-anchoring @scrolltolower='upLoading' @refresherrefresh='downLoading'>
			<view v-for="(item,index) in orders" :key="index" class="orders_item">
				<view class="item_title"  @tap="goOrderDetail(item.orderId)">
					<view class="item_title_item">订单号：{{item.orderId}} </view>
					<view class="item_title_item" v-if="item.status==3">订单状态：已取消 </view>
					<view class="item_title_item" v-else-if="item.status==1 && item.payStatus==1">订单状态：代付款 </view>
					<view class="item_title_item" v-else-if="item.status==1 && item.payStatus!=1 && item.shipStatus==1">
						订单状态：待发货 </view>
					<view class="item_title_item"
						v-else-if="item.status==1 && item.payStatus!=1 && item.shipStatus==2 ">订单状态：待收货 </view>
					<view class="item_title_item"
						v-else="item.status==1 && item.payStatus!=1 && item.shipStatus==2 && item.confirmStatus==2">
						订单状态：已完成 </view>
				</view>
				<view class="item_good" v-for="(product,index) in item.items" @tap="goOrderDetail(item.orderId)">
					<image :src="product.imageUrl" @tap="goGoodDetail(item.id)"></image>
					<view class="good_rig">
						<view class="good_rig_name">{{product.name}}</view>
						<view class="good_rig_category">{{product.addon}}</view>
					</view>
				</view>
				<view class="item_price" @tap="goOrderDetail(item.orderId)">
					<view v-if="item.status===1 && item.payStatus===1">共{{item.items.length}} 件商品
						待付款：￥{{item.goodsAmount}}</view>
					<view v-else>共{{item.items.length}} 件商品 实付款：￥{{item.payedAmount}}</view>
				</view>
				<view class="item_price">

					<!-- 已付款 + 已发货 -->
					<view class="btn" v-if="item.payStatus!=1 && item.shipStatus==2" @tap="onLogistics(item.orderId)">
						查看物流
					</view>
					<view class="btn color1" v-if="item.payStatus!=1 && item.shipStatus==3 && item.confirmStatus!=2"
						@tap="onConfirm(item.orderId)">确认收货
					</view>
					<!-- 已完成 -->
					<!-- <view class="btn"
						v-if="item.status===1 && item.payStatus!=1 && item.shipStatus!=1 && item.confirmStatus==2"
						@tap="onLookFp(item.id)">查看发票</view> -->
					<!-- 已完成+未评价 -->
					<view class="btn" v-if="item.confirmStatus==2 && !item.isComment" @tap="onEvaluate(item.orderId)">
						评价晒单
					</view>
					<!-- 待支付 未取消-->
					<view class="btn" v-if="item.payStatus==1 && item.status==1" @tap="onCancelOrder(item.orderId)">取消订单
					</view>
					<view class="btn color1" v-if="item.payStatus==1 && item.status!=3" @tap="onPay(item)">立刻支付</view>
					<!-- 已支付 -->
					<view class="btn color1" v-if="item.payStatus!=1" @tap="goNowBuy(item)">再次购买</view>
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
				topNavList: ['全部', '待付款', '待发货', '待收货', '已完成'],
				tabIndex: 0,
				orders: [],
				param: {
					page: 1,
					limit: 3,
					status: 0,
					key: '',
					startTime: '',
					endTime: ''
				},
				loadMoreStatus: 'more'
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
				https(urlList.getOrderList, 'post', param, '加载中').then(data => {
					this.orders = this.orders.concat(data.data.list);
					if (data.data.list.length == this.param.limit) {
						this.param.page++;
						this.loadMoreStatus = 'more';
					} else
						this.loadMoreStatus = 'noMore';
				});
			},
			onTopTabs(index) {
				this.tabIndex = index;
				this.param.page = 1;
				this.loadMoreStatus = 'more';
				this.orders = [];
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
						
						uni.callPay();
							// uni.showToast({
							// 	title: "支付成功",
							// })
					}
				})
			},
			onCancelOrder(id) {
				console.log(id)
				let param = {
					"id": id,
					"data": ""
				};
				uni.showModal({
					title: "确定不买了吗？",
					success: (res) => {
						if (res.confirm)
							https(urlList.cancelOrder, 'post', param, '操作中').then(data => {
								this.downLoading();
							});
					}
				})

			},
			onConfirm(id) {
				console.log(id)
				let param = {
					"id": id,
					"data": 0
				};
				uni.showModal({
					title: "确定收到商品了吗？",
					success: (res) => {
						if (res.confirm)
							https(urlList.orderConfirm, 'post', param, '操作中').then(data => {
								this.downLoading();
							});
					}
				})

			},
			onLogistics(id) {
				uni.navigateTo({
					url: '/pages/orders-wl/orders-wl?id=' + id
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
			downLoading() {
				this.onTopTabs(this.tabIndex);
			},
			goOrderDetail(orderId) {
				uni.navigateTo({
					url: "/pages/orderDetail/orderDetail?id=" + orderId
				})
			},
			goNowBuy(order) {
				let ids = [];
				order.items.forEach((goods, index) => {
					let param = {
						"nums": goods.nums,
						"productId": goods.productId,
						"type": 1,
						"cartType": 1,
					}
					https(urlList.addCart, 'POST', param, '添加到购物车').then(data => {
						ids.push(data.data)
						if (ids.length === order.items.length) {
							uni.navigateTo({
								url: '/pages/nowBuy/nowBuy?id=' + JSON.stringify(ids)
							})
						}
					})
				});
			},
			callPay: function(response) {
				if (typeof WeixinJSBridge === "undefined") {
					if (document.addEventListener) {
						document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady(response), false);
					} else if (document.attachEvent) {
						document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady(response));
						document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady(response));
					}
				} else {
					this.onBridgeReady(response);
				}
			},
			onBridgeReady: function(response) {
				let that = this;
				if (!response.package) {
					return;
				}
				WeixinJSBridge.invoke(
					'getBrandWCPayRequest', {
						"appId": response.appid, //公众号名称，由商户传入
						"timeStamp": response.timestamp, //时间戳，自1970年以来的秒数
						"nonceStr": response.noncestr, //随机串
						"package": response.package,
						"signType": response.signType, //微信签名方式：
						"paySign": response.sign //微信签名
					},
					function(res) {
						if (res.err_msg === "get_brand_wcpay_request:ok") {
							// 使用以上方式判断前端返回,微信团队郑重提示：
							//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
							uni.showLoading({
								title: '支付成功'
							});
							setTimeout(function() {
								uni.hideLoading();
								uni.redirectTo({
									url: '../member/orderdetail?id=' + that.id
								});
							}, 1000);
						} else {
							uni.hideLoading();
						}
						WeixinJSBridge.log(response.err_msg);
					}
				);
			},
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
				// width: 90%;
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
					justify-content: space-between;

					.item_title_item {
						padding: 6rpx;
					}
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
