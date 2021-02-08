export function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
export function getData(key) {
  var data = localStorage.getItem(key);
  return JSON.parse(data);
}