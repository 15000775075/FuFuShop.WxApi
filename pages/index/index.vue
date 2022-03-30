<template>
	<view class="content">
		<view class="top_search">
			<view class="search" @tap="goSearch">
				<icon type="search" size="16" style="margin-right: 10rpx;"/> 搜索商品名称
			</view>
			<view class="rig_shib">
				<uni-icons type="camera" size="30" @tap="onDistinguish"></uni-icons>
			</view>
		</view>
		<view class="swiper_css">
			<swiper 
				class="swiper-box"  
				indicator-dots="true" 
				autoplay="true" 
				:interval="4000" 
				indicator-active-color="white"
			>
				<swiper-item v-for="(item ,index) in swiperList" :key="index">
					<image :src="item" style="width: 100%;height: 100%;"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="noticebar_css">
			<uni-notice-bar 
				scrollable="true" 
				single="true" 
				speed="60"
				backgroundColor="#F8F8F8"
				color="#FF9393"
				showIcon="true"
				:text="noticeBarText"
			></uni-notice-bar>
		</view>
		<view class="hd_css">
			<image src="/static/images/index/hd1.png"></image>
		</view>
		<view class="goods">
			<block v-for="(item,index) in goods" :key="index">
				<view class="goods_list" @tap="goodDetail(item.id)">
					<image class="image_good" :src="item.img"></image>
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
		<buy-goods 
			v-show="showBuyGood"
			:buy_good="buy_good"
			@closeBuyGood="closeBuyGood"
		></buy-goods>
	</view>
</template>

<script>
	import BuyGoods from '@/components/buy-good/buy-good.vue'
	const {urlList,https} = require('@/static/api');
	export default {
		components:{
			BuyGoods
		},
		data() {
			return {
				swiperList: [
					"/static/images/index/banner.png",
					"/static/images/index/banner.png",
				],
				noticeBarText:'这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏',
				goods:[
					{
						id:111,
						name:'jk制服裙正版夏季短袖衬衫格裙套装女学生学院风格全套百搭百褶裙',
						img:'/static/images/index/good.jpg',
						price:'215.26',
						kc:100,
						buy_num:1,
						category:[
							{id:1001,text:'27黑色'},
							{id:1002,text:'28黑色'},
							{id:1003,text:'29黑色'},
							{id:1003,text:'25黑色'},
						]
					},
					{
						id:111,
						name:'jk制服裙正版夏季短袖衬衫格裙套装女学生学院风格全套百搭百褶裙',
						img:'/static/images/index/good.jpg',
						price:'215.26',
						kc:10,
						buy_num:1,
						category:[
							{id:1001,text:'27黑色 （9956款）'},
							{id:1002,text:'28黑色 （9956款）'},
							{id:1003,text:'29黑色 （9956款）'},
							{id:1003,text:'25黑色 （9956款）'},
						]
					},
					{
						id:111,
						name:'jk制服裙正版夏季短袖衬衫格裙套装女学生学院风格全套百搭百褶裙',
						img:'/static/images/index/good.jpg',
						price:'215.26',
						kc:1,
						buy_num:1,
						category:[
							{id:1001,text:'27黑色 （9956款）'},
							{id:1002,text:'28黑色 （9956款）'},
							{id:1003,text:'29黑色 （9956款）'},
							{id:1003,text:'25黑色 （9956款）'},
						]
					},
					{
						id:111,
						name:'jk制服裙正版夏季短袖衬衫格裙套装女学生学院风格全套百搭百褶裙',
						img:'/static/images/index/good.jpg',
						price:'215.26',
						kc:5,
						buy_num:1,
						category:[
							{id:1001,text:'27黑色 （9956款）'},
							{id:1002,text:'28黑色 （9956款）'},
							{id:1003,text:'29黑色 （9956款）'},
							{id:1003,text:'25黑色 （9956款）'},
						]
					},
					{
						id:111,
						name:'jk制服裙正版夏季短袖衬衫格裙套装女学生学院风格全套百搭百褶裙',
						img:'/static/images/index/good.jpg',
						price:'215.26',
					},
					{
						id:111,
						name:'jk制服裙正版夏季短袖衬衫格裙套装女学生学院风格全套百搭百褶裙',
						img:'/static/images/index/good.jpg',
						price:'215.26',
					},
					{
						id:111,
						name:'jk制服裙正版夏季短袖衬衫格裙套装女学生学院风格全套百搭百褶裙',
						img:'/static/images/index/good.jpg',
						price:'215.26',
					},
					
				],
				showBuyGood:false,
				buy_good:{},
			}
		},
		onLoad() {
		},
		methods: {
			goSearch(){
				uni.navigateTo({
					url: "/pages/search/search"
				})
			},
			goodDetail(id){
				uni.navigateTo({
					url:'/pages/goodDetail/goodDetail?id=' + id
				})
			},
			showBuyGoodModel(id,good){
				this.buy_good = good;
				this.showBuyGood = true
			},
			closeBuyGood(){
				this.showBuyGood= false
			},
			onDistinguish(){
				uni.chooseImage({
					count:1,
					sizeType:['original','compressed'],
					sourceType:['camera','album'],//camera 拍照 album 相册
					success:(res)=> {
						console.log('照片',res)
					},
					fail() {
						uni.showToast({
							title:"拍照或引用相册失败",
							duration:2000
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		.top_search{
			width: 100%;
			height: 100rpx;
			background-color: #F2F2F2;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			.search{
				width: 620rpx;
				height: 70rpx;
				color:#a5a5a5;
				background-color: white;
				border: 1rpx solid #f5f5f5;
				border-radius: 10rpx;
				font-size: 26rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
			}
			.rig_shib{
				width: 80rpx;
				height: 70rpx;
				display: flex;
				align-items: center;
				justify-content: flex-end;
			}
		}
		.swiper_css{
			width: 700rpx;
			height: 300rpx;
			border-radius: 10rpx;
			overflow: hidden;
			.swiper-box{
				height: 100%;
				width: 100%;
			}
		}
		.noticebar_css{
			width: 100%;
			height:90rpx;
			margin-top: 20rpx;
		}
		.hd_css{
			width: 100%;
			height: 250rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.goods{
			width: 100%;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			.goods_list{
				width:216.67rpx;
				margin-left: 25rpx;
				// border: 1rpx solid red;
				margin-bottom: 50rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				position: relative;
				.image_good{
					width: 100%;
					height: 220rpx;
					border-top-right-radius:20rpx;
				}
				.hot_css{
					width: 60rpx;
					height:50rpx;
					position: absolute;
					top: 0rpx;
					left: 0rpx;
				}
				.good_name{
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
				.good_price{
					width: 100%;
					margin: 0 auto;
					color: red;
					margin-top: 10rpx;
					font-size: 29rpx;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;
					.rig_cart{
						height: 45rpx;
						width: 45rpx;
						border-radius: 50%;
						border:1rpx solid #FF4544;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
			}
		}
		
	}
</style>
