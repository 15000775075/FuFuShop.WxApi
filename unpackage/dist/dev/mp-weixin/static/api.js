//const serverUrl = 'https://api.fufuchaoshi.com/api/';
const serverUrl = 'http://127.0.0.1/api/';
const urlList = {

	//微信登录
	wxlogin: serverUrl + 'User/OnLogin',
	getUser: serverUrl + 'User/GetUserInfo',

	//商品收藏
	goodsCollectionCreateOrDelete: serverUrl + 'User/GoodsCollectionCreateOrDelete',
	goodsCollectionList: serverUrl + 'User/GoodsCollectionList',

	//足迹
	addGoodsBrowsing: serverUrl + 'User/AddGoodsBrowsing',
	getGoodsbrowsing: serverUrl + 'User/Goodsbrowsing',
	delGoodsbrowsing: serverUrl + 'User/DelGoodsbrowsing',

	//广告
	getAdvertList: serverUrl + 'Advert/GetAdvertList',

	//公告
	noticeList: serverUrl + 'Notice/NoticeList',

	//商品分类
	getAllCategories: serverUrl + 'Good/GetAllCategories',

	//获取推荐商品
	getGoodsRecommendList: serverUrl + 'Good/GetGoodsRecommendList',

	//商品
	getGoodsPageList: serverUrl + 'Good/GetGoodsPageList',
	getGoodsComment: serverUrl + 'Good/GetGoodsComment',
	getDetial: serverUrl + 'Good/GetDetial',

	//购物车
	addCart: serverUrl + 'Cart/AddCart',
	getCartList: serverUrl + 'Cart/GetList',
	getCartDtoData: serverUrl + 'Cart/GetCartDtoData',
	doDelete: serverUrl + 'Cart/DoDelete',
	setCartNum: serverUrl + 'Cart/SetCartNum',

	//收货地址
	getUserDefaultShip: serverUrl + 'User/GetUserDefaultShip',
	setDefShip: serverUrl + 'User/SetDefShip',
	getUserShip: serverUrl + 'User/GetUserShip',
	saveUserShip: serverUrl + 'User/SaveUserShip',
	getShipDetail: serverUrl + 'User/GetShipDetail',
	removeShip: serverUrl + 'User/RemoveShip',

	//订单
	createOrder: serverUrl + 'Order/CreateOrder',
	getOrderList: serverUrl + 'Order/GetOrderList',
	cancelOrder: serverUrl + 'Order/CancelOrder',
	getOrderStatusNum: serverUrl + 'Order/GetOrderStatusNum',
	orderDetails: serverUrl + 'Order/OrderDetails',
	orderConfirm: serverUrl + 'Order/OrderConfirm',
	logisticsByApi: serverUrl + 'Order/LogisticsByApi',
	// 订单评价接口


};
/**
 * @param {请求地址} url 
 * @param {请求方式} urltype 
 * @param {token} token 
 * @param {请求数据} data 
 * @param {loading内容} text 
 */
const request = (url, urltype, data, text) => {
	if (text) {
		uni.showLoading({
			title: text,
			mask: true
		})
	};
	let token = uni.getStorageSync('token');
	return new Promise((reslove, reject) => {
		uni.request({
			url: url,
			method: urltype.toUpperCase(),
			data: data,
			header: {
				'content-type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			dataType: 'json',
			success(request) {
			
				if (request.data.code === 401) {
					uni.clearStorageSync("token");
					uni.clearStorageSync("user_info");
					uni.showModal({
						title: request.data.msg,
						confirmText: "去登录",
						cancelText: "暂不登录",
						success(isSure) {
							if (isSure.confirm)
								uni.reLaunch({
									url: "/pages/my/my?isLogin=1"
								})
							else if (isSure.cancel && url.toLowerCase().indexOf("cart/") <=0){}
								uni.navigateBack()
							
						}
					})
				} else if (request.data.status !== true) {
					uni.showToast({
						title: request.data.msg,
						icon: "error"
					})
					return;
				}
				reslove(request.data);
			},
			fail(err) {
				reject('系统错误');
			},
			complete: function() {
				if (text) {
					uni.hideLoading();
				};
				uni.stopPullDownRefresh();
			} //请求完成后执行的函数
		})
	})
};
module.exports = {
	urlList,
	https: request,
};
