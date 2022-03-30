const serverUrl = 'https://www.fufuchaoshi.com'; 
const urlList = {
	//微信登录
	wxlogin: serverUrl + '/user/wxlogin',
};
/**
 * @param {请求地址} url 
 * @param {请求方式} urltype 
 * @param {token} token 
 * @param {请求数据} data 
 * @param {loading内容} text 
 */
const request = (url,urltype,data,text) => {
	if(text){
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
                'Authorization':`Bearer ${token}`                     
            },
			dataType:'json',
            success(request) {
				reslove(request.data);
            },
            fail(err) {
				reject('系统错误');
            },
            complete: function () { 
				if(text){
					uni.hideLoading();
				};
				uni.stopPullDownRefresh();
            }//请求完成后执行的函数
        })
    })
};
module.exports = {
    urlList,
    https: request,
};