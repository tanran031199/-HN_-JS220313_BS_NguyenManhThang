let arr = [1, 20, 53, 22, 54, 37, 70, 15];
let arrLength = arr.length;
let max = arr[0];

for (let i = 0; i < arrLength; i++) {
  if (max <= arr[i]) {
    max = arr[i];
  }
}

console.log(max);
