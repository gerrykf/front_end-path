'use strict';
// 获取数据库的引用
const db = uniCloud.database();
exports.main = async (event, context) => {
	const collection = db.collection('label');

	// 获取数据
	const res = await collection.get();
	console.log(res);

	//返回数据给客户端
	return {
		code: 0,
		data: res.data
	};
};