export const DateFormat = (time) => {
  let p = time.indexOf("-");
  time = time.substr(0, p) + "年" + time.substr(p + 1);
  p = time.indexOf("-");
  time = time.substr(0, p) + "月" + time.substr(p + 1);
  return time + "日";
}