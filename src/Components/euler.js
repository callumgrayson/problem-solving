const Euler = {
  
  MultiplesOf3and5: (num) => {
    // 01 on FCC

    let arr = [];
  
    for (let i = 3; i < num; i+=3) {
      arr.push(i);
    }
    for (let j = 5; j < num; j+=5) {
      !arr.includes(j) && (arr.push(j));
    }
  
    let retArr = arr.reduce((acc, val) => {
      return acc = acc + val;
    })
  
    // console.log(retArr);
    return [retArr];
  },

  SumEvenFibs: (n) => {
    // 02 on FCC

    let a = 1;
    let b = 2;
    let c = 0;
    let arr = [];
    
    if (n === 1) return 0;
    if (n === 2) return 2;
    if (n > 2) arr.push(2);

    for (let i = 2; i <= n; i++) {
      c = a + b;
      a = b;
      b = c;
      c % 2 === 0 && arr.push(c);
    }

    let retVal = arr.reduce((acc, val) => {
      return acc += val;
    });

    console.log(arr, retVal);
    return [retVal];
  }
}

export default Euler;