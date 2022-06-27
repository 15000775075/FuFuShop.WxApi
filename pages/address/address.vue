<template>
	<view class="warp">
		<block v-if="!add">
			<view class="topSearch">
				<uni-search-bar style="width:100%;background-color: white;" v-model="searchValue"
					placeholder="请输入收货人或联系电话" radius="30" clearButton="none" @input="onSearch" />
			</view>
			<view class="address">
				<view class="a-address" v-for="(item,index) in addressList" :key="index">
					<view class="left-text" @tap="selectTap(item)">
						<view class="name-tel">
							<view class="">收货人：{{item.name}}</view>
							<view class=""> {{item.mobile}}</view>
						</view>
						<view class="address-box">
							收货地址：{{item.areaName}}{{item.address}}
						</view>
					</view>
					<view class="right-edit">
						<view class="edit_left">
							<label class="radio" @tap="setDetail(item)">
								<radio style="transform:scale(0.8);margin-left: 20rpx;" color="#FF4544"
									:checked="item.isDefault" />
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
				<view class="btn color1" @tap="addAddress">
					<uni-icons style="margin-right: 10rpx;" size="23" type="plus-filled" color="white"></uni-icons> 添加地址
				</view>
				<!-- <view class="btn color2" @tap="getAddress">
					<uni-icons style="margin-right: 10rpx;" size="23" type="navigate-filled" color="white"></uni-icons>
					自动获取
				</view> -->
			</view>
		</block>
		<block v-else>
			<view class="t_login_passList">
				<view class="input_icon">收货人</view>
				<input class="input_css" v-model="address.name" border="none"></input>
			</view>
			<view class="t_login_passList">
				<view class="input_icon">联系电话</view>
				<input class="input_css" v-model="address.mobile" type="number" maxlength="11" border="none"></input>
			</view>
			<view class="t_login_passList" @tap="onOpenSelectAddress">
				<view class="input_icon">所在地区</view>
				<input class="input_css3" v-model="address.areaName" disabled border="none"></input>
				<view class="code3">
					<uni-icons type="forward" size="20"></uni-icons>
				</view>
			</view>
			<view class="t_login_passList">
				<view class="input_icon">详细地址</view>
				<input class="input_css" v-model="address.address" type="text" border="none"></input>
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
	const {
		urlList,
		https
	} = require('@/static/api');
	export default {
		components: {
			AddressPicker
		},
		data() {
			return {
				add: false,
				searchValue: '',
				isSelect: false,
				addressList: [],
				address: {
					id: 0,
					name: '',
					mobile: '',
					address: '',
					areaId: '',
					areaName: '',
					isDefault: '',
					address: '',
				},
				type: 2
			};
		},
		onLoad(options) {
			if (options.type == 11) {
				this.add = true;
				console.log('编辑', options.address);
				if (options.address !== undefined)
					this.address = JSON.parse(options.address);
			};
			if (options.type == 1) {
				this.isSelect = true;
			};
			if (options.type == 2) {
				this.isSelect = true;
			};
			this.type = options.type;
		},
		onShow() {
			if (this.isSelect) {
				this.getAddress();
			};
		},
		methods: {
			onSearch() {
				console.log(this.searchValue)
			},
			getAddress() {
				https(urlList.getUserShip, 'post', {}, '更新地址').then(data => {
					this.addressList = data.data
				})
				// uni.chooseAddress({
				// 	success(res) {
				// 		console.log(res.userName, res.telNumber)
				// 		console.log(res.provinceName, res.cityName, res.countyName, res.detailInfo)
				// 	}
				// })
			},
			addAddress() {
				uni.navigateTo({
					url: '/pages/address/address?type=' + 11
				})
			},
			selectTap(item) {
				console.log(this.type)
				if (this.isSelect && this.type != 2) {
					let pages = getCurrentPages();
					let prevPage = pages[pages.length - 2];
					console.log(prevPage.$vm)
					prevPage.$vm.address = item;
					uni.navigateBack()
				}
			},
			editAddess(item) {
				console.log('编辑', item);
				const that = this;
				uni.navigateTo({
					url: '/pages/address/address?address=' + JSON.stringify(item) + '&type=' + 11
				})
			},
			clearAddess(id) {
				console.log('删除地址', id)
				uni.showModal({
					content: '确定要删除吗?',
					success: (res) => {
						if (!res.confirm) return;
						let param = {
							id: id,
						}
						https(urlList.removeShip, 'post', param, '删除中').then(data => {
							if (data.status == true) {
								uni.showToast({
									title: "删除成功"
								})

								this.getAddress();
							}
						})
					}
				})
			},
			setDetail(item) {
				let id = item.id;
				console.log('设为默认', id)
				let param = {
					id: id
				}
				https(urlList.setDefShip, 'post', param, '保存中').then(data => {
					if (data.status == true) {
						uni.showToast({
							title: "保存成功"
						})
						this.addressList.forEach((item) => {
							item.isDefault = false
						})
						item.isDefault = true;
					}
				})
			},
			onOpenSelectAddress() {
				this.$refs.addressPicker.show();
			},
			onOkSelectAddress(e) {
				this.address.areaId = e.code;
				this.address.areaName = e.desc;
			},
			registerOk() {
				if (this.address.name === "") {
					uni.showToast({
						title: '请输入收货人',
						icon: "error"
					})
					return;
				}
				if (this.address.mobile.length !== 11) {
					uni.showToast({
						title: '手机号码有误',
						icon: "error"
					})
					return;
				}
				if (this.address.areaId === undefined) {
					uni.showToast({
						title: '请选择地区',
						icon: "error"
					})
					return;
				}
				if (this.address.address === "") {
					uni.showToast({
						title: '请输入详细地址',
						icon: "error"
					})
					return;
				}

				let param = {
					id: this.address.id,
					address: this.address.address,
					areaId: this.address.areaId,
					isDefault: 0,
					mobile: this.address.mobile,
					name: this.address.name
				}
				https(urlList.saveUserShip, 'post', param, '保存中').then(data => {
					if (data.status == true)
						uni.showToast({
							title: "保存成功"
						})
					uni.navigateBack();
				})
				console.log('保存地址', this.address)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.warp {
		width: 100%;
		height: 100vh;
		background-color: #F7F7F7;
		display: flex;
		flex-direction: column;
		align-items: center;

		.topSearch {
			width: 100%;
			height: 110rpx;
			background-color: white;
			border-bottom: 1rpx solid #F7F7F7;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
		}

		.address {
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
						text-overflow: ellipsis;
						white-space: nowrap;
						line-height: 50rpx;
						color: #3f3f3f;
					}
				}

				.right-edit {
					width: 100%;
					height: 90rpx;
					color: #999999;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;

					.edit_left {
						display: flex;
						flex-direction: row;
						align-items: center;

						.radio {
							display: flex;
							flex-direction: row;
							align-items: center;
							font-size: 29rpx;
						}
					}

					.edit_rig {
						display: flex;
						flex-direction: row;
						align-items: center;

						.rig_change {
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

		.bot_btn {
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

			.btn {
				width: 80%;
				height: 80rpx;

				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				border-radius: 40rpx;
				color: white;
				font-size: 29rpx;

			}

			.color1 {
				background-color: #FF4544;
			}

			.color2 {
				background-color: #00aa00;
				margin-left: 20rpx;
			}
		}

		.t_login_passList {
			width: 650rpx;
			padding: 20rpx 0rpx;
			border-bottom: 1rpx solid #e6e6e6;
			display: flex;
			flex-direction: row;
			align-items: center;

			.input_icon {
				width: 200rpx;
				// border: 1px solid red;
				margin-top: 5rpx;
				display: flex;
				align-items: center;
				padding-left: 10rpx;
			}

			.input_css {
				height: 70rpx;
				width: 400rpx;
			}

			.input_css3 {
				height: 70rpx;
				width: 350rpx;
			}

			.code3 {
				margin-left: 20rpx;
				width: 50rpx;
				display: flex;
				justify-content: flex-end;
			}

		}

		.btn_css {
			width: 650rpx;
			position: fixed;
			bottom: 10rpx;
			display: block;

			.btn {
				background-color: #FF4544;
				border-radius: 50rpx;
				color: white;
			}
		}
	}
</style>
