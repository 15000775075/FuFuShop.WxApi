<template>
	<view class="warp">
		<view class="top_list">
			<view class="top_tab">
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				topNavList:['收入','支出'],
				tabIndex:0,
			};
		},
		methods:{
			onTopTabs(index){
				this.tabIndex = index;
			},
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
	.top_list{
		width: 100%;
		background-color: white;
		position: sticky;
		top: 0;
		display: flex;
		flex-direction: column;
		.top_tab{
			width: 100%;
			height: 100rpx;
			display: flex;
			flex-direction:row;
			align-items: center;
			justify-content: center;
			.tab_list{
				width: 18%;
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
					font-family: PingFangSC-Ultralight,ans-serif;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;
				}
				.active{
					color: white;
					background-color:#FF4544;
				}
			}
		}
	}
}
</style>
