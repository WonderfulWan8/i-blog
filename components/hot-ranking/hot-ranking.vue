<template>
	<view class="ranking-container">
		<image class="ranking-bg" :src="getRankingBg" mode=""></image>
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
		},
		computed:{
			getRankingBg(){
				if(this.ranking <= 3){
					// const imgPath = `${this.ranking}).png`;
					// return require('@/static/ranking-'+imgPath)
					// let rank = await import(`@/static/ranking-${this.ranking}).png`)
					// return rank
					return require(`@/static/ranking-${this.ranking}.png`)
				}else{
					return require(`@/static/ranking-other.png`)
				}
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