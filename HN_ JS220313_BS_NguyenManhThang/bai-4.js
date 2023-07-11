// Cách 1
let arr = [1, 20, 53, 22, 54, 37, 70, 15];

// let arrLength = arr.length;

// for (let i = 0; i < arrLength; i++) {
//   for (let j = 0; j < arrLength; j++) {
//     let changeValue = arr[i];
//     if (arr[j] < arr[i]) {
//       arr[i] = arr[j];
//       arr[j] = changeValue;
//     }
//   }
// }

// console.log(arr);

// Cách 2
console.log(
  arr.sort((a, b) => {
    return b - a;
  })
);
