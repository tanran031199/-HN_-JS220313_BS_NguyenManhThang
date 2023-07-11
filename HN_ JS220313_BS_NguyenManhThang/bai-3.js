let month = +prompt("Nhập tháng cần tìm số ngày");

let year = +prompt("Nhập vào năm cần xét");

let day;

if (
  (year % 4 === 0 && year % 100 !== 0 && month === 2) ||
  (year % 400 === 0 && year % 4 === 0 && month === 2)
) {
  day = 29;
} else if (
  (month <= 7 && month % 2 === 0 && month !== 2) ||
  (month >= 8 && month % 2 !== 0 && month !== 2)
) {
  day = 30;
} else if (month === 2) {
  day = 28;
} else {
  day = 31;
}

console.log(day);
