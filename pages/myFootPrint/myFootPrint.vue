<template>
	<view class="warp">
		<view class="top_list">
			<view class="top_tab">
				<view class="tab_list" v-for="(item,index) in topNavList" :key="index" @tap="onTopTabs(index)">
					<view class="tab_item" :class="tabIndex==index?'active':''">{{item}}</view>
				</view>
			</view>
		</view>
		<scroll-view class="bot_list" scroll-y scroll-top="0" refresher-enabled scroll-anchoring
			@scrolltolower='upLoading' @refresherrefresh='downLoading'>
			<block v-for="(item,index) in goodList" :key="index">
				<view class="good_time">{{item.Time}}</view>
				<view class="good_content">
					<block v-for="(val,ind) in item.Goods" :key="ind">
						<view class="goods_list" @tap="goodDetail(val.goodsId)">
							<image class="image_good" :src="val.goodImage"></image>
							<view class="good_name">{{val.goodsName}}</view>
							<view class="good_price">
								<view>￥{{val.goods.price}}</view>
								<view class="rig_cart" @tap.stop="onGoodNav(val)">···</view>
							</view>
						</view>
					</block>
				</view>
			</block>
			<uni-load-more style="background-color: #F7F7F7;" :status="loadMoreStatus"></uni-load-more>
		</scroll-view>
		<uni-popup ref="popup" type="share" background-color="#fff">
			<view class="popup_css">
				<view class="popup_top">
					<view class="fx_item" @tap="onCollection">
						<view class="fx_img">
							<uni-icons v-if="goods.goods.isFav" type="heart-filled" size="29" color="red"></uni-icons>
							<uni-icons v-else type="heart" size="29"></uni-icons>
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
	let tomorrow = new Date();
	tomorrow.setDate(new Date().getDate() + 1);
	import LoadMore from '@/components/uni-load-more/uni-load-more.vue'
	export default {
		components: {
			LoadMore
		},
		data() {
			return {
				topNavList: ['今日', '昨日', '近七日', '近三十日', '全部'],
				tabIndex: 0,
				goodList: [],
				param: {
					page: 1,
					limit: 10,
					order: "id",
					where: "",
					otherData: JSON.stringify({
						startTime: new Date().format("yyyy-MM-dd"),
						endTime: tomorrow.format("yyyy-MM-dd")
					}),
					id: 0
				},
				loadMoreStatus: 'more',
				loadingText: '加载中',
				goods: {}
			};
		},
		onLoad() {
			this.getGoodsbrowsing();
		},
		methods: {
			onTopTabs(index) {
				this.tabIndex = index;
				this.loadingText = '加载中';
				this.goodList = [];
				this.param.page = 1;
				switch (this.tabIndex) {
					case 0:
						this.param.otherData = JSON.stringify({
							startTime: new Date().format("yyyy-MM-dd"),
							endTime: tomorrow.format("yyyy-MM-dd")
						});
						break;
					case 1:
						let yesterday = new Date();
						yesterday.setDate(yesterday.getDate() - 1);
						this.param.otherData = JSON.stringify({
							startTime: yesterday.format("yyyy-MM-dd"),
							endTime: new Date().format("yyyy-MM-dd")
						});
						break;
					case 2:
						let lastweek = new Date();
						lastweek.setDate(lastweek.getDate() - 7);
						this.param.otherData = JSON.stringify({
							startTime: lastweek.format("yyyy-MM-dd"),
							endTime: tomorrow.format("yyyy-MM-dd")
						});
						break;
					case 3:
						let lastmonth = new Date();
						lastmonth.setDate(lastmonth.getDate() - 30);
						this.param.otherData = JSON.stringify({
							startTime: lastmonth.format("yyyy-MM-dd"),
							endTime: tomorrow.format("yyyy-MM-dd")
						});
						break;
					case 4:
						this.param.otherData = JSON.stringify({
							startTime: new Date().format("yyyy") + '-01-01',
							endTime: tomorrow.format("yyyy-MM-dd")
						});
						break;
				}
				this.getGoodsbrowsing();
			},
			getGoodsbrowsing() {
				this.loadMoreStatus = 'loading';
				let param = this.param;
				https(urlList.getGoodsbrowsing, 'post', param, this.loadingText).then(data => {
					this.loadingText = '';
					let count = 0;
					// 追加数据
					data.data.list.forEach((item, index) => {
						// 最后一条数据是否需要追加商品
						let lastData = this.goodList[this.goodList.length - 1];
						if (lastData !== undefined && lastData.Time === item.Time) {
							this.goodList[index].Goods = this.goodList[index].Goods.concat(item.Goods);
						} else {
							this.goodList.push(item);
						}
						// 记录总数
						count += item.Goods.length;
					});
					console.log(this.goodList);
					// 是否还有下一页
					if (count == this.param.limit) {
						this.param.page++;
						this.loadMoreStatus = 'more';
					} else
						this.loadMoreStatus = 'noMore';
				});
			},
			goodDetail(id) {
				uni.navigateTo({
					url: '/pages/goodDetail/goodDetail?id=' + id
				})
			},
			onGoodNav(val) {
				this.$refs.popup.open()
				this.goods = val;
			},
			closeFenx() {
				this.$refs.popup.close()
			},
			onCollection() {
				let param = {
					id: this.goods.goods.id,
					data: ''
				};
				https(urlList.goodsCollectionCreateOrDelete, 'post', param, '收藏中').then(data => {
					console.log(this.goods)
					this.goods.goods.isFav = !this.goods.goods.isFav;
					uni.showToast({
						title: data.msg
					})
				});
			},
			onClear() {
				let param = {
					id: this.goods.id,
					data: ''
				};
				https(urlList.delGoodsbrowsing, 'post', param, '删除中').then(data => {
					this.$refs.popup.close();
					uni.showToast({
						title: "删除成功"
					});
				});
			},
			// 上拉加载
			upLoading() {
				if (this.loadMoreStatus === 'more') {
					this.getGoodsbrowsing()
				}
			},
			// 下拉刷新
			downLoading() {
				this.onTopTabs(this.tabIndex);
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

		.bot_list {
			width: 750rpx;
			height: calc(100vh - 100rpx);
			overflow-y: auto;

			// border: 1rpx solid red;
			.good_time {
				height: 80rpx;
				// padding-left: 20rpx;
				width: 94%;
				margin: 0 auto;
				display: flex;
				align-items: center;
				font-size: 27rpx;
				color: #545454;
			}

			.good_content {
				width: 100%;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;

				.goods_list {
					width: 216.67rpx;
					background-color: white;
					border-radius: 7rpx;
					overflow: hidden;
					padding: 0 0 20rpx 0;
					margin-left: 25rpx;
					margin-bottom: 50rpx;
					display: flex;
					flex-direction: column;
					align-items: center;

					.image_good {
						width: 100%;
						height: 220rpx;
						// border-top-right-radius:20rpx;
					}

					.good_name {
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

					.good_price {
						width: 90%;
						margin: 0 auto;
						color: red;
						margin-top: 10rpx;
						font-size: 28rpx;
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: space-between;

						.rig_cart {
							color: #8d8d8d;
							font-size: 30rpx;
							font-weight: bold;
						}
					}
				}
			}
		}

		.popup_css {
			width: 100%;
			display: flex;
			flex-direction: column;

			.popup_top {
				width: 100%;
				height: 300rpx;
				background-color: #F2F2F2;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;

				.fx_item {
					height: 200rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;

					.fx_img {
						height: 100rpx;
						width: 100rpx;
						border-radius: 10rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						background-color: white;

						image {
							height: 70rpx;
							width: 70rpx;
						}
					}

					.fx_name {
						font-size: 29rpx;
						margin-top: 20rpx;
					}
				}
			}

			.popup_bot {
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
