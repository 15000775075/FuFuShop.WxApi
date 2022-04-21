//const serverUrl = 'http://localhost/api/';
const serverUrl = 'http://114.132.200.253:8081/api/';
const urlList = {
	//微信登录
	wxlogin: serverUrl + 'User/OnLogin',
	//商品收藏
	goodsCollection:serverUrl+'User/GoodsCollection',
	//广告
	getAdvertList: serverUrl + 'Advert/GetAdvertList',
	//获取商品
	getGoodsRecommendList: serverUrl + 'Good/GetGoodsRecommendList',
	//获取商品分类
	getAllCategories: serverUrl + 'Good/GetAllCategories',
	//分页获取商品列表
	getGoodsPageList: serverUrl + 'Good/GetGoodsPageList',
	getDetial: serverUrl + 'Good/GetDetial',
	//购物车
	addCart: serverUrl + 'Cart/AddCart',
	getList: serverUrl + 'Cart/GetList',
	doDelete: serverUrl + 'Cart/DoDelete',
	setCartNum: serverUrl + 'Cart/SetCartNum',
	

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
				console.log('asdasdasd', request)
				if (request.data.code === 401) {
					uni.clearStorageSync("token");
					uni.clearStorageSync("user_info");
					uni.showModal({
						title: request.data.msg,
					})
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
