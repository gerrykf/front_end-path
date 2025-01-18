export default ({
	name,
	data = {}
}) => {
	return new Promise((resolve, reject) => {
		uni.showLoading({}) // 显示loading
		uniCloud.callFunction({
			name,
			success: ({
				result
			}) => {
				if (result.code === 0)
					resolve(result)
				else {
					uni.showToast({
						title: result.msg,
						icon: 'none'
					})
				}
			},
			fail: (err) => {
				reject(err)
			},
			complete: () => {
				uni.hideLoading() // 隐藏loading
			}
		});
	});
}