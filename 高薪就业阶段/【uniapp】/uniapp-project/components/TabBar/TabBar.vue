<template>
	<view class="tab">
		<!-- 滚动区域 -->
		<scroll-view scroll-x="true" :scroll-into-view="currentIndex" :scroll-with-animation="true" class="tab-scroll">
			<view class="tab-scroll-box">
				<view :class="['tab-scroll-item',{active:activeIndex===index}]" v-for="(item,index) in labelList"
					:key="index" @click="change(index)" :id="`item${index}`">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<!-- 图标部分 -->
		<view class="tab-icons">
			<uni-icons type="gear" size="26" color="666"></uni-icons>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { computed, ref } from 'vue';

	const props = defineProps({
		labelList: Array,
		activeIndex: Number
	});

	const emits = defineEmits({
		changeActiveIndex: (index : number) => true
	});

	const currentIndex = computed(() => {
		return `item${props.activeIndex}`
	});

	const change = (index : number) => {
		emits("changeActiveIndex", index)
	};
</script>

<style lang="scss" scoped>
	@import "./css/TabBar.scss";
</style>