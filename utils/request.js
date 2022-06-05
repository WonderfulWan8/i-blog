const BASE_URL = 'https://api.imooc-blog.lgdsunday.club/api';
/**
 * @param {*} {url,data}  
 */
function request({url, data, method}){
	return new Promise((resolve, reject) => {
	  uni.request({
	    url: BASE_URL + url,
		header:{
			icode: "ED3C54FD4E23C2E2",
		},
	    data,
	    method,
	    success: ( {data, statusCode, header} ) => {
	    	if(data.success){
				// 请求成功
				resolve(data);
			}else{
				// 请求失败,展示提示信息
				uni.showToast({
					title:data.message,
					icon: 'none',
					mask: true,
					duration: 3000//3秒
				});
				reject(data.message);
			}
	    },
		fail: (error) => {
			reject(error);
		}
	  });
	});
}
export default request;
