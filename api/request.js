import global from '../global.js';

const apiPrefix = global.BASE_URL + "/api/";

/**
 * 异步Api请求
 * @param {String} apiName 
 * @param {String} method 
 * @param {Object} params 
 * @param {String} filePath 
 * @param {Function} success 
 * @param {Function} fail 
 * @param {Function} complete 
 * @returns 
 */
export const apiRequest = (apiName, method, params, success, fail, complete) => {
	let authorization = uni.getStorageSync("token");
	let requestParam = {
		url: apiPrefix + apiName,
		method: method,
		header: {
			Authorization: authorization
		},
		data: params,
		success: (res) => {
			console.log(res)
			//检查登录状态
			if (res.data.code != 1) {
				uni.redirectTo({
					url: "/pages/login/login"
				})
				return;
			}
			success && success(res);
		},
		fail: (err) => {
			uni.showToast({
				icon: "none",
				title: JSON.stringify(err)
			})
			fail && fail(err);
		},
		complete: complete
	}
	uni.request(requestParam)
}


/**
 * 同步Api请求
 * @param {String} apiName 
 * @param {String} method 
 * @param {Object} params 
 * @param {String} filePath 
 * @param {Function} success 
 * @param {Function} fail 
 * @param {Function} complete 
 * @returns 
 */
export const apiRequestSync = async (apiName, method, params) => {
	let authorization = uni.getStorageSync("token");
	let obj = {
		url: apiPrefix + apiName,
		method: method,
		header: {
			Authorization: authorization
		},
		data: params
	}
	let [error, res] = await uni.request(obj)
	//拦截请求
	if (requestFilter(apiName, error, res)) {
		// console.log('请求成功', res.data)
		return res.data;
	} else {
		uni.hideLoading()
		throw "接口发生错误"
	}
}

const requestFilter = (apiName, error, res) => {
	if (!res) {
		uni.redirectTo({
			url: "../login/login"
		})
	}
	// console.log(res);
	if (res.statusCode && res.statusCode !== 200 || res && res.data && res.data.code !== 1) {
		console.log(`错误API：${apiName}`, res)
		let code = res && res.data && res.data.code ? res.data.code : res.statusCode ? res.statusCode : 500
		let msg = res && res.data && res.data.msg ? res.data.msg : res.errMsg
		switch (code) {
			case 401:
				uni.showToast({
					icon: "none",
					title: msg
				})
				uni.redirectTo({
					url: "../login/login"
				})
				break;
			default:
				uni.showModal({
					icon: "none",
					title: msg
				})
				break;
		}
		return false
	}
	return true
}

// /**
//  * 图片上传
//  * 
//  * @param {String} apiName 
//  * @param {String} filePath 
//  * @param {Function} success 
//  * @param {Function} fail 
//  * @param {Function} complete 
//  */
// export const apiImgUpload = (apiName, filePath, success, fail, complete) => {
// 	let authorization = uni.getStorageSync("token");
// 	let requestParam = {
// 		url: apiPrefix + apiName,
// 		filePath: filePath,
// 		fileType: "image",
// 		name: 'file',
// 		header: {
// 			Authorization: authorization
// 		},
// 		success: (res) => {
// 			res.data = JSON.parse(res.data);
// 			if (res.data.code === 0) {
// 				console.log("apiRequestCode：" + res.data.code)
// 				uni.showToast({
// 					icon: "none",
// 					title: res.data.msg
// 				})
// 			}
// 			success && success(res);
// 		},
// 		fail: (err) => {
// 			console.log("接口错误：")
// 			console.log(err)
// 			uni.showToast({
// 				icon: "none",
// 				title: "请检查您的网络"
// 			})
// 			fail && fail(err);
// 		},
// 		complete: complete
// 	}
// 	// console.log(obj)
// 	uni.uploadFile(requestParam);
// }


/**
 * 图片上传
 * 
 * @param {String} apiName 
 * @param {String} filePath 
 * @param {Function} success 
 * @param {Function} fail 
 * @param {Function} complete 
 */
export const apiImgUpload = (apiName, filePath, success, fail, complete) => {
	let authorization = uni.getStorageSync("token");
	let requestParam = {
		url: apiPrefix + apiName,
		filePath: filePath,
		fileType: "image",
		name: 'file',
		header: {
			Authorization: authorization
		},
		success: (res) => {
			res.data = JSON.parse(res.data);
			if (res.data.code === 0) {
				console.log("apiRequestCode：" + res.data.code)
				uni.showToast({
					icon: "none",
					title: res.data.msg
				})
			}
			success && success(res);
		},
		fail: (err) => {
			console.log("接口错误：")
			console.log(err)
			uni.showToast({
				icon: "none",
				title: "请检查您的网络"
			})
			fail && fail(err);
		},
		complete: complete
	}
	// console.log(obj)
	var uploadTask = uni.uploadFile(requestParam);
	uploadTask.onProgressUpdate((res) => {
		console.log('上传进度' + res.progress);
		console.log('已经上传的数据长度' + res.totalBytesSent);
		console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
		// // 测试条件，取消上传任务。
		// if (res.progress > 50) {
		// 	uploadTask.abort();
		// }
		if (res.progress >= 100) {
			console.log(res);
		}
	});
}



/**
 * 多图片上传
 * 
 * @param {String} apiName 
 * @param {String} filePath 
 * @param {Function} success 
 * @param {Function} fail 
 * @param {Function} complete 
 */
export const apiImgsUpload = (apiName, files, success, fail, complete) => {
	if (!files || files.length <= 0) {
		uni.showToast({
			title: '至少上传一张图片',
			icon: 'error',
			mask: true
		})
		return;
	}
	// let index = 1;
	uni.showLoading({
		title: `上传中:0%`,
		mask: true
	})
	let authorization = uni.getStorageSync("token");
	let resImages = [];
	let requestParam = {
		url: apiPrefix + apiName,
		filePath: '',
		fileType: "image",
		name: 'file',
		header: {
			Authorization: authorization
		},
		success: (res) => {
			res.data = JSON.parse(res.data);
			// console.log(res)
			if (res.data.code === 1) {
				resImages.push(res.data.data);
				if (resImages.length === files.length) {
					uni.hideLoading();
					success && success(resImages);
				}
			} else {
				uni.hideLoading();
				fail && fail(res);
			}
		},
		fail: (err) => {
			uni.hideLoading();
			fail && fail(err);
		}
	}
	let totalProgress = files.length * 100;
	files.forEach(filePath => {
		requestParam.filePath = filePath;
		var uploadTask = uni.uploadFile(requestParam);
		uploadTask.onProgressUpdate((res) => {
			console.log('上传进度' + res.progress);
			// console.log('已经上传的数据长度' + res.totalBytesSent);
			// console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
			// progress = res.progress;
			let selfProgress = parseInt(res.progress / totalProgress * 100);

			console.log(totalProgress, selfProgress);
			uni.showLoading({
				title: `上传中:${selfProgress}%`,
				mask: true
			})
			if (res.progress >= 100) {
				// index++;
				totalProgress -= 100;
			}
		});
	});
}