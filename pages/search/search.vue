<template>
	<view class="warp">
		<view class="top_search">
			<uni-search-bar class="search_input" bgColor="white" v-model="searchValue" cancelButton="none" />
			<view class="search_btn" @tap="onSearch">搜索</view>
		</view>
		<view class="bot_list">
			<view class="top_hot">
				<image src="/static/images/common/remen.png"></image> 商品热搜榜
			</view>
			<view class="hot_goods">
				<view class="goods_item" v-for="(item,index) in goods" :key="index" @tap="goGoodDetail(item.id)">
					<view class="lef">{{index + 1}}</view>
					<image :src="item.image"></image>
					<view class="name">{{item.name}}</view>
				</view>
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
				page: 1,
				limit: 15,
				order: "viewCount asc",
				where: "",
				goods: [],
				searchValue: "",

			};
		},
		onLoad() {
			this.getGoodsPageList(this.page, this.limit, this.order, this.where)
		},
		methods: {
			//分页查询商品列表
			getGoodsPageList(page, limit, order, where) {
				let param = {
					page: page,
					limit: limit,
					order: order,
					where: where,
				};
				https(urlList.getGoodsPageList, 'post', param, '').then(data => {
					var list = data.data.list;
					console.log(list.length)
					if (list.length <= 0) {
						this.getGoodsRecommendList()
					} else {
						this.goods = list
					}
				}).catch(err => {
					console.log('请求失败', err)
				})
			},
			// 获取首页推荐商品
			getGoodsRecommendList() {
				let param = {
					id: 100,
					data: ''
				};
				https(urlList.getGoodsRecommendList, 'POST', param, '获取商品')
					.then(data => {
						this.goods = data.data
						console.log('请求成功', data)
					}).catch(err => {
						console.log('请求失败', err)
					})
			},

			onSearch() {
				let where = {
					searchName: this.searchValue,
				}
				this.getGoodsPageList(this.page, this.limit, this.order, JSON.stringify(where))
			},
			goGoodDetail(id) {
				uni.navigateTo({
					url: '/pages/goodDetail/goodDetail?id=' + id
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.warp {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

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
