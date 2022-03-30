<template>
	<view class="warp">
		<view class="top_address">
			<block v-if="tabIndex == 0">
				<input
					class="input_css"
					v-model="address.userName"
					placeholder="请输入联系人"
					border="none"
				></input>
				<input
					class="input_css"
					v-model="address.phone"
					placeholder="请输入手机号"
					border="none"
				></input>
			</block>
			<block v-else>
				<view class="select_address" @tap="selectAddress">
					<view class="name-tel">
						<view class="">收货人：{{address.userName}}</view>
						<view class=""> {{address.phone}}</view>
					</view>
					<view class="address-box">
						收货地址：{{address.address}}
					</view>
				</view>
				<view class="rig_icon" @tap="selectAddress">
					<uni-icons type="right" size="25" color="#848484"></uni-icons>
				</view>
				
			</block>
		</view>
		<view class="cen_goods">
			<view class="goods_top">
				<view class="top_top"><uni-icons type="shop-filled" color="#545454" size="24"></uni-icons> XXX商城</view>
			</view>
			<view class="goods_car">
				<view class="car_top">
					<image src="/static/images/common/car.png"></image> 配送方式
				</view>
				<view class="car_bot">
					<view
						class="tab_list" 
						v-for="(item,index) in topNavList" 
						:key="index" 
						@tap="onTopTabs(index)"
					>	
						<view class="tab_item" :class="tabIndex==index?'active':''">{{item}}</view>
					</view>
				</view>
			</view>
			<view class="goods" v-for="(item,index) in goods" :key="index">
				<image class="img_css" :src="item.img"></image>
				<view class="goods_rig">
					<view class="rig_name">{{item.name}}</view>
					<view class="rig_type">女装：26 码</view>
					<view class="rig_bot">
						<view class="bot_num">x {{item.num}}</view>
						<view class="bot_price">￥{{item.price}}</view>
					</view>
				</view>
			</view>
			<view class="yhq" @tap="openYhq">
				<view class="yhq_lef"><image src="/static/images/common/hui.png"></image> 优惠券</view>
				<view class="yhq_rig">{{selectYhqName}} <uni-icons type="right" size="22" color="#7d7d7d"></uni-icons></view>
			</view>
			<view class="yhq">
				<view class="yhq_lef">运费</view>
				<view class="yf_rig">￥0.00</uni-icons></view>
			</view>
			<view class="liuyan">
				<input
					class="input_css"
					v-model="order.liuyan"
					placeholder="买家留言"
					border="none"
				></input>
			</view>
			<view class="total_price">
				<view class="color1">共 1 件</view>
				<view class="color2">小计：</view>
				<view class="color3">￥{{totalPrice}}</view>
			</view>
		</view>
		<view style="height: 140rpx;width: 100%;"></view>
		<view class="bot_btn">
			<view class="btn_lef">合计：￥{{totalPrice}}</view>
			<view class="btn_rig" @tap="onUpOrder">提交订单</view>
		</view>
		<uni-popup ref="yhq" type="bottom">
			<view class="select_yhq">
				<view class="top_nav">
					<view class="top_name">
						<text>优惠券</text>
						<uni-icons @tap="closeYhq" type="closeempty" size="27" color="#636363"></uni-icons>
					</view>
					<view class="car_bot">
						<view
							class="tab_list" 
							v-for="(item,index) in yhqList" 
							:key="index" 
							@tap="onYhq(index)"
						>	
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
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				topNavList:['到店自提','快递配送'],
				tabIndex:0,
				address:{},
				goods:[
					{
						id:111,
						name:'jk制服裙正版夏季短袖衬衫格裙套装女学生学院风格全套百搭百褶裙',
						img:'/static/images/index/good.jpg',
						price:'215.26',
						num:1,
						selected:false,
					},
					{
						id:222,
						name:'jk制服裙正版夏季短袖衬衫格裙套装女学生学院风格全套百搭百褶裙',
						img:'/static/images/index/good.jpg',
						price:'215.26',
						num:1,
						selected:false,
					},
				],
				yhqList:['可用优惠券(0)','不可用优惠券(0)'],
				yhqIndex:0,
				yhqData:[
					{id:1001,price:20,end_time:'2022-02-30 15:20:35'},
					{id:1002,price:10,end_time:'2022-02-30 15:20:35'},
					{id:1003,price:20.20,end_time:'2022-02-30 15:20:35'},
					{id:1004,price:20.20,end_time:'2022-02-30 15:20:35'},
				],
				selectYhqName:'暂无优惠券可用',
				selectYhqPrice:0,
				selectYhqId:'',
				totalPrice:0.00,
			};
		},
		onLoad(options) {
			console.log('商品ID',JSON.parse(options.id) )
		},
		methods:{
			onUpOrder(){
				// uni.requestSubscribeMessage({
				// 	tmplIds: ['2t_x25fDv2ekqJJPfCiLj-_Sc94bT9J9XzaR3-6FlCM'],
				// 	success (res) { 
				// 		console.log('1111')
				// 	}
				// });
			},
			onTopTabs(index){
				this.tabIndex = index;
			},
			selectAddress(){
				uni.navigateTo({
					url:'/pages/address/address?type=1'
				})
			},
			openYhq(){
				this.$refs.yhq.open()
			},
			closeYhq(){
				this.$refs.yhq.close()
			},
			onYhq(index){
				this.yhqIndex = index;
			},
			changeYhq(item){
				this.selectYhqPrice = item.price;
				this.selectYhqName = `-${item.price}`;
				this.selectYhqId = item.id;
				this.$refs.yhq.close()
			}
		}
	}
</script>
<style lang="scss" scoped>
.warp{
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	.top_address{
		width: 640rpx;
		padding: 30rpx 30rpx;
		background-color: #F7F7F7;
		border-radius: 8rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		.input_css{
			width: 49%;
		}
		.select_address{
			width: 540rpx;
			display: flex;
			flex-direction: column;
			font-size: 29rpx;
			color: #4d4d4d;
			.name-tel{
				width: 100%;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				
			}
			.address-box{
				width: 100%;
				display: flex;
				flex-direction: row;
				margin-top: 20rpx;
			}
		}
		.rig_icon{
			width: 100rpx;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: flex-end;
		}
	}
	.cen_goods{
		width: 640rpx;
		padding: 0 30rpx;
		margin-top: 20rpx;
		background-color: #F7F7F7;
		border-radius: 8rpx;
		display: flex;
		flex-direction: column;
		.goods_top{
			width: 100%;
			display: flex;
			flex-direction: column;
			border-bottom: 1rpx solid #DCDCDC;
			.top_top{
				width: 100%;
				display: flex;
				flex-direction: row;
				align-items: center;
				color: #545454;
				padding: 15rpx 0rpx;
				font-size: 30rpx;
			}
		}
		.goods_car{
			width: 100%;
			display: flex;
			flex-direction: column;
			border-bottom: 1rpx solid #DCDCDC;
			.car_top{
				width: 100%;
				display: flex;
				flex-direction: row;
				align-items: center;
				color: #545454;
				padding: 10rpx 0rpx;
				margin-top: 10rpx;
				font-size: 28rpx;
				image{
					height: 50rpx;
					width: 50rpx;
				}
			}
			.car_bot{
				width: 100%;
				height: 100rpx;
				display: flex;
				flex-direction:row;
				align-items: center;
				.tab_list{
					width:30%;
					height: 100%;
					display: flex;
					flex-direction:row;
					align-items: center;
					justify-content: center;
					font-size: 29rpx;
					.tab_item{
						height:60rpx;
						width: 100%;
						border-radius: 35rpx;
						background-color: white;
						font-family: PingFangSC-Ultralight,ans-serif;
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: center;
						margin-right: 20rpx;
					}
					.active{
						color: white;
						background-color:#FF4544;
					}
				}
			}
		}
		.goods{
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx 0;
			border-bottom: 1rpx solid #DCDCDC;
			.img_css{
				height: 150rpx;
				width: 150rpx;
			}
			.goods_rig{
				width: 450rpx;
				display: flex;
				flex-direction: column;
				// border: 1rpx solid red;
				.rig_name{
					width: 100%;
					font-size:30rpx;
					color: #4c4c4c;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				}
				.rig_type{
					font-size:29rpx;
					margin-top: 30rpx;
					color: #7d7d7d;
				}
				.rig_bot{
					width: 100%;
					margin-top: 5rpx;
					color: #7d7d7d;
					font-size:29rpx;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;
					.bot_price{
						color: #303030;
						font-size: 30rpx;
					}
				}
			}
		}
		.yhq{
			width: 100%;
			padding: 30rpx 0;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			.yhq_lef{
				display: flex;
				flex-direction: row;
				align-items: center;
				font-size: 29rpx;
				image{
					height:37rpx;
					width:37rpx;
					color: #474747;
					margin-right: 10rpx;
				}
			}
			.yhq_rig{
				display: flex;
				font-size: 29rpx;
				flex-direction: row;
				align-items: center;
				color: #7d7d7d;
			}
			.yf_rig{
				color: #FF4544;
			}
		}
		.liuyan{
			width: 100%;
			padding:30rpx 0;
			border-top: 1rpx solid #DCDCDC;
			border-bottom: 1rpx solid #DCDCDC;
		}
		.total_price{
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: flex-end;
			padding: 20rpx 0;
			.color1{
				font-size: 28rpx;
				color: #949494; 
			}
			.color2{
				font-size: 29rpx;
				color: #434343; 
				margin-left: 15rpx;
			}
			.color3{
				font-size: 28rpx;
				color:#FF4544;
			}
		}
	
	}
	.bot_btn{
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
		.btn_lef{
			color: #FF4544;
			font-size: 29rpx;
			margin-left: 30rpx;
		}
		.btn_rig{
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
	.select_yhq{
		width: 100%;
		height:700rpx;
		overflow: hidden;
		background-color: #F7F7F7;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		.top_nav{
			width: 100%;
			height:200rpx;
			background-color: white;
			display: flex;
			flex-direction: column;
			align-items: center;
			.top_name{
				width: 90%;
				height: 100rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
			}
			.car_bot{
				width: 90%;
				height: 100rpx;
				display: flex;
				flex-direction:row;
				align-items: center;
				justify-content: center;
				.tab_list{
					width:40%;
					height: 100%;
					display: flex;
					flex-direction:row;
					align-items: center;
					justify-content: center;
					font-size: 29rpx;
					.tab_item{
						height:60rpx;
						width: 100%;
						border-radius: 35rpx;
						background-color: #F7F7F7;
						font-family: PingFangSC-Ultralight,ans-serif;
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: center;
						margin-right: 20rpx;
					}
					.active{
						color: white;
						background-color:#FF4544;
					}
				}
			}
		}
		.bot_list{
			height: 500rpx;
			width: 100%;
			overflow-y: auto;
			display: flex;
			flex-direction: column;
			align-items: center;
			.coupon-item {
				width:90%; 
				height:auto; 
				background-color: white;
				display:table; 
				border-radius:10upx; 
				padding:0 20upx; 
				margin-top:12upx; 
				margin-bottom: 10rpx;
				border:1px solid #eeeeee; 
				position:relative;
				.coupon-money {
					width:465upx; 
					height:auto; 
					display:table; 
					float:left; 
					padding:26upx 0; 
					border-style:none dotted none none; 
					border-color:#eeeeee;
					.demand { 
						width:100%; 
						height:30upx; 
						line-height:30upx; 
						font-size:24upx; 
						color:#999999; 
					}
					.layof { 
						width:100%; 
						height:48upx; 
						line-height:30upx; 
						font-size:44upx; 
						color:#ff9000; 
						font-weight:bold; 
					}
				}
				.get-btn { 
					width:146upx; 
					height:52upx; 
					line-height:50upx; 
					position:absolute; 
					top:50%; 
					right:26upx; 
					margin-top:-26upx; 
					text-align:center; 
					border-radius:60upx; 
					color:#ff9000; 
					border:1px solid #ff9000; 
					font-size:24upx; 
					float:right; 
				}
			}
			.coupon-item:after { 
				width:40upx; 
				height:20upx; 
				position:absolute; 
				left:460upx; 
				top:-1px; 
				border-radius:0 0 40upx 40upx; 
				content:""; 
				display:block; 
				background:#F7F7F7; 
				border:1px solid #eeeeee; 
				border-top:0px; 
			}
			.coupon-item:before { 
				width:40upx; 
				height:20upx; 
				position:absolute; 
				left:460upx;
				bottom:-1px; 
				border-radius:40upx 40upx 0 0; 
				content:""; 
				display:block; 
				background:#F7F7F7; 
				border:1px solid #eeeeee; 
				border-bottom:0px; 
			}
			.no_goods{
				display: flex;
				flex-direction: column;
				align-items: center;
				margin: 0 auto;
				font-size: 30rpx;
				color: #9d9d9d;
				image{
					width: 300rpx;
					height: 300rpx;
					margin-bottom: 10rpx;
				}
			}
		}
	}
	

}
</style>
