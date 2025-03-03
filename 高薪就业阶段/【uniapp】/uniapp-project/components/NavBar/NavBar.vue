<template>
	<view class="nav-bar">
		<view class="nav-bar-top">
			<!-- 处理App以及小程序的状态栏  -->
			<view :style="{height:statusHeight+'rpx'}">
			</view>
			<view class="nav-bar-content" @click="goSearchPage">
				<uni-icons type="search" color="#999"></uni-icons>
				<view class="nav-bar-search-txt">输入文章内容查找</view>
			</view>
		</view>
		<!-- 底部的垫片 -->
		<view class="" :style="{height:statusHeight + 80 + 'rpx'}">
		</view>
	</view>
</template>

<script setup lang="ts">
	import { onMounted, ref } from 'vue';

	const statusHeight = ref(20);

	const getSystemInfo = async () => {
		const systemInfo = await uni.getSystemInfo();
		console.log(systemInfo);
		systemInfo.statusBarHeight && (statusHeight.value = systemInfo.statusBarHeight)
		console.log(statusHeight.value);
	}

	const goSearchPage = () => {
		uni.navigateTo({
			url: '/pages/search/search'
		})
	}

	onMounted(() => {
		getSystemInfo();
	})
</script>

<style lang="scss">
	@import "./css/NavBar.scss";
</style>