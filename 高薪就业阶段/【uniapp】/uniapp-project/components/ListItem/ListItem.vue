<template>
	<view class="list-scroll-container">
		<scroll-view :scroll-y="true" class="list-scroll">
			<view class="">
				<ListCard v-for="item in articleList" :key="item.id" :item="item"></ListCard>
			</view>
		</scroll-view>
	</view>
</template>

<script setup lang="ts">
	defineProps({
		articleList: Array
	});
</script>

<style scoped lang="scss">
	.list-scroll-container {
		height: 100%;

		.list-scroll {
			overflow: hidden;
			height: 100%;
			box-sizing: border-box;
		}
	}
</style>