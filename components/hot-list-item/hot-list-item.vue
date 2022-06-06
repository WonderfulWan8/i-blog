<template>
	<view class="item-container">
		<view class="item-box">
			<view class="item-box-left">
				<!-- 索引 -->
				<hot-ranking :ranking="ranking"></hot-ranking>
			</view>
			<view class="item-box-right">
				<!-- 标题 -->
				<view class="item-title .line-clamp-2">
					{{data.title}}
				</view>
				<!-- 简介 -->
				<view class="item-desc .line-clamp-2">
					{{data.desc}}
				</view>
				
				<view class="item-bottom-box">
					<!-- 作者 -->
					<text class="item-author">{{data.nickname}}</text>
					<!-- 热度  -->
					<view class="hot-box">
						<image class="hot-icon" :src="getRankingBg" mode="scaleToFill"></image>
						<text class="hot-text">{{data.views}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"hot-list-item",
		data() {
			return {
				
			};
		},
		props:{
			data:{
				type: Object,
				required:true
			},
			// 排名
			ranking:{
				type:Number,
				required:true
			}
		},
		computed:{
			getRankingBg(){
				if(this.ranking <= 3){
					const imgPath = `${this.ranking}).png`;
					return require('@/static/ranking-'+imgPath)
					// let rank = await import(`@/static/ranking-${this.ranking}).png`)
					// return rank
				}else{
					return require(`@/static/ranking-other.png`)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.item-container{
	padding-bottom: $uni-spacing-col-lg;
	.item-box{
		display: flex;
		margin: 0 $uni-spacing-row-base;
		padding: $uni-spacing-col-lg $uni-spacing-row-base;
		background-color: $uni-bg-color;
		border-radius: $uni-border-radius-lg;
		box-shadow:  2px 2px 5px 1px rgba(143, 143, 143, 0.1);
		.item-box-left{
			margin-right: $uni-spacing-row-sm;
		}
		.item-box-right{
			width: 100%;
			.item-title{
				font-size: $uni-font-size-lg;
				font-weight: bold;
			}
			.item-desc{
				padding-top: $uni-spacing-col-sm;
				font-size: 14px;
				color: $uni-text-color;
			}
			.item-bottom-box{
				margin-top: $uni-spacing-col-sm;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.item-author{
					font-size: $uni-font-size-sm;
					color: $uni-text-color-grey;
				}
				.hot-box{
					.hot-icon{
						width: 16px;
						height: 16px;
					}
					.hot-text{
						margin-left: $uni-spacing-row-sm;
						font-size: $uni-font-size-sm;
						color: $uni-text-color-hot;
					}
				}
			}
		}
	}
}
</style>