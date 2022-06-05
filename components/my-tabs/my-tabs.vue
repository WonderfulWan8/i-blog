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
							<view class="tab-item">
								{{item.label || item}}
							</view>
						</block>
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
		}
	}
</script>

<style lang="scss" scoped>
.tab-container{
	font-size: $uni-font-size-sm;
}
</style>
