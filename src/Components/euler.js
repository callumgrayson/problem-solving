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
  },

  largestPrimeFactor(number) {

    // fa is factorsArray
    // e is end
    // n is number
    // fc is factor2
    // iP is isPrime
    // n2 is number2
    // ln is length of fa

    let n = number;
    let fa = [];
    const end = Math.ceil(Math.sqrt(n));
    
    if (n === 1) return [1];
    if (n === 2) return [2];

    for (let i = 1; i <= end; i ++) {
      if (n % i === 0) {
        const fc2 = n / i;
        fa = fa.concat(i, fc2);
      }
    }

    fa.sort((a, b) => b - a);

    const ip = (n2) => {
      for (let j = 2; j <= Math.sqrt(n2); j++) {
        if (n2 % j === 0) return false;
      }

      return true;
    }

    let ln = fa.length;
    for (let k = 0; k < ln; k++) {
      let p = ip(fa[k]);
      if (p === true) return [fa[k]];
    }
  },
}

export default Euler;