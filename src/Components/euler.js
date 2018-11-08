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

  largestPalindromeProduct(n) {

    // function takes any number, returns boolean
    const palCheck = (num) => {

      const ns = `${num}`;
      const nStr = ns.split('');
      const toRev = [...nStr];
      const revN = toRev.reverse();

      for (let i = 0; i < nStr.length; i++) {
        if (nStr[i] !== revN[i]) return false;
      }
      return true;
    }
    
    const max = 10 ** n - 1;

    let largestPal = 0;
    
    for (let i = max; i > 0; i--) {
      for (let j = max; j >= i; j--) {

        const prod = i * j;
        const pal = palCheck(prod); // boolean

        if (pal && prod > largestPal) {
          // console.log(prod, i, j);
          largestPal = prod;
        }
      }

      // If no other product can be greater than largest so far
      // stop cycling
      if (largestPal > i * max) {
        // console.log('i & max & i*max', i, max, i * max);
        break;
      };
    }

    // console.log(largestPal);
    return [largestPal];
  },

  smallestMultiple(n) {

    if (n === 1) return [1];

    // Splits any number into its prime factors
    const splitPrimeFactors = (n1) => {
      let pf = [];
      if (n1 === 1) return 1;

      let i = 2;
      while (i <= n1) {
        if (n1 % i === 0) {
          pf.push(i);
          n1 = n1 / i;
          i = 2;
        } else {i++;}
        
      }
      console.log(pf);
      return pf;
    }

    // Combines two arrays removing unnecessary repeats
    const eliminateRepeats = (list, numArray) => {
      let fl = [...list];
      let na = [...numArray];
      let temp = [];

      for (let i = 0; i < na.length; i++) {
        if (fl.includes(na[i])) {
          let cutIndex = fl.indexOf(na[i]);          
          temp.push(na[i]);
          fl[cutIndex] = 1;
          na[i] = 1;
        }
      }

      const retArr1 = [...fl].concat([...temp], [...na]);
      const retArr = [];

      for (let j in retArr1) {
        if (retArr1[j] > 1) {
          retArr.push(retArr1[j]);
        }
      }

      return retArr;
    }

    let spf = []; // split prime factors array
    let cfl = []; // current factors list array
    for (let k = 2; k <= n; k++) {
      spf = splitPrimeFactors(k);
      cfl = eliminateRepeats(cfl, spf);
    }

    console.log(cfl);

    const smallestMultiple = cfl.reduce((a, b) => a * b);
    return [smallestMultiple];
  }

  
}

export default Euler;