<template>
	<view class="warp">
		<block v-if="!add">
			<view class="topSearch">
				<uni-search-bar
					style="width:100%;background-color: white;"
					v-model="searchValue" 
					placeholder="请输入收货人或联系电话"
					radius="30"
					clearButton="none"
					@input="onSearch"
				/>
			</view>
			<view class="address">
				<view class="a-address" v-for="(item,index) in addressList" :key="index">
					<view class="left-text" @tap="selectTap(item)">
						<view class="name-tel">
							<view class="">收货人：{{item.userName}}</view>
							<view class=""> {{item.phone}}</view>
						</view>
						<view class="address-box">
							收货地址：{{item.address}}{{item.xxAddress}}
						</view>
					</view>
					<view class="right-edit">
						<view class="edit_left">
							<label class="radio" @tap="setDetail(item.id)">
								 <radio 
									style="transform:scale(0.8);margin-left: 20rpx;" 
									color="#FF4544" 
									:checked="item.isDetail" 
								/>
								<text>设为默认</text>
							</label>
						</view>
						<view class="edit_rig">
							<view class="rig_change" @tap="editAddess(item)">
								<uni-icons type="compose" color="#b0b0b0" size="23">></uni-icons> 编辑
							</view>
							<view class="rig_change" @tap="clearAddess(item.id)">
								<uni-icons type="trash" color="#b0b0b0" size="23"></uni-icons> 删除
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="bot_btn">
				<view class="btn color1" @tap="addAddress"> <uni-icons style="margin-right: 10rpx;" size="23" type="plus-filled" color="white"></uni-icons> 手动添加</view>
				<view class="btn color2" @tap="getAddress"> <uni-icons style="margin-right: 10rpx;" size="23" type="navigate-filled" color="white"></uni-icons> 自动获取</view>
			</view>
		</block>
		<block v-else>
			<view class="t_login_passList">
				<view class="input_icon">收货人</view>
				<input
					class="input_css"
					v-model="address.userName"
					border="none"
				></input>
			</view>
			<view class="t_login_passList">
				<view class="input_icon">联系电话</view>
				<input
					class="input_css"
					v-model="address.phone"
					type="number"
					border="none"
				></input>
			</view>
			<view class="t_login_passList" @tap="onOpenSelectAddress">
				<view class="input_icon">所在地区</view>
				<input
					class="input_css3"
					v-model="address.address"
					disabled
					border="none"
				></input>
				<view class="code3">
					<uni-icons type="forward" size="20"></uni-icons>
				</view>
			</view>
			<view class="t_login_passList">
				<view class="input_icon">详细地址</view>
				<input
					class="input_css"
					v-model="address.xxAddress"
					type="number"
					border="none"
				></input>
			</view>
			<view class="btn_css">
				<button class="btn" @tap="registerOk">保存地址</button>
			</view>
		</block>
		<address-picker ref="addressPicker" @confirm="onOkSelectAddress"></address-picker>
	</view>
</template>

<script>
import AddressPicker from '@/components/addressPicker/addressPicker.vue'
	export default {		
		components: {		
			AddressPicker
		},
		data() {
			return {
				add:false,
				searchValue:'',
				isSelect:false,
				addressList: [{
						id: 1110,
						userName: '小明',
						phone: '13243489883',
						isDetail:false,
						address: '北京市西城区动物园',
						xxAddress:'一区二号'
					},
					{
						id: 2220,
						userName: '小红',
						phone: '10010',
						isDetail:true,
						address: '北京市海淀区植物园',
						xxAddress:'一区二号'
					},
					{
						id: 33330,
						userName: '小刚',
						phone: '13243489883',
						isDetail:false,
						address: '广东省广州长隆动物园',
						xxAddress:'一区二号'
					
					},
					{
						id: 4440,
						userName: '小刚',
						phone: '13243489883',
						isDetail:false,
						address: '广东省广州长隆动物园',
						xxAddress:'一区二号'
					
					},
				],
				address:{
					userName:'',
					phone:'',
					address:'',
					xxAddress:'',
				}
			};
		},
		onLoad(options) {
			if(options.type == 11){
				this.add = true;
			};
			if(options.type == 1){
				this.isSelect = true;
			};
		},
		methods:{
			onSearch(){
				console.log(this.searchValue)
			},
			getAddress(){
				uni.chooseAddress({
					success(res) {
						console.log(res.userName,res.telNumber)
						console.log(res.provinceName,res.cityName,res.countyName,res.detailInfo)
					}
				})
			},
			addAddress(){
				uni.navigateTo({
					url:'/pages/address/address?type='+11
				})
			},
			selectTap(item) {
				if(this.isSelect){
					let pages = getCurrentPages();
					let prevPage = pages[pages.length - 2];
					console.log(prevPage.$vm)
					prevPage.$vm.address = item;
					uni.navigateBack()
				}
			},
			editAddess(item) {
				console.log('编辑',item);
				const that = this;
				uni.navigateTo({
					url:'/pages/address/address?type='+11,
					success() {
						that.address = item;
					}
				})
			},
			clearAddess(id){
				console.log('删除地址',id)
				uni.showModal({
					content:'确定要删除吗?',
					success: function (res) {
						if (res.confirm) {
							uni.showToast({
								title:'删除成功',
								icon:'none',
								duration:1500
							})	
						}
					}
				})
			},
			setDetail(id){
				console.log('设为默认',id)
			},
			onOpenSelectAddress(){
				this.$refs.addressPicker.show();
			},
			onOkSelectAddress(e){
				this.address.address = e;
			},
			registerOk(){
				console.log('保存地址',this.address)
			}
		}
	}
</script>

<style lang="scss" scoped>
.warp{
	width: 100%;
	height: 100vh;
	background-color: #F7F7F7;
	display: flex;
	flex-direction: column;
	align-items: center;
	.topSearch{
		width: 100%;
		height: 110rpx;
		background-color: white;
		border-bottom: 1rpx solid #F7F7F7;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	.address{
		height: calc(100vh - 260rpx);
		width: 100%;
		overflow-y: auto;
		// border: 1rpx solid red;
		display: flex;
		flex-direction: column;
		align-items: center;
		.a-address {
			width: 720upx;
			background-color: white;
			border-radius: 10rpx;
			// border: 1rpx solid red;
			margin-bottom: 25rpx;
			margin-top: 10rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			.left-text {
				width: 670upx;
				margin-top: 20rpx;
				padding-bottom: 20rpx;
				border-bottom: 1upx solid #eee;
				display: flex;
				flex-direction: column;
				.name-tel {
					width: 100%;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 25upx;
				}
				.address-box {
					width: 100%;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					line-height:50rpx;
					color: #3f3f3f;
				}
			}
			.right-edit {
				width: 100%;
				height:90rpx;
				color: #999999;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				.edit_left{
					display: flex;
					flex-direction: row;
					align-items: center;
					.radio{
						display: flex;
						flex-direction: row;
						align-items: center;
						font-size: 29rpx;
					}
				}
				.edit_rig{
					display: flex;
					flex-direction: row;
					align-items: center;
					.rig_change{
						display: flex;
						flex-direction: row;
						align-items: center;
						margin-right: 25rpx;
						font-size: 29rpx;
					}
				}
			}
		}
	}
	.bot_btn{
		width: 100%;
		height: 140rpx;
		border-top: 1rpx solid #d6d6d6;
		position: fixed;
		bottom: 0rpx;
		background-color: white;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		.btn{
			width: 40%;
			height: 80rpx;
			
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			border-radius: 40rpx;
			color: white;
			font-size: 29rpx;
			
		}
		.color1{
			background-color: #FF4544;
		}
		.color2{
			background-color: #00aa00;
			margin-left: 20rpx;
		}
	}
	.t_login_passList{
			width:650rpx;
			padding: 20rpx 0rpx;
			border-bottom: 1rpx solid #e6e6e6;
			display: flex;
			flex-direction: row;
			align-items: center;
			.input_icon{
				width: 200rpx;
				// border: 1px solid red;
				margin-top: 5rpx;
				display: flex;
				align-items: center;
				padding-left: 10rpx;
			}
			.input_css{
				height: 70rpx;
				width:400rpx;
			}
			.input_css3{
				height: 70rpx;
				width: 350rpx;
			}
			.code3{
				margin-left: 20rpx;
				width: 50rpx;
				display: flex;
				justify-content: flex-end;
			}
			
		}
		.btn_css{
			width: 650rpx;
			position: fixed;
			bottom: 10rpx;
			display: block;
			.btn{
				background-color: #FF4544;
				border-radius:50rpx;
				color: white;
			}
		}
}
</style>
