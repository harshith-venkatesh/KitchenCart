export const checkItem = (array, id) => {
	console.log(!!array.find((item) => item.id === id));
	return !!array.find((item) => item.id === id);
};
