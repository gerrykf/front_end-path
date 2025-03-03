<template>
	<swiper class="swiper-container" :current="activeIndex" @change="change">
		<swiper-item v-for="item in labelList">
			<view class="swiper-item">
				<ListItem :articleList="articleList"></ListItem>
			</view>
		</swiper-item>
	</swiper>
</template>

<script setup lang="ts">
	import { onMounted, ref } from 'vue';
	import { getArticleList } from '@/request/api/interface/home.js';

	defineProps({
		labelList: Array,
		activeIndex: Number
	});

	const emits = defineEmits({
		changeActiveIndex: (index : number) => true
	});


	const articleList = ref([]);

	const getListItems = async () => {
		const res = await getArticleList();
		const { data } = res;
		articleList.value = data;
	}

	onMounted(() => {
		getListItems();
	})

	const change = (e : any) => {
		console.log(e.detail.current);
		emits("changeActiveIndex", e.detail.current)
	};
</script>

<style scoped lang="scss">
	.swiper-container {
		height: 100%;

		.swiper-item {
			height: 100%;
			overflow: hidden;
		}
	}
</style>