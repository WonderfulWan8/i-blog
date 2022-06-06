import request from "../utils/request.js"

/**
 * 热搜文章类型
 */
export function getHotTabs(){
	return request({
		url: '/hot/tabs'
	})
}

/**
 * 热搜文章列表
 * @param{*} type
 * @returns
 */
export function getHotListFormTabType(type){
	return request({
		url: '/hot/list',
		data:{
			type
		}
	})
}