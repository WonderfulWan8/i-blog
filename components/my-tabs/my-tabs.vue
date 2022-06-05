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
			>
				<view class="scoll-content">
					<view class="tab-item-box">
						<block v-for="(item, index) in tabData" :key="item.id">
							<view @click="onTabClick(index)" class="tab-item">
								<text :class="{'tab-item-active' : activeIndex === index }">
									{{item.label || item}}
								</text>
							</view>
						</block>
					</view>
				</view>
				<!-- 滑块 -->
				<view class="underline" 
				:style="{
					transform: 'translateX('+ slider.left +'px)'
					width: defaultConfig.underLineWidth+'px',
					height: defaultConfig.underLineHeight+'px',
					backgroundColor: defaultConfig.underLineColor
				}">
					
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
				defaultConfig:{
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
				
			},
			onTabClick(index){
				console.log(index)	
				this.activeIndex = index;
				this.$emit('tabClick',index)
			},
			// 计算滑块滚动位置
			tabToIndex(){
				const index = this.activeIndex;
				this.slider = {
					left:0
				}
			}
		},
		watch:{
			// 监听父组件传值
			defaultIndex:{
				// 当defaultIndex发生变化时，回调的方法
				handler(val){
					this.activeIndex = val;
				},
				// 侦听后立即执行
				immediate: true
			},
			// 监听tableData变化
			tabData:{
				handler(val){
					this.tabList = val;
					// this.$nextTick()存在兼容性问题
					setTimeout(()=>{
						// 计算item的slider
					},0)
				}
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
					transition: .5s;
					position: absolute;
					bottom: 0;
				}
			}
		}
	}
}
</style>
