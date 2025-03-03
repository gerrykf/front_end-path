<template>
	<view class="home-container">
		<NavBar></NavBar>
		<TabBar :labelList="labelList" :activeIndex="activeIndex" @changeActiveIndex="changeActiveIndex"></TabBar>
		<ArticleList :labelList="labelList" :activeIndex="activeIndex" @changeActiveIndex="changeActiveIndex">
		</ArticleList>
	</view>
</template>

<script setup lang="ts">
	import { onMounted, ref } from 'vue';
	import { getLabelList } from '@/request/api/interface/home.js'


	const labelList = ref([]);
	const activeIndex = ref(0);

	const changeActiveIndex = (index : number) => {
		activeIndex.value = index;
	};

	const _initLabelList = async () => {
		const res = await getLabelList();
		console.log(res);
		const { data } = res;
		labelList.value = data;

	}

	onMounted(() => {
		_initLabelList();
	})
</script>

<style lang="scss">
	page {
		display: flex;
		height: 100%;
	}

	.home-container {
		flex: 1;
		overflow: hidden;
		box-sizing: border-box;
		@include flex(flex-start, column);
		align-items: inherit;
	}
</style>