<template>
	<view class="warp">
		<view class="top_search">
			<uni-search-bar 
				style="width:100%"
				v-model="searchValue" 
				placeholder="订单号/商品名/收货人姓名/联系电话"
				radius="30"
				clearButton="none"
				cancelButton="none"
			/>
		</view>
		<view class="top_search_time">
			<view class="lef_time_lef">下单时间</view>
			<view class="lef_time_rig">
				<uni-datetime-picker
					style="width: 650rpx"
					v-model="searchTime"
					type="daterange"
					rangeSeparator="至"
				/>
			</view>
		</view>
		<view class="bot_goods">
			<block v-if="orders.length > 0">
				<view v-for="(item,index) in orders" :key="index" class="orders_item">
					<view class="item_good">
						<image :src="item.img" @tap="goGoodDetail(item.id)"></image>
						<view class="good_rig">
							<view class="good_rig_name">{{item.name}}</view>
							<view class="good_rig_category">{{item.category}}</view>
						</view>
					</view>
					<view class="item_price">
						共{{item.num}} 件商品  实付款：￥{{item.totalPrice}}
					</view>
					<view class="item_price">
						<view class="btn" @tap="onLookFp(item.id)">查看发票</view>
						<view class="btn">评价晒单</view>
						<view class="btn color1" @tap="goGoodDetail(item.id)">再次购买</view>
					</view>
				</view>
			</block>
			<view v-else class="cen_goods">
				<view class="no_goods">
					<image src="/static/images/common/no.png"></image>
					<text>暂无相关订单</text>
				</view>
			</view>
		</view>
		<view class="bot_btn">
			<view class="search_btn" @tap="onSearch(1)">重置</view>
			<view class="search_btn color1" @tap="onSearch(2)">搜索</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchValue:'',
				searchTime:'',
				orders:[
					{
						id:111,
						name:'jk制服裙正版夏季短袖衬衫格裙套装女学生学院风格全套百搭百褶裙',
						img:'/static/images/index/good.jpg',
						price:'215.26',
						num:2,
						totalPrice:'430.32',
						category:'27黑色 （9956款）',
					},
					{
						id:111,
						name:'jk制服裙正版夏季短袖衬衫格裙套装女学生学院风格全套百搭百褶裙',
						img:'/static/images/index/good.jpg',
						price:'215.26',
						num:2,
						totalPrice:'430.32',
						category:'27黑色 （9956款）',
					},
					{
						id:111,
						name:'jk制服裙正版夏季短袖衬衫格裙套装女学生学院风格全套百搭百褶裙',
						img:'/static/images/index/good.jpg',
						price:'215.26',
						num:2,
						totalPrice:'430.32',
						category:'27黑色 （9956款）',
					},
					{
						id:111,
						name:'jk制服裙正版夏季短袖衬衫格裙套装女学生学院风格全套百搭百褶裙',
						img:'/static/images/index/good.jpg',
						price:'215.26',
						num:2,
						totalPrice:'430.32',
						category:'27黑色 （9956款）',
					},
					{
						id:111,
						name:'jk制服裙正版夏季短袖衬衫格裙套装女学生学院风格全套百搭百褶裙',
						img:'/static/images/index/good.jpg',
						price:'215.26',
						num:2,
						totalPrice:'430.32',
						category:'27黑色 （9956款）',
					},
					{
						id:111,
						name:'jk制服裙正版夏季短袖衬衫格裙套装女学生学院风格全套百搭百褶裙',
						img:'/static/images/index/good.jpg',
						price:'215.26',
						num:2,
						totalPrice:'430.32',
						category:'27黑色 （9956款）',
					},
									
				],
			};
		},
		methods:{
			onSearch(num){
				if(num == 1){
					this.searchValue = '';
					this.searchTime = '';
				}else{
					console.log('搜索',this.searchValue,this.searchTime)
				}
			},
			goGoodDetail(id){
				uni.navigateTo({
					url:'/pages/goodDetail/goodDetail?id='+id
				})
			},
			onLookFp(id){
				uni.navigateTo({
					url:'/pages/orders-fp/orders-fp?id='+id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.warp{
	width: 100%;
	height: 100vh;
	background-color:#F7F7F7;
	display: flex;
	flex-direction: column;
	align-items: center;
	.top_search{
		width: 100%;
		height: 100rpx;
		background-color:white;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.top_search_time{
		width: 100%;
		height: 160rpx;
		background-color:white;
		display: flex;
		flex-direction: column;
		align-items: center;
		.lef_time_lef{
			width: 700rpx;
			margin-top: 20rpx;
			display: flex;
			font-size: 29rpx;
			color: #464646;
		}
		.lef_time_rig{
			width:700rpx;
			margin-top: 10rpx;
		}
	}
	.bot_goods{
		width: 720rpx;
		height: calc(100vh - 261rpx);
		padding-bottom: 100rpx;
		// // border: 1rpx solid red;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		.orders_item{
			margin: 20rpx auto;
			width:680rpx;
			background-color: white;
			border-radius: 10rpx;
			padding: 20rpx 20rpx 0rpx 20rpx;
			display: flex;
			flex-direction: column;
			.item_good{
				width: 100%;
				height: 200rpx;
				background-color: #F8F8F8;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				image{
					height: 150rpx;
					width: 150rpx;
				}
				.good_rig_name{
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
				.good_rig_category{
					width: 480rpx;
					font-size: 26rpx;
					color: #555555;
					display: -webkit-box;
					overflow: hidden;
					text-overflow: ellipsis;
					word-wrap: break-word;
				}
			}
			.item_price{
				width: 100%;
				padding: 20rpx 0rpx 20rpx 0rpx;
				font-size: 29rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: flex-end;
			}
			.btn{
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
			.color1{
				border: 1rpx solid red;
				color: red;
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
	.bot_btn{
		width: 100%;
		height: 100rpx;
		position: fixed;
		bottom: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: white;
		.search_btn{
			width: 50%;
			height:100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.color1{
			background-color: #FF4544;
			color: white;
		}
	}
}
</style>
