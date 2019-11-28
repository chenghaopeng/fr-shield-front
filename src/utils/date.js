export const DateFormat = (time) => {
  let p = time.indexOf("-");
  time = time.substr(0, p) + "年" + time.substr(p);
  p = time.indexOf("-");
  time = time.substr(0, p) + "月" + time.substr(p);
  return time + "日";
}