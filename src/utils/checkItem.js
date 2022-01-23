export const checkItem = (array, id) => {
  return !!array?.find((item) => item.id === id)
}
