<template>
	<view class="warp">
		<view class="top_search">
			<uni-search-bar class="search_input" bgColor="white" v-model="searchValue" cancelButton="none" />
			<view class="search_btn" @tap="onSearch">搜索</view>
		</view>
		<view v-if="isShowNull" class="cen_goods">
			<view class="no_goods">
				<text>没有搜到相关商品</text>
				<text>猜你喜欢</text>
			</view>
		</view>
		<view class="goods" v-if="goods.length>0">
			<block v-for="(item,index) in goods" :key="index">
				<view class="goods_list" @tap="goGoodDetail(item.id)">
					<image class="image_good" :src="item.image"></image>
					<image class="hot_css" src="/static/images/index/hot.png"></image>
					<view class="good_name">{{item.name}}</view>
					<view class="good_price">
						<view>￥{{item.price}}</view>
						<view class="rig_cart" @tap.stop="showBuyGoodModel(item.id,item)">
							<uni-icons type="cart" color="red"></uni-icons>
						</view>
					</view>
				</view>
			</block>
		</view>

		<view class="bot_list" v-if="isShowHot">
			<view class="top_hot">
				<image src="/static/images/common/remen.png"></image> 商品热搜榜
			</view>
			<view class="hot_goods">
				<view class="goods_item" v-for="(item,index) in hotGoods" :key="index" @tap="goGoodDetail(item.id)">
					<view class="lef">{{index + 1}}</view>
					<image :src="item.image"></image>
					<view class="name">{{item.name}}</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadMoreStatus"></uni-load-more>
		<buy-goods v-show="showBuyGood" :buy_good="buy_good" @closeBuyGood="closeBuyGood"></buy-goods>
	</view>
</template>

<script>
	const {
		urlList,
		https
	} = require('@/static/api');
	import LoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import BuyGoods from '@/components/buy-good/buy-good.vue'
	export default {
		components: {
			LoadMore,
			BuyGoods
		},
		data() {
			return {
				goods: [],
				hotGoods: [],
				searchValue: "",
				isShowHot: true,
				isShowNull: false,
				loadMoreStatus: 'noMore',
				showBuyGood:false,
				buy_good:{},
				loadingText:'',
				param: {
					page: 1,
					limit: 9,
					order: "viewCount asc",
					where: "",
				}
			};
		},
		onLoad() {
			this.getGoodsRecommendList()
		},
		onReachBottom() {
			if (this.loadMoreStatus === 'more') {
				this.loadMoreStatus = 'loading';
				this.loadingText='';
				this.getGoodsPageList();
			}
		},
		methods: {
			//分页查询商品列表
			getGoodsPageList() {
				let param = this.param;
				https(urlList.getGoodsPageList, 'post', param, this.loadingText).then(data => {
					this.goods = this.goods.concat(data.data.list);
					this.isShowHot = false;
					if (data.data.list.length == this.param.limit) {
						this.param.page++;
						this.loadMoreStatus = 'more';
					} else if (this.param.page === 1 && data.data.list.length <= 0) {
						// this.isShowHot = true;
						this.getGoodsRecommendList(true);
						this.loadMoreStatus = 'noMore';
						this.isShowNull = true;
					} else {
						this.loadMoreStatus = 'noMore';
					}
				}).catch(err => {
					console.log('请求失败', err)
				})
			},
			// 获取首页推荐商品
			getGoodsRecommendList(isSearch) {
				let param = {
					id: 100,
					data: ''
				};
				https(urlList.getGoodsRecommendList, 'POST', param, '获取商品')
					.then(data => {
						this.hotGoods = data.data
						if (isSearch)
							this.goods = this.hotGoods
					})
			},

			onSearch() {
				this.goods = [];
				this.param.page = 1;
				this.loadMoreStatus = 'more';
				this.loadingText="搜索中";
				let where = {
					searchName: this.searchValue,
				}
				this.param.where = JSON.stringify(where);
				this.getGoodsPageList();
				// if (this.searchValue == "") {
				// 	this.getGoodsRecommendList(true);
				// 	this.loadMoreStatus = 'noMore';
				// } else {
				
				// }
			},
			goGoodDetail(id) {
				uni.navigateTo({
					url: '/pages/goodDetail/goodDetail?id=' + id
				})
			},
			showBuyGoodModel(id, good) {
				this.buy_good = good;
				this.buy_good.buy_num = 1;
				this.showBuyGood = true
			},
			closeBuyGood() {
				this.showBuyGood = false
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

		.cen_goods {
			width: 100%;
			overflow-y: auto;
			display: flex;
			flex-direction: column;
			margin-top: 150rpx;

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

			.goods_text {
				width: 100%;
				height: 100rpx;
				background-color: white;
				display: flex;
				flex-direction: row;
				align-items: center;

				.radio {
					width: 100%;
					height: 100%;
					display: flex;
					flex-direction: row;
					align-items: center;
					color: #6a6a6a;
					font-size: 27rpx;

					text {
						margin-left: 10rpx;
					}
				}
			}

			.goods_item {
				width: 100%;
				height: 250rpx;
				border-top: 1rpx solid #f0f0f0;
				background-color: white;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;

				.lef_select {
					width: 100rpx;
					height: 100%;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;
				}

				.rig_goods {
					width: 620rpx;
					height: 100%;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					margin-right: 30rpx;

					image {
						height: 150rpx;
						width: 150rpx;
					}

					.r_goods_rig {
						width: 450rpx;
						display: flex;
						flex-direction: column;

						// border: 1rpx solid red;
						.r_g_r_name {
							width: 100%;
							font-size: 32rpx;
							color: #4c4c4c;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}

						.r_g_r_type {
							font-size: 29rpx;
							margin-top: 10rpx;
							color: #7d7d7d;
						}

						.r_g_r_price {
							width: 100%;
							margin-top: 20rpx;
							display: flex;
							flex-direction: row;
							align-items: center;
							justify-content: space-between;

							.r_g_r_p_price {
								color: #FF4544;
							}
						}
					}
				}
			}
		}

		.goods {
			width: 100%;
			margin-top: 100rpx;
			padding-top: 30rpx;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;

			.goods_list {
				width: 216.67rpx;
				margin-left: 25rpx;
				// border: 1rpx solid red;
				margin-bottom: 50rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				position: relative;

				.image_good {
					width: 100%;
					height: 220rpx;
					border-top-right-radius: 20rpx;
				}

				.hot_css {
					width: 60rpx;
					height: 50rpx;
					position: absolute;
					top: 0rpx;
					left: 0rpx;
				}

				.good_name {
					width: 100%;
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
					width: 100%;
					margin: 0 auto;
					color: red;
					margin-top: 10rpx;
					font-size: 29rpx;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;

					.rig_cart {
						height: 45rpx;
						width: 45rpx;
						border-radius: 50%;
						border: 1rpx solid #FF4544;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
			}
		}

		.top_search {
			width: 100%;
			height: 100rpx;
			position: fixed;
			top: 0;
			background-color: #F7F7F7;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;

			.search_input {
				width: 600rpx;
			}

			.search_btn {
				width: 100rpx;
				height: 80rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 29rpx;
			}
		}

		.bot_list {
			width: 100%;
			margin-top: 110rpx;
			display: flex;
			flex-direction: column;
			align-items: center;

			.top_hot {
				width: 700rpx;
				height: 100rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				color: red;
				font-size: 28rpx;
				font-weight: bold;

				image {
					height: 40rpx;
					width: 40rpx;
					margin-right: 20rpx;
				}
			}

			.hot_goods {
				width: 640rpx;
				padding: 20rpx 30rpx 20rpx 30rpx;
				border-radius: 10rpx;
				box-shadow: #cccccc 0px 0px 5px;

				.goods_item {
					width: 100%;
					height: 150rpx;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;

					.lef {
						width: 60rpx;
						height: 100%;
						display: flex;
						align-items: center;
						color: red;
					}

					image {
						height: 80rpx;
						width: 80rpx;
					}

					.name {
						width: 470rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						font-size: 29rpx;
					}
				}
			}

		}


	}
</style>
