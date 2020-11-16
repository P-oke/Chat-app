const num = [1, 2, 3, 4, 5, 6, 7];
const num1 = "boy";
const fil = num.filter((n) => n > 1);
console.log(fil);
const find = num.findIndex((user) => user);
//const find = num.findIndex(1);
//console.log(find);

///if (find !== -1) {
//const f1 = num.splice(find, 1)[0];
//console.log(f1);
//}
const f2 = num.splice(0, 2);
//console.log(num);
//const f3 = num.indexOf(6);
console.log(f2);
//console.log(f3);

/*
num.splice(find, 1)[0];



const res = num.filter((n) => {
  if (n > 1) {
    return n;
  }
});

if (IndexOf(num1 > 0)) {
  console.log(num1);
}
//console.log(indexOf(num > -1));
/*
const ind = num.findIndex((ind) => {
  if (indexOf(ind) === -1) {
    return ind;
  }
});
*/
//console.log(ind);
//console.log(res.join(""));
