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
		:defaultIndex="currentIndex"
		@tabClick="onTabClick"
		>
		<!-- :config="{textColor:'#00ff00',activeTextColor:'#ff00ff'}" -->
			<!-- 
				vue :tabData="tabData"
				小程序 data-tableData="{{tabData}}"
			 -->
		</my-tabs>
		<view>
			<uni-load-more status="loading" v-if="isLoading"/>
			<!-- list视图 -->
			<!-- 1.使用mock数据，构建List组件的基本结构 2.美化样式 3.根据tab切换获取真实数据 
			4.渲染真实数据 5.让list具有左右切换的能力 6.完成list与tabs联动的能力 -->
			<block v-else>
				<hot-list-item 
				v-for="(item, index) in listData[currentIndex]" 
				:key="index"
				:data="item"
				:ranking="index+1"
				></hot-list-item>
			</block>
		</view>
	</view>
</template>

<script>
import { getHotTabs, getHotListFormTabType } from 'api/hot'
	export default {
		data() {
			return {
				tabData: [],
				currentIndex: 0,//激活项
				isLoading: true,
				listData:[],
			};
		},
		methods:{
			// 获取 热搜文章类型 
			async loadHotTabs(){
				const { data:res } = await getHotTabs();// res = 返回值.data
				this.tabData = res.list;
				// 获取list后再执行，需要tab中的id
				this.loadHotListFormTab();
			},
			// 获取 list列表数据,进入页面时调用,点击切换tab时调用
			async loadHotListFormTab(){
				console.log("1234");
				if(!this.listData[this.currentIndex]){
					this.isLoading = true;
					const id = this.tabData[this.currentIndex].id;
					const { data: res } = await getHotListFormTabType(id);// res = 返回值.data
					this.listData[this.currentIndex] = res.list;
					this.isLoading = false;
				} 
			},
			test(text,index){
				// console.log("loadindex:",index);
			},
			onTabClick(index){ 
				this.currentIndex = index;
				this.loadHotListFormTab();
			},
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
