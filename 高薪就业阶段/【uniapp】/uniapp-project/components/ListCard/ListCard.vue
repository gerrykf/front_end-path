<template>
	<view>
		<!-- 基础卡片 -->
		<view class="list-card" v-if="item.mode==='base'">
			<view class="list-card-img">
				<image :src="item.cover[0] ?item.cover[0] : '/static/img/logo.jpeg'"></image>
			</view>
			<view class="list-card-content">
				<view class="list-card-content-title">
					<text>{{item.title}}</text>
					<SaveLikes></SaveLikes>
				</view>
				<view class="list-card-content-desc">
					<view class="article-type">
						{{item.classify}}
					</view>
					<view class="browse-number">
						{{item.browse_count}}浏览
					</view>
				</view>
			</view>
		</view>
		<!-- 多图模式 -->
		<view class="list-card mode-column" v-if="item.mode==='column'">
			<view class="list-card-top">
				<text>{{item.title}}</text>
				<SaveLikes></SaveLikes>
			</view>
			<view class="list-card-middle">
				<view class="image-container" v-for="(img,index) in item.cover.slice(0,3)" :key="index">
					<image :src="img" mode="aspectFill"></image>
				</view>
			</view>
			<view class="list-card-content-desc list-card-bottom">
				<view class="article-type">
					{{item.classify}}
				</view>
				<view class="browse-number">
					{{item.browse_count}}浏览
				</view>
			</view>

		</view>
		<!-- 大图模式 -->
		<view class="list-card mode-image" v-if="item.mode==='image'">
			<view class="list-card-top">
				<view class="image-container">
					<image src="https://img1.sycdn.imooc.com/5ccfac620001f8d405000344.jpg" mode="aspectFill"></image>
				</view>
			</view>
			<view class="list-card-middle">
				<text>{{item.title}}</text>
				<SaveLikes></SaveLikes>
			</view>
			<view class="list-card-content-desc list-card-bottom">
				<view class="article-type">
					{{item.classify}}
				</view>
				<view class="browse-number">
					{{item.browser_count}}浏览
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	const props = defineProps({
		item: Object
	});
</script>

<style scoped lang="scss">
	@import "./css/ListCard.scss";
</style>