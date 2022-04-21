<template>
	<view class="warp">
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
		<!-- <view class="top_rig_cart" @tap="goShopCart">
			<uni-icons type="cart" color="#616161" size="27"></uni-icons>
		</view> -->
		<view class="good_detail">
			<view class="name">{{goods.name}}</view>
			<view class="name detail">{{goods.text}}</view>
			<view class="price">
				<view class="price_lef">
					<view class="price_lef_top">
						<view class="size1">￥</view>
						<view class="size2">{{goods.price}}</view>
						<view class="size3">￥{{goods.oldPrice}}</view>
					</view>
					<view class="price_lef_bot">销量 {{goods.buy_num}}</view>
				</view>
				<view class="price_rig" @tap="onFenx">
					<image src="/static/images/goodDetail/fx.png"></image>分享
				</view>
			</view>
			
		</view>
		<view class="guige" @tap="openBuyGood">
			<view class="guige_top">
				<view class="guige_top_lef">
					<view class="guige_top_lef1">选择</view>
					<view class="guige_top_lef2">请选择规格</view>
				</view>
				<uni-icons type="right" color="#8a8a8a"></uni-icons>
			</view>
			<view class="guige_bot">
				<view class="guige_bot_item">共{{goods.category.length}}个规格...</view>
			</view>
		</view>
		<view class="pj">
			<view class="pj_item">
				暂无评价
			</view>
		</view>
		<view class="good_img">
			<view class="good_img_text">
				<image src="/static/images/goodDetail/good_text_img.png"></image>
			</view>
			<view class="good_img_fwb">
				这是富文本商品详情
			</view>
		</view>
		<view class="bot_nav">
			<view class="nav_lef_item" @tap="goIndex">
				<uni-icons type="home" size="22" color="#838383"></uni-icons>
				<text>首页</text>
			</view>
			<view class="nav_lef_item" @tap="onCollection">
				<uni-icons v-if="!goods.isSc" type="heart" size="22" color="#838383"></uni-icons>
				<uni-icons v-else type="heart-filled" size="22" color="red"></uni-icons>
				<text>收藏</text>
			</view>
			<view class="nav_rig_btn">
				<view class="btn color1" @tap="openBuyGood">加入购物车</view>
				<view class="btn color2" @tap="openBuyGood">立即购买</view>
			</view>
		</view>
		<buy-goods
			v-show="showBuyGood"
			:buy_good="buy_good"
			@closeBuyGood="closeBuyGood"
		></buy-goods>
		<uni-popup ref="popup" type="share" background-color="#fff">
			<view class="popup_css">
				<view class="popup_top">
					<view class="fx_item">
						<view class="fx_img">
							<image src="/static/images/goodDetail/pengy.png"></image>
						</view>
						<view class="fx_name">分享给朋友</view>
						<button class="btn" open-type="share"></button>
					</view>
					<view class="fx_item" @tap="onCreateHaibao">
						<view class="fx_img">
							<image src="/static/images/goodDetail/haibao.png"></image>
						</view>
						<view class="fx_name">生成商品海报</view>
					</view>
				</view>
				<view class="popup_bot" @tap="closeFenx">取消</view>
			</view>
		</uni-popup>
		<hai-bao ref="poster"></hai-bao>
	</view>
</template>
	
<script>
	import BuyGoods from '@/components/buy-good/buy-good.vue'
	import HaiBao from '@/components/haibao/haibao.vue'
	const {
		urlList,
		https
	} = require('@/static/api');
	export default {
		components:{
			BuyGoods,
			HaiBao
		},
		data() {
			return {
				swiperList: [
					"/static/images/index/banner.png",
					"/static/images/index/banner.png",
				],
				goods:{
					id:111,
					name:'jk制服裙正版夏季短袖衬衫格裙套装女学生学院风格全套百搭百褶裙',
					text:'精神网红小姑娘精神网红小姑娘精神网红小姑娘精神网红小姑娘精神网红小姑娘精神网红小姑娘',
					img:'/static/images/index/good.jpg',
					price:215.26,
					oldPrice:'428',
					isSc:false,
					kc:100,
					buy_num:1,
					category:[
						{id:1001,text:'27黑色'},
						{id:1002,text:'28黑色'},
						{id:1003,text:'29黑色'},
						{id:1003,text:'25黑色'},
					]
				},
				showBuyGood:false,
				buy_good:{},
			};
		},
		onLoad(options) {
			console.log('商品ID--',options.id)
			let that=this
			this.getDetial(options.id)
		},
		methods:{
			getDetial(id){
				let param={
					id:id,
					data:""
				}
				https(urlList.getDetial, 'POST', param, '获取商品信息').then(data => {
					this.goods = data.data
					console.log('请求成功', data)
				}).catch(err => {
					console.log('请求失败', err)
				})
			},
			openBuyGood(){
				this.showBuyGood= true;
				this.buy_good = this.goods
			},
			closeBuyGood(){
				this.showBuyGood= false
			},
			goIndex(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			},
			onCollection(){
				let param=
				{
					id:this.goods.id,
					data:""
				}
				https(urlList.goodsCollection, 'POST', param, '').then(data => {
					this.getDetial(this.goods.id);
				}).catch(err => {
					console.log('收藏失败', err)
				})
				this.goods.isSc = !this.goods.isSc;
			},
			onFenx(){
				this.$refs.popup.open()
			},
			closeFenx(){
				this.$refs.popup.close()
			},
			onShareAppMessage(res) {
				let id = this.goods.id;
				return {
					title: this.goods.name,
					path: "/pages/goodDetail/goodDetail?id=" + id,
					imageUrl: this.goods.img,
				};
			},
			onCreateHaibao(){
				this.$refs.poster.showCanvas();
				this.$refs.poster.title = this.goods.name;
				this.$refs.poster.subTitle = this.goods.text;
				this.$refs.poster.headerImg = 'https://oss.zhangyubk.com/%E8%8D%89%E8%8E%93%E5%8D%83%E5%B1%82.png';
				this.$refs.poster.price = this.goods.price;
				this.$refs.poster.qrcode = 'https://oss.zhangyubk.com/%E8%8D%89%E8%8E%93%E5%8D%83%E5%B1%82.png';
				// console.log(this.$refs.poster)
			},
		}
	}
</script>

<style lang="scss" scoped>
.warp{
	width: 100%;
	background-color: #F2F2F2;
	padding-bottom: 150rpx;
	display: flex;
	flex-direction: column;
	.swiper_css{
		width: 100%;
		height: 500rpx;
		.swiper-box{
			width: 100%;
			height: 100%;
		}
	}
	.top_rig_cart{
		height: 80rpx;
		width: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background-color: rgba(238,238,238,0.6);
		position: fixed;
		top: 40rpx;
		right: 20rpx;
	}
	.good_detail{
		width:700rpx;
		margin: 0 auto;
		background-color: white;
		margin-top: 30rpx;
		border-radius: 15rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		.name{
			width: 640rpx;
			// color: #272727;
			font-size:36rpx;
			margin-top:30rpx;
			display: -webkit-box;
			overflow: hidden;
			text-overflow: ellipsis;
			word-wrap: break-word;
			white-space: normal !important;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		.detail{
			font-size: 28rpx;
			color: #646464;
		}
		.price{
			width: 100%;
			height: 150rpx;
			// border: 1rpx solid red;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			.price_lef{
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin-left: 30rpx;
				.price_lef_top{
					display: flex;
					flex-direction: row;
					align-items:baseline;
					.size1{
						color: red;
						font-size: 28rpx;
					}
					.size2{
						color: red;
						font-size:40rpx;
						font-weight: bold;
					}
					.size3{
						color: #9e9e9e;
						text-decoration: line-through;
						margin-left: 29rpx;
					}
				}
				.price_lef_bot{
					color: #9e9e9e;
					font-size: 28rpx;
					margin-top:20rpx;
				}
			}
			.price_rig{
				height:60rpx;
				width: 130rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				background-color:rgba(255,0,0,0.8);
				border-top-left-radius:30rpx ;
				border-bottom-left-radius: 30rpx;
				color: white;
				font-size: 28rpx;
				image{
					height: 30rpx;
					width: 30rpx;
					margin-right: 10rpx;
				}
			}
		}
	}
	.guige{
		width:700rpx;
		margin: 0 auto;
		background-color: white;
		margin-top: 30rpx;
		border-radius: 15rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		.guige_top{
			width: 640rpx;
			margin-top: 20rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			.guige_top_lef{
				display: flex;
				flex-direction: row;
				align-items: center;
				.guige_top_lef1{
					color: #939393;
				}
				.guige_top_lef2{
					margin-left: 30rpx;
				}
			}
		}
		.guige_bot{
			width: 100%;
			display: flex;
			flex-direction: row;
			// justify-content: flex-end;
			.guige_bot_item{
				margin-top: 25rpx;
				margin-bottom: 20rpx;
				margin-left: 125rpx;
				border-radius:7rpx;
				height: 60rpx;
				width: 250rpx;
				background-color:  #F2F2F2;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28rpx;
				color: #989898;
			}
		}
	}
	.pj{
		width:700rpx;
		height: 100rpx;
		margin: 0 auto;
		background-color: white;
		margin-top: 30rpx;
		border-radius: 15rpx;
		display: flex;
		align-items: center;
		.pj_item{
			width: 640rpx;
			margin: 0 auto;
		}
	}
	.good_img{
		width:700rpx;
		height:auto;
		margin: 30rpx auto;
		background-color: white;
		// margin-top: 30rpx;
		border-radius: 15rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		.good_img_text{
			width: 100%;
			height: 100rpx;
			image{
				height: 100%;
				width: 100%;
				border-radius: 15rpx;
			}
		}
		.good_img_fwb{
			width: 100%;
			display: flex;
			justify-content: center;
			padding-bottom:30rpx;
		}
	}
	.bot_nav{
		width: 100%;
		height: 120rpx;
		background-color: white;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		position: fixed;
		bottom: 0;
		border-top: 1rpx solid #efefef;
		.nav_lef_item{
			width: 120rpx;
			height: 80rpx;
			// border: 1rpx solid red;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: center;
			font-size: 25rpx;
			color: #838383;
		}
		.nav_rig_btn{
			width:450rpx;
			height: 80rpx;
			display: flex;
			flex-direction: row;
			// border: 1rpx solid red;
			.btn{
				width: 50%;
				height: 100%;
				font-size: 29rpx;
				color: white;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.color1{
				border-top-left-radius: 40rpx;
				border-bottom-left-radius: 40rpx;
				background-color: rgb(243, 193, 28);
			}
			.color2{
				border-top-right-radius: 40rpx;
				border-bottom-right-radius:40rpx;
				background-color: rgb(239, 18, 36);
			}
		}
	}
	.popup_css{
		width: 100%;
		display: flex;
		flex-direction: column;
		.popup_top{
			width: 100%;
			height: 300rpx;
			background-color:#F2F2F2 ;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-around;
			.fx_item{
				height: 200rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				position: relative;
				.fx_img{
					height: 140rpx;
					width: 140rpx;
					border-radius: 50%;
					display: flex;
					align-items: center;justify-content: center;
					background-color: white;
					image{
						height: 70rpx;
						width: 70rpx;
					}
				}
				.fx_name{
					font-size: 29rpx;
					margin-top: 20rpx;
				}
				.btn{
					width: 100%;
					height: 100%;
					// border: 1rpx solid red;
					position: absolute;
					top: 4rpx;
					right: 0;
					box-sizing: border-box;
					// border-radius: 50%;
					opacity:0;
				}
			}
		}
		.popup_bot{
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
