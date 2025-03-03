import request from "@/request/http.js"

/**
 * 获取标签列表
 */
export const getLabelList = data => {
	return request({
		name: "get_label_list",
		data
	})
}

export const getArticleList = data => {
	return request({
		name: "get_article_list",
		data
	})
}