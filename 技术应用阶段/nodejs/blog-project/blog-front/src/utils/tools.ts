/**
 * 时间戳转时间
 * @param timestamp
 * @returns
 */
export const timestampToTime = (timestamp: number) => {
  const date = new Date(timestamp);
  const Y = date.getFullYear();
  const M = date.getMonth() + 1;
  const D = date.getDate();
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  return `${Y}-${M}-${D} ${h}:${m}:${s}`;
};
