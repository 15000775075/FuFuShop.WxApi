<template>
	<view class="warp">
		<view class="goods">
			<block v-if="goods.length > 0">
				<view 
					class="goods_list" 
					v-for="(item,index) in goods" 
					:key="index"
					@tap="goodDetail(item.goodsId)"
				>
					<image class="image_good" :src="item.goods.image"></image>
					<view class="good_name">{{item.goodsName}}</view>
					<view class="good_price">
						<view>￥{{item.goods.price}}</view>
						<view class="rig_cart">已售 {{item.goods.buyCount}}</view>
					</view>
				</view>
			</block>
			<block v-else>
				<view class="no_goods">
					<image src="/static/images/common/no.png"></image>
					<text>暂无收藏</text>
				</view>
			</block>
		</view>
		<uni-load-more style="background-color: #F7F7F7;" :status="loadMoreStatus"></uni-load-more>
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
				goods:[],
				param: {
					page: 1,
					limit: 10,
					order: "id",
					where: "",
					otherData:"",
					id:0
				},
				loadMoreStatus:"more"
			};
		},
		onLoad() {
			this.goodsCollectionList();
		},
		onReachBottom() {
			if (this.loadMoreStatus === 'more') {
				this.loadMoreStatus = 'loading';
				this.getGoodsPageList()
			}
		},
		methods:{
			goodDetail(id){
				uni.navigateTo({
					url:'/pages/goodDetail/goodDetail?id=' + id
				})
			},
			goodsCollectionList() {
				let param = this.param;
				https(urlList.goodsCollectionList, 'post', param, '更新收藏').then(data => {
					this.goods = this.goods.concat(data.data.list);
					if (data.data.list.length == this.param.limit) {
						this.param.page++;
						this.loadMoreStatus = 'more';
					} else
						this.loadMoreStatus = 'noMore';
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
.warp{
	width: 100%;
	height: 100vh;
	background-color: #F7F7F7;
	.goods{
		width: 100%;
		height: 100%;
		padding-top: 30rpx;
		overflow-y: auto;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		.goods_list{
			width:330rpx;
			margin-left:30rpx;
			background-color: white;
			padding: 0 0 30rpx 0;
			border-radius: 10rpx;
			// border: 1rpx solid red;
			margin-bottom: 50rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			.image_good{
				width: 100%;
				height: 330rpx;
				border-top-right-radius:20rpx;
			}
			.good_name{
				width: 90%;
				margin: 0 auto;
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
			.good_price{
				width: 90%;
				margin: 0 auto;
				color: red;
				margin-top: 20rpx;
				font-size: 27rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				.rig_cart{
					color: #7c7c7c;
					font-size: 29rpx;
				}
			}
		}
		.no_goods{
			display: flex;
			flex-direction: column;
			align-items: center;
			margin: 0 auto;
			font-size: 30rpx;
			color: #9d9d9d;
			image{
				width: 400rpx;
				height: 400rpx;
				margin-bottom: 10rpx;
			}
		}
	}
}
</style>
