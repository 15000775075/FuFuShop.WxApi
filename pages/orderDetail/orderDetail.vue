<template>
	<view class="warp">
		<view class="cen_goods">
			<!-- <view class="yhq">
				<view class="yhq_lef">收货地址</view>
				<view class="yhq_rig">{{order.shipAreaName}} {{order.shipAddress}}</view>
			</view> -->
			<view class="top_address">
				<block v-if="tabIndex == 1">
					<view class="input_css">{{order.shipName}} </view>
					<view class="input_css">{{order.shipMobile}} </view>
				</block>
				<block v-else>
					<view class="select_address">
						<view class="name-tel">
							<view class="">收货人：{{order.shipName}}</view>
							<view class="">电话：{{order.shipMobile}}</view>
						</view>
						<view class="address-box">
							收货地址：{{order.shipAreaName}}{{order.shipAddress}}
						</view>
					</view>
				</block>
			</view>
			<view class="goods_top">
				<view class="top_top">
					<uni-icons type="shop-filled" color="#545454" size="24"></uni-icons> 商品列表
				</view>
			</view>
			<view class="goods" v-for="(item,index) in order.items" :key="index" @tap="goGoodDetail(item.goodsId)">
				<image class="img_css" :src="item.imageUrl"></image>
				<view class="goods_rig">
					<view class="rig_name">{{item.name}}</view>
					<view class="rig_type">{{item.addon}}</view>
					<view class="rig_bot">
						<view class="bot_num">x {{item.nums}}</view>
						<view class="bot_price">￥{{item.amount}}</view>
					</view>
				</view>
			</view>
			<!-- 	<view class="yhq" @tap="openYhq">
				<view class="yhq_lef">
					<image src="/static/images/common/hui.png"></image> 优惠券
				</view>
				<view class="yhq_rig">{{selectYhqName}}
					<uni-icons type="right" size="22" color="#7d7d7d"></uni-icons>
				</view>
			</view> -->
			<view class="goods_top">
				<view class="top_top">
					<uni-icons type="shop-filled" color="#545454" size="24"></uni-icons> 订单详情
				</view>
			</view>
			<view class="yhq">
				<view class="yhq_lef">订单号</view>
				<view class="yhq_rig">{{order.orderId}} </view>
			</view>

			<view class="yhq">
				<view class="yhq_lef">订单状态</view>
				<view class="yhq_rig" v-if="order.status==3">已取消 </view>
				<view class="yhq_rig" v-else-if="order.status==1 && order.payStatus==1">代付款 </view>
				<view class="yhq_rig" v-else-if="order.status==1 && order.payStatus!=1 && order.shipStatus==1">
					待发货 </view>
				<view class="yhq_rig" v-else-if="order.status==1 && order.payStatus!=1 && order.shipStatus==2 ">待收货
				</view>
				<view class="yhq_rig"
					v-else="order.status==1 && order.payStatus!=1 && order.shipStatus==2 && order.confirmStatus==2">
					已完成 </view>
			</view>
			<view class="yhq">
				<view class="yhq_lef">配送方式</view>
				<view class="yhq_rig">{{order.storeId===0?'门店自提':'物流快递'}}</view>
			</view>
			<view class="yhq">
				<view class="yhq_lef">运费</view>
				<view class="yhq_rig">￥{{0}}</view>
			</view>
			<view class="yhq">
				<view class="yhq_lef">备注</view>
				<view class="yhq_rig">{{order.memo}}</view>
			</view>
			<view class="total_price">
				<view class="color1">共 {{order.items.length}} 件</view>
				<view class="color2">总价 ：</view>
				<view class="color3">￥{{order.goodsAmount}}</view>
			</view>
		</view>
		<view style="height: 140rpx;width: 100%;"></view>
		<view class="bot_btn">
			<view class="item_price">

				<!-- 已付款 + 已发货 -->
				<view class="btn" v-if="order.payStatus!=1 && order.shipStatus==2" @tap="onLogistics(order.orderId)">
					查看物流
				</view>
				<view class="btn color1" v-if="order.payStatus!=1 && order.shipStatus==2 && order.confirmStatus!=2"
					@tap="onConfirm(order.orderId)">确认收货
				</view>
				<!-- 已完成 -->
				<!-- <view class="btn"
					v-if="item.status===1 && item.payStatus!=1 && item.shipStatus!=1 && item.confirmStatus==2"
					@tap="onLookFp(item.id)">查看发票</view> -->
				<!-- 已完成+未评价 -->
				<view class="btn" v-if="order.confirmStatus==2 && !order.isComment" @tap="onEvaluate(order.orderId)">
					评价晒单
				</view>
				<!-- 待支付 未取消-->
				<view class="btn" v-if="order.payStatus==1 && order.status==1" @tap="onCancelOrder(order.orderId)">取消订单
				</view>
				<view class="btn color1" v-if="order.payStatus==1 && order.status!=3" @tap="onPay(order)">立刻支付</view>
				<!-- 已支付 -->
				<view class="btn color1" v-if="order.payStatus!=1" @tap="goNowBuy">再次购买</view>
			</view>
		</view>
		<!-- <uni-popup ref="yhq" type="bottom">
			<view class="select_yhq">
				<view class="top_nav">
					<view class="top_name">
						<text>优惠券</text>
						<uni-icons @tap="closeYhq" type="closeempty" size="27" color="#636363"></uni-icons>
					</view>
					<view class="car_bot">
						<view class="tab_list" v-for="(item,index) in yhqList" :key="index" @tap="onYhq(index)">
							<view class="tab_item" :class="yhqIndex==index?'active':''">{{item}}</view>
						</view>
					</view>
				</view>
				<view class="bot_list">
					<block v-if="yhqData.length > 0">
						<view class="coupon-item" v-for="(item,index) in yhqData" :key="index">
							<view class="coupon-money">
								<view class="layof">￥{{item.price}}</view>
								<view class="demand">{{item.end_time}} 前使用</view>
							</view>
							<block v-if="yhqIndex == 0">
								<view class="get-btn" @tap="changeYhq(item)">选择使用</view>
							</block>
							<block v-else>
								<view class="get-btn">不可用</view>
							</block>
						</view>
					</block>
					<block v-else>
						<view class="no_goods">
							<image src="/static/images/common/no.png"></image>
							<text>暂无优惠券</text>
						</view>
					</block>
				</view>
			</view>
		</uni-popup> -->
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
				order: {},
			};
		},
		onLoad(options) {
			console.log('商品ID', JSON.parse(options.id));
			this.orderId = options.id;
			this.getOrderDetail(this.orderId);
		},
		methods: {
			getOrderDetail(id) {
				let param = {
					id: id,
					data: ''
				};
				https(urlList.orderDetails, 'post', param, '加载中').then(data => {
					this.order = data.data;
				})
			},
			goNowBuy() {
				let ids = [];
				this.order.items.forEach((goods, index) => {
					let param = {
						"nums": goods.nums,
						"productId": goods.productId,
						"type": 1,
						"cartType": 1,
					}
					https(urlList.addCart, 'POST', param, '添加到购物车').then(data => {
						ids.push(data.data)
						if (ids.length === this.order.items.length) {
							uni.navigateTo({
								url: '/pages/nowBuy/nowBuy?id=' + JSON.stringify(ids)
							})
						}
					})
				});
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
					"data": ""
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
		}
	}
</script>
<style lang="scss" scoped>
	.warp {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

		.top_address {
			width: 640rpx;
			padding: 30rpx 4rpx;
			background-color: #F7F7F7;
			border-radius: 8rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;

			.input_css {
				width: 49%;
			}

			.select_address {
				width: 100%;
				display: flex;
				flex-direction: column;
				font-size: 29rpx;
				color: #4d4d4d;

				.name-tel {
					width: 100%;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;

				}

				.address-box {
					width: 100%;
					display: flex;
					flex-direction: row;
					margin-top: 20rpx;
				}
			}

			.rig_icon {
				width: 100rpx;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: flex-end;
			}
		}

		.cen_goods {
			width: 640rpx;
			padding: 0 30rpx;
			margin-top: 20rpx;
			background-color: #F7F7F7;
			border-radius: 8rpx;
			display: flex;
			flex-direction: column;

			.goods_top {
				width: 100%;
				display: flex;
				flex-direction: column;
				border-bottom: 1rpx solid #DCDCDC;

				.top_top {
					width: 100%;
					display: flex;
					flex-direction: row;
					align-items: center;
					color: #545454;
					padding: 15rpx 0rpx;
					font-size: 30rpx;
				}
			}

			.goods_car {
				width: 100%;
				display: flex;
				flex-direction: column;
				border-bottom: 1rpx solid #DCDCDC;

				.car_top {
					width: 100%;
					display: flex;
					flex-direction: row;
					align-items: center;
					color: #545454;
					padding: 10rpx 0rpx;
					margin-top: 10rpx;
					font-size: 28rpx;

					image {
						height: 50rpx;
						width: 50rpx;
					}
				}

				.car_bot {
					width: 100%;
					height: 100rpx;
					display: flex;
					flex-direction: row;
					align-items: center;

					.tab_list {
						width: 30%;
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
							background-color: white;
							font-family: PingFangSC-Ultralight, ans-serif;
							display: flex;
							flex-direction: row;
							align-items: center;
							justify-content: center;
							margin-right: 20rpx;
						}

						.active {
							color: white;
							background-color: #FF4544;
						}
					}
				}
			}

			.goods {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				padding: 30rpx 0;
				border-bottom: 1rpx solid #DCDCDC;

				.img_css {
					height: 150rpx;
					width: 150rpx;
				}

				.goods_rig {
					width: 450rpx;
					display: flex;
					flex-direction: column;

					// border: 1rpx solid red;
					.rig_name {
						width: 100%;
						font-size: 30rpx;
						color: #4c4c4c;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.rig_type {
						font-size: 29rpx;
						margin-top: 30rpx;
						color: #7d7d7d;
					}

					.rig_bot {
						width: 100%;
						margin-top: 5rpx;
						color: #7d7d7d;
						font-size: 29rpx;
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: space-between;

						.bot_price {
							color: #303030;
							font-size: 30rpx;
						}
					}
				}
			}

			.yhq {
				width: 100%;
				padding: 30rpx 0;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;

				.yhq_lef {
					display: flex;
					flex-direction: row;
					align-items: center;
					font-size: 29rpx;

					image {
						height: 37rpx;
						width: 37rpx;
						color: #474747;
						margin-right: 10rpx;
					}
				}

				.yhq_rig {
					display: flex;
					font-size: 29rpx;
					flex-direction: row;
					align-items: center;
					color: #7d7d7d;
				}

				.yf_rig {
					color: #FF4544;
				}
			}

			.liuyan {
				width: 100%;
				padding: 30rpx 0;
				border-top: 1rpx solid #DCDCDC;
				border-bottom: 1rpx solid #DCDCDC;
			}

			.total_price {
				width: 100%;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: flex-end;
				padding: 20rpx 0;

				.color1 {
					font-size: 28rpx;
					color: #949494;
				}

				.color2 {
					font-size: 29rpx;
					color: #434343;
					margin-left: 15rpx;
				}

				.color3 {
					font-size: 28rpx;
					color: #FF4544;
				}
			}

		}

		.bot_btn {
			width: 100%;
			height: 130rpx;
			position: fixed;
			bottom: 0;
			z-index: 99999;
			background-color: white;
			border-top: 1rpx solid #efefef;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;

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

			.btn_lef {
				color: #FF4544;
				font-size: 29rpx;
				margin-left: 30rpx;
			}

			.btn_rig {
				width: 250rpx;
				height: 80rpx;
				margin-right: 30rpx;
				border-radius: 40rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 29rpx;
				color: white;
				background-color: #FF4544;
			}
		}

		.select_yhq {
			width: 100%;
			height: 700rpx;
			overflow: hidden;
			background-color: #F7F7F7;
			border-top-left-radius: 20rpx;
			border-top-right-radius: 20rpx;
			display: flex;
			flex-direction: column;
			align-items: center;

			.top_nav {
				width: 100%;
				height: 200rpx;
				background-color: white;
				display: flex;
				flex-direction: column;
				align-items: center;

				.top_name {
					width: 90%;
					height: 100rpx;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;
				}

				.car_bot {
					width: 90%;
					height: 100rpx;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;

					.tab_list {
						width: 40%;
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
							background-color: #F7F7F7;
							font-family: PingFangSC-Ultralight, ans-serif;
							display: flex;
							flex-direction: row;
							align-items: center;
							justify-content: center;
							margin-right: 20rpx;
						}

						.active {
							color: white;
							background-color: #FF4544;
						}
					}
				}
			}

			.bot_list {
				height: 500rpx;
				width: 100%;
				overflow-y: auto;
				display: flex;
				flex-direction: column;
				align-items: center;

				.coupon-item {
					width: 90%;
					height: auto;
					background-color: white;
					display: table;
					border-radius: 10upx;
					padding: 0 20upx;
					margin-top: 12upx;
					margin-bottom: 10rpx;
					border: 1px solid #eeeeee;
					position: relative;

					.coupon-money {
						width: 465upx;
						height: auto;
						display: table;
						float: left;
						padding: 26upx 0;
						border-style: none dotted none none;
						border-color: #eeeeee;

						.demand {
							width: 100%;
							height: 30upx;
							line-height: 30upx;
							font-size: 24upx;
							color: #999999;
						}

						.layof {
							width: 100%;
							height: 48upx;
							line-height: 30upx;
							font-size: 44upx;
							color: #ff9000;
							font-weight: bold;
						}
					}

					.get-btn {
						width: 146upx;
						height: 52upx;
						line-height: 50upx;
						position: absolute;
						top: 50%;
						right: 26upx;
						margin-top: -26upx;
						text-align: center;
						border-radius: 60upx;
						color: #ff9000;
						border: 1px solid #ff9000;
						font-size: 24upx;
						float: right;
					}
				}

				.coupon-item:after {
					width: 40upx;
					height: 20upx;
					position: absolute;
					left: 460upx;
					top: -1px;
					border-radius: 0 0 40upx 40upx;
					content: "";
					display: block;
					background: #F7F7F7;
					border: 1px solid #eeeeee;
					border-top: 0px;
				}

				.coupon-item:before {
					width: 40upx;
					height: 20upx;
					position: absolute;
					left: 460upx;
					bottom: -1px;
					border-radius: 40upx 40upx 0 0;
					content: "";
					display: block;
					background: #F7F7F7;
					border: 1px solid #eeeeee;
					border-bottom: 0px;
				}

				.no_goods {
					display: flex;
					flex-direction: column;
					align-items: center;
					margin: 0 auto;
					font-size: 30rpx;
					color: #9d9d9d;

					image {
						width: 300rpx;
						height: 300rpx;
						margin-bottom: 10rpx;
					}
				}
			}
		}


	}
</style>
