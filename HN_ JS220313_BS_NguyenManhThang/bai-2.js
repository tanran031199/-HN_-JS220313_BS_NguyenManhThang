let text1 = prompt("Nhập chuỗi muốn chuyển đổi");

let txt1 = text1.toLowerCase().split("");

txt1[0] = txt1[0].toUpperCase();
let txtLength = txt1.length;

for (let i = 0; i < txtLength - 1; i++) {
  if (txt1[i] === " ") {
    txt1[i + 1] = txt1[i + 1].toUpperCase();
  }
}

text1 = txt1.join("");

console.log(text1);
