<template>
	<!-- 
		my-tabs为通用组件
		1.在父组件中定制样式
		2.在父组件中指定数据
		3.在父组件中指定选中项
	 -->
	<view class="tab-container">
		<view class="tab-box">
			<scroll-view
			class="scoll-view"
			scroll-x
			scroll-with-animation
			:scroll-left="scrollLeft"
			>
				<view class="scoll-content">
					<view class="tab-item-box">
						<block v-for="(item, index) in tabData" :key="item.id">
							<view 
							:id="'_tab_'+index" 
							@click="onTabClick(index)" 
							class="tab-item"
							:class="{'tab-item-active' : activeIndex === index }"
							:style="{
								color: activeIndex === index ? defaultConfig.activeTextColor : defaultConfig.textColor
							}"
							>	
								{{item.label || item}}
							</view>
						</block>
					</view>
					<!-- 滑块 -->
					<view class="underline" 
					:style="{
						transform: 'translateX('+ slider.left +'px)',
						width: defaultConfig.underLin+'px',
						height: defaultConfig.underLineHeigh+'px',
						backgroundColor: defaultConfig.underLineColor
					}"
					>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-tabs",
		data() {
			return {
				// 内部维护的数据对象，为每个item单独维护一个slider的滑块对象
				tabList:[],
				activeIndex:-1,
				// 滑块距离左侧距离
				slider:{
					// 1.确定滚动时机:点击tab时
					// 2.计算滑块滚动距离
					left: 0
				},
				scrollLeft: 0,// scrollView的横向滚动条位置
				defaultConfig:{// 默认样式
					textColor:'#333',//默认的字体颜色
					activeTextColor:'#f94d2c',//高亮的字体颜色 
					underLineWidth:24,
					underLineHeight:2,
					underLineColor: '#f94d2a'																																													
				}
			};
		},
		props:{
			// 1.在父组件中定制样式
			// 配置对象
			config:{
				type:Object,
				// default如果为复杂数据类型,
				// 那么需要指定value为一个函数,通过返回值的形式执行默认值
				default: () => {
					return {};
				}
			},
			// 2.在父组件中指定数据
			tabData:{
				type: Array,
				default: () => {
					return [];
				}
			},
			// 3.在父组件中指定选中项
			defaultIndex: {
				type: Number,
				default: 0,
			}
		},
		methods:{
			// 更新tab的宽度
			updateTabWidth(){
				let data = this.tabList;
				if(data.length === 0){
					return;
				}
				// 在uni中获取dom
				const query = uni.createSelectorQuery().in(this);
				data.forEach((item,index)=>{
					// 获取dom固定写法
					query.select('#_tab_'+index)
					.boundingClientRect((res)=>{
						console.log(123);
						console.log(res);
						item._slider = {
							// left = tabItem.left + (tabItem.width - slider.width)/2
							left: res.left + ( res.width - this.defaultConfig.underLineWidth )/2,
						}
						if(data.length -1 === index){
							this.tabToIndex();
						}
					})
					.exec();
				});                                                               
			},
			onTabClick(index){
				// console.log(index)	
				this.activeIndex = index;
				this.tabToIndex();  
				this.$emit('tabClick',index)
			},
			// 计算滑块滚动位置
			tabToIndex(){
				const index = this.activeIndex;
				this.slider = {
					left:this.tabList[this.activeIndex]._slider.left
				};
				// 控制scrollView进行横向的滚动
				this.scrollLeft =this.activeIndex * this.defaultConfig.underLineWidth;
			},
			onLoad(){
				console.log("this.tabData:",this.tabData);
			}
		},
		watch:{
			config:{
				 // 父组件设置样式时，触发变化
				 handler(val){
					 // console.log("我是handler");
					 this.defaultConfig = {...this.defaultConfig, ...val};
				 },
				 immediate: true
			},
			// 监听tabData的变化
			tabData:{
				handler(val){
					console.log("监听tabdata发生变化");
					this.tabList = val;
					// tabList数据已经和tabData同步了
					// 维护tabList中的每个item
					// this.$nextTick在uniapp中存在兼容性问题
					setTimeout(()=>{
						// 计算item的slider
						this.updateTabWidth();
					},0)
				}
			},
			// 监听父组件传值
			defaultIndex:{
				// 当defaultIndex发生变化时，回调的方法
				handler(val){
					this.activeIndex = val;
				},
				// 侦听后立即执行
				immediate: true
			}
		}
	}
</script>

<style lang="scss" scoped>
.tab-container{
	font-size: $uni-font-size-sm;
	height: 45px;
	line-height: 45px;
	background-color: $uni-bg-color;
	.tab-box{
		width: 100%;
		height: 45px;
		display: flex;
		position: relative;
		.scoll-view{
			white-space: nowrap;
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			.scoll-content{
				width: 100%;
				height: 100%;
				position:relative;
				.tab-item{
					height: 100%;
					display: inline-block;
					text-align: center;
					padding: 0 15px;
					position: relative;
					color: $uni-text-color;
					&-active{
						color:$uni-text-color-hot;
					}
				}
				.underline{
					height: 2px;
					width: 24px;
					background-color: $uni-text-color-hot;
					border-radius: 3px;
					transition: 0.5s;
					position: absolute;
					bottom: 0;
				}
			}
		}
	}
}
</style>
