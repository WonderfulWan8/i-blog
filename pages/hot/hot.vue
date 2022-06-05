<template>
	<view class="hot-container">
		<!-- @相当于当前项目的根目录 -->
		<image class="logo" src="@/static/mclogo.png" mode="aspectFit"></image>
		<view class="search-box">
			<my-search placeholderText="uni-1app 自定义搜索组件"></my-search>
		</view>
		 <!-- tabs -->
		<my-tabs 
		:tabData="tabData"
		:defaultIndex="0"
		@tabClick="test('',index)"
		>
			<!-- 
				vue :tabData="tabData"
				小程序 data-tableData="{{tabData}}"
			 -->
		</my-tabs>
	</view>
</template>

<script>
import { getHotTabs } from 'api/hot'
	export default {
		data() {
			return {
				tabData: {},
			};
		},
		methods:{
			// 获取 热搜文章类型 
			async loadHotTabs(){
				const { data:res } = await getHotTabs();// res = 返回值.data
				this.tabData = res.list;
				console.log("this.tabData:",this.tabData);
			},
			test(text,index){
				console.log("loadindex:",index);
			}
		},
		components:{
			
		},
		created(){
			// 组件实现配置，dom未加载
			this.loadHotTabs();
		}
	}
</script>

<style lang="scss" scoped>
.hot-container{
	background-color: $uni-bg-color;
	.logo{
		width: 100%;
		height: 80px;
	}
	.search-box{
		padding: 0 16px;
		margin-bottom: $uni-spacing-col-base;
	}
}
</style>
