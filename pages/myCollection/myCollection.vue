<template>
	<view class="warp">
		<view class="goods">
			<block v-if="goods.length > 0">
				<view 
					class="goods_list" 
					v-for="(item,index) in goods" 
					:key="index"
					@tap="goodDetail(item.id)"
				>
					<image class="image_good" :src="item.img"></image>
					<view class="good_name">{{item.name}}</view>
					<view class="good_price">
						<view>￥{{item.price}}</view>
						<view class="rig_cart">已售 {{item.num}}</view>
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goods:[
					{
						id:111,
						name:'jk制服裙正版夏季短袖衬衫格裙套装女学生学院风格全套百搭百褶裙',
						img:'/static/images/index/good.jpg',
						price:'215.26',
						num:20
					},
					{
						id:111,
						name:'jk制服裙正版夏季短袖衬衫格裙套装女学生学院风格全套百搭百褶裙',
						img:'/static/images/index/good.jpg',
						price:'215.26',
						num:2
					},
					{
						id:111,
						name:'jk制服裙正版夏季短袖衬衫格裙套装女学生学院风格全套百搭百褶裙',
						img:'/static/images/index/good.jpg',
						price:'215.26',
						num:20
					},
					{
						id:111,
						name:'jk制服裙正版夏季短袖衬衫格裙套装女学生学院风格全套百搭百褶裙',
						img:'/static/images/index/good.jpg',
						price:'215.26',
						num:20
					},
					{
						id:111,
						name:'jk制服裙正版夏季短袖衬衫格裙套装女学生学院风格全套百搭百褶裙',
						img:'/static/images/index/good.jpg',
						price:'215.26',
						num:20
					},
					{
						id:111,
						name:'jk制服裙正版夏季短袖衬衫格裙套装女学生学院风格全套百搭百褶裙',
						img:'/static/images/index/good.jpg',
						price:'215.26',
						num:20
					},
					{
						id:111,
						name:'jk制服裙正版夏季短袖衬衫格裙套装女学生学院风格全套百搭百褶裙',
						img:'/static/images/index/good.jpg',
						price:'215.26',
						num:20
					},
				]
			};
		},
		methods:{
			goodDetail(id){
				uni.navigateTo({
					url:'/pages/goodDetail/goodDetail?id=' + id
				})
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
