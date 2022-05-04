<template>
	<view class="warp">
		<view class="top_search">
			<view class="search" @tap="goSearch">
				<icon type="search" size="16" style="margin-right: 10rpx;" /> 搜索
			</view>
		</view>
		<view class="bot_goods">
			<view class="lef_list">
				<view class="tab_list" v-for="(item,index) in lefNavList" :key="index" @tap="onLefTabs(index,item.id)">
					<view class="tab_item" :class="lefIndex==index?'active':''">{{item.name}}</view>
				</view>
			</view>
			<view class="rig_goods">
				<scroll-view style="width: 100%;height:100%;" scroll-y scroll-top="0" refresher-enabled scroll-anchoring
					:refresher-triggered="isHideLoading" @scrolltolower='upLoading' @refresherrefresh='downLoading'>
					<view class="goods_item" v-for="(item,index) in goods" :key="index" @tap="goodDetail(item.id)">
						<image class="good_img" :src="item.image"></image>
						<view class="good_rig">
							<view class="g_r_name">{{item.name}}</view>
							<view class="g_r_price">
								<view class="g_r_p_lef">
									<view class="price">￥{{item.price}}</view>
									<view class="onnum">已售 {{item.buyCount}} </view>
								</view>
								<view class="g_r_p_rig" @tap.stop="showBuyGoodModel(item.id,item)">
									<uni-icons type="cart" color="red"></uni-icons>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<buy-goods v-show="showBuyGood" :buy_good="buy_good" @closeBuyGood="closeBuyGood"></buy-goods>
	</view>
</template>
<script>
	import BuyGoods from '@/components/buy-good/buy-good.vue'
	const {
		urlList,
		https
	} = require('@/static/api');
	export default {
		components: {
			BuyGoods
		},
		data() {
			return {
				lefNavList: [],
				lefIndex: 0,
				isHideLoading: false, //下拉加载状态
				goods: [],
				showBuyGood: false,
				buy_good: {},
				page: 1,
				limit: 10,
				order: "",
				where: "",
				catId: 0
			};
		},
		onLoad() {
			this.getAllCategories();
		},
		methods: {
			getGoodsPageList() {
				let param = {
					"page": this.page,
					"limit": this.limit,
					"order": this.order,
					"where": JSON.stringify(this.where)
				};

				console.log(param)
				https(urlList.getGoodsPageList, 'POST', param, '获取商品列表').then(data => {
					this.goods = data.data.list
					console.log('请求成功', data)
				}).catch(err => {
					console.log('请求失败', err)
				})
			},
			getAllCategories() {
				https(urlList.getAllCategories, 'POST', "", '获取分类列表').then(data => {
					if (data.status) {}
					this.lefNavList = data.data
					if (this.lefNavList.length > 0)
						this.onLefTabs(0, this.lefNavList[0].id);
				}).catch(err => {})
			},
			goSearch() {
				uni.navigateTo({
					url: "/pages/search/search"
				})
			},
			goodDetail(id) {
				uni.navigateTo({
					url: '/pages/goodDetail/goodDetail?id=' + id
				})
			},
			// 左侧切换tabs
			onLefTabs(index, id) {
				if (this.lefIndex != 0 && this.lefIndex == index) return;
				this.lefIndex = index;
				console.log('分类ID---', id)
				this.where = {
					catId: id,
				}
				this.getGoodsPageList();
			},
			showBuyGoodModel(id, good) {
				this.buy_good = good;
				this.showBuyGood = true
			},
			closeBuyGood() {
				this.showBuyGood = false
			},
			// 上拉加载
			upLoading() {
				console.log('上拉加载')
			},
			// 下拉刷新
			downLoading() {
				this.isHideLoading = false
				console.log('下拉刷新')
			},
		}
	}
</script>

<style lang="scss" scoped>
	.warp {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;

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
				border-radius: 40rpx;
				font-size: 26rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
			}
		}

		.bot_goods {
			width: 100%;
			height: calc(100vh - 100rpx);
			display: flex;
			flex-direction: row;
		}

		.lef_list {
			width: 200rpx;
			height: 100%;
			// border: 1rpx solid red;
			display: flex;
			flex-direction: column;
			background-color: #F7F7F7;

			.tab_list {
				width: 100%;
				height: 100rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: flex-end;
				font-size: 30rpx;
				color: #666666;

				.tab_item {
					width: 100%;
					height: 100%;
					// border: 1rpx solid red;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-around;
				}

				.active {
					color: #FF4544;
					border-left: 7rpx solid #FF4544;
				}
			}
		}

		.rig_goods {
			width: 550rpx;
			height: 100%;
			// border: 1rpx solid red;
			display: flex;
			flex-direction: column;
			align-items: center;

			.goods_item {
				width: 490rpx;
				margin: 0 auto;
				padding: 25rpx 0rpx 30rpx 0rpx;
				border-bottom: 1rpx solid #ececec;
				display: flex;
				flex-direction: row;
				justify-content: space-between;

				.good_img {
					width: 150rpx;
					height: 150rpx;
				}

				.good_rig {
					width: 320rpx;
					display: flex;
					flex-direction: column;
					align-items: center;

					.g_r_name {
						width: 100%;
						font-size: 27rpx;
						color: #4c4c4c;
						display: -webkit-box;
						overflow: hidden;
						text-overflow: ellipsis;
						word-wrap: break-word;
						white-space: normal !important;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}

					.g_r_price {
						width: 100%;
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: space-between;

						.price {
							margin-top: 15rpx;
							color: #FF4544;
						}

						.onnum {
							color: #959595;
							font-size: 24rpx;
						}
					}

					.g_r_p_rig {
						height: 50rpx;
						width: 50rpx;
						border-radius: 50%;
						border: 1rpx solid #FF4544;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
			}
		}
	}
</style>
