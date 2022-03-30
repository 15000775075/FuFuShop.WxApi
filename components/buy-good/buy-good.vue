<template>
	<view class="bg">
		<view class="buyGood">
			<view class="buy_content">
				<view class="buy_top">
					<image src="/static/images/index/good.jpg"></image>
					<view class="buy_top_cen">
						<view class="buy_top_cen_price">￥{{buy_good.price}}</view>
						<view class="buy_top_cen_kc">库存: {{buy_good.kc}}</view>
					</view>
					<view class="buy_top_rig">
						<uni-icons @tap="closeBuyGood" style="margin-top: 20rpx;" type="closeempty" size="27" color="#c8c8c8"></uni-icons> 
					</view>
				</view>
				<view class="buy_category">
					<block
						v-for="(item,index) in buy_good.category"
						:key="index"
					>
						<view 
							class="buy_category_item"
							:class="selectIndex==index?'active':''"
							@tap="selectCategory(item.id,index)"
						>
							{{item.text}}
						</view>
					</block>
				</view>
				<view class="buy_num">
					<view class="buy_num_lef">数量</view>
					<uni-number-box :min="1" :max="buy_good.kc" v-model="buy_good.buy_num"></uni-number-box>
				</view>
				<view class="buy_btn">
					<view class="buy_btn_a buy_btn_lef" @tap="handleComfig(1)">加入购物车</view>
					<view class="buy_btn_a buy_btn_rig" @tap="handleComfig(2)">立即购买</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: 'buy-good',
		props: {
			buy_good: {
				type: Object,
				default: {}
			},
		},
		data() {
			return {
				selectIndex:0,
			};
		},
		methods: {
			handleComfig(type){
				if(type == 1){
					console.log('加入购物车')
				}else{
					let id = [];
					id.push(this.buy_good.id)
					uni.navigateTo({
						url:'/pages/nowBuy/nowBuy?id='+JSON.stringify(id)
					})
				}
				console.log(this.buy_good)
			},
			closeBuyGood(){
				this.$emit('closeBuyGood')
			},
			selectCategory(id,index){
				this.selectIndex = index;
			}
		}
	}
</script>
<style lang="scss" scoped>
	.bg{
		height: 100vh;
		width: 100%;
		background: rgba(0, 0, 0, .4);
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 99999;
	}
	.buyGood{
		width: 100%;
		height: auto;
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		background-color: white;
		border-top-left-radius: 10rpx;
		border-top-right-radius: 10rpx;
		display: flex;
		justify-content: center;
		z-index: 999999;
		.buy_content{
			width: 680rpx;
			// height: 692rpx;
			display: flex;
			flex-direction: column;
			.buy_top{
				width: 100%;
				height: 140rpx;
				display: flex;
				flex-direction: row;
				image{
					height: 200rpx;
					width: 200rpx;
					margin-top: -80rpx;
					border:7rpx solid white;
					border-radius: 7rpx;
				}
				.buy_top_cen{
					width:386rpx;
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					font-size: 31rpx;
					.buy_top_cen_price{
						color: red;
						margin-left: 20rpx;
					}
					.buy_top_cen_kc{
						color: #999999;
						margin-top: 10rpx;
						margin-left: 20rpx;
					}
				}
				.buy_top_rig{
					width: 80rpx;
					height: 100%;
					// border: 1rpx solid red;
					display: flex;
					justify-content: flex-end;
				}
			}
			.buy_category{
				width: 100%;
				height:300rpx;
				overflow-y: auto;
				border-bottom: 1rpx solid #ebebeb;
				border-top: 1rpx solid #ebebeb;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				align-content: flex-start;
				color: #3b3b3b;
				.buy_category_item{
					height: 70rpx;
					display: flex;
					font-size: 28rpx;
					align-items: center;
					padding: 0 20rpx 0 20rpx;
					background-color: #f8f8f8;
					border: 1rpx solid #f8f8f8;
					border-radius: 15rpx;
					margin-right: 20rpx;
					margin-top: 20rpx;
				}
				.active{
					border: 1rpx solid rgb(250, 93, 87);
					background-color: rgba(221,82,77,0.1);
					color: rgb(250, 93, 87);
				}
			}
			.buy_num{
				width: 100%;
				height:100rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				// border: 1rpx solid red;
				.buy_num_lef{
					color: #3d3d3d;
				}
			}
			.buy_btn{
				height: 150rpx;
				width: 100%;
				// border: 1rpx solid red;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				.buy_btn_a{
					width: 46%;
					height: 80rpx;
					font-size: 29rpx;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;
					border-radius: 50rpx;
					color: white;
				}
				.buy_btn_lef{
					background-color: rgb(243, 193, 28);
				}
				.buy_btn_rig{
					background-color: rgb(239, 18, 36);
				}
			}
		}
	}
</style>
