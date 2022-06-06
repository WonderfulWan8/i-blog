<template>
	<view class="ranking-container">
		<image class="ranking-bg" src="@/static/ranking-1.png" mode=""></image>
		<text class="ranking-text">{{ranking}}</text>
	</view>
</template>

<script>
	export default {
		name:"hot-ranking",
		data() {
			return {
				
			};
		},
		props:{
			ranking:{
				type:Number,
				required:true
			}
		}
	}
</script>

<style lang="scss" scoped>
.ranking-container{
	position: relative;
	text-align: center;
	width: 18px;
	height: 20px;
	.ranking-bg{
		width: 100%;
		height: 100%;
	}
	.ranking-text{
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-55%,-55%);
	}
}
</style>