const algorithms02 = {
  solve2(numStr) {
    console.log(numStr);
    const lenStr = numStr.length;
    console.log(lenStr);
    const n0 = [...numStr.split('')];

    let combos = [];
    
    for (let i = 0; i < 4; i++) {
      console.log(`************* start of ith: ${i}`);
      let ni = [...n0];
      const pi = [].concat(ni.splice(i, 1));

      for (let j = 0; j < 3; j++) {
        let nj = [...ni];
        const pj = [...pi].concat(nj.splice(j, 1));

        for (let k = 0; k < 2; k++) {
          let nk = [...nj];
          const pk = [...pj].concat(nk.splice(k, 1));

          for (let m = 0; m < 1; m++) {
            let nm = [...nk];
            const pm = [...pk].concat(nm.splice(m, 1));
            combos.push(pm);
          }
        }
      }
    }
    console.log('combos: ', combos);
    return numStr;
  },

  solve24(numStr) {
    if (!numStr.length) {return 'Nothing to work with!'};

    const n0 = [...numStr.split('')];
    let nArr = [...n0];
    let pArr = [];
    let combos = [];
    this.removeOneDigit(nArr, pArr, combos);
    combos = this.retInts(combos);
    // console.log(combos);
    
    const ops = this.operationCombinations(4);
    // console.log(ops);

    // Needing combos, ops and groupings
    const groupStr = '123';
    const nGroup0 = [...groupStr.split('')];
    let nGroup = [...nGroup0];
    let pGroup = [];
    let groups = [];
    this.removeOneDigit(nGroup, pGroup, groups);
    groups = this.retInts(groups);
    // console.log(groups);

    // Altogether... 
    const digitSet = [...combos];
    const opSet = [...ops];
    const ordSet = [...groups];
    let sets24 = [];
    this.calc24(digitSet, opSet, ordSet, sets24);
    console.log(sets24);

    return sets24;
  },

  removeOneDigit(nArr, pArr, x) {

    for (let a = 0; a < nArr.length; a++) {
      let n = [...nArr];
      let p = [...pArr].concat(n.splice(a, 1));

      if (n.length > 0) {
        // console.log(n, p);
        this.removeOneDigit(n, p, x);
      } else {
        // console.log(x);
        x.push(p);
      }
    }
  },

  operationCombinations(gaps) {
    let n = gaps;
    let combs = [];

    // essentially making all the combos of 111 -> 333
    for (let a = 0; a < n; a++) {
      let n1 = a + 1;
      for (let b = 0; b < n; b++) {
        let n2 = b + 1;
        for (let c = 0; c < n; c++) {
          let n3 = c + 1;
          combs.push([n1, n2, n3]);
        }
      }
    }

    // console.log(combs);
    return combs;
  },

  calc24(digitSet, opSet, ordSet, sets24) {
    // for each item in combos
    // apply each set of operations where 1 is add, 2 is sub, 3 is mult, 4 is div
    // apply each order of operations
    // check if the outcome is 24
    
    let dS = [...digitSet];
    const opS = [...opSet];
    let orS = [...ordSet];

    // console.log(dS);
    // console.log(opS);
    // console.log(orS);
    // console.log(sets24);
    
    // Now all sets are ready to go
    // dS, opS, orS, sets24
    for (let a = 0; a < dS.length; a++) {
      // dS[a][0], dS[a][1], dS[a][2], dS[a][3]
      for (let b = 0; b < opS.length; b++) {
        // opS[b][0], opS[b][1], opS[b][2] ** can be 1, 2, 3, 4 add sub mult div
        for (let c = 0; c < orS.length; c++) {
          // orS[c][0], orS[c][1], orS[c][2] ** can be 1, 2, 3 order of ops
          // console.log(dS[a]);
          // console.log(opS[b]);
          // console.log(orS[c]);

          let first = orS[c].indexOf(1); // 0 in array of ops
          let second = orS[c].indexOf(2); // 1
          let third = orS[c].indexOf(3); // 2
          // console.log(first);
          // console.log(second);
          // console.log(third);



          // Four digits 1, 2, 3, 4
          let getOp = (arr, key) => {
            if (arr[key] === 1) {
              return '+';
            } else if (arr[key] === 2) {
              return '-';
            } else if (arr[key] === 3) {
              return '*';
            } else if (arr[key] === 4) {
              return '/';
            }
          }

          let op1 = getOp(opS[b], first);
          let op2 = getOp(opS[b], second);
          let op3 = getOp(opS[b], third);

          // console.log(op1);
          // console.log(op2);
          // console.log(op3);

          const calCer = (operand1, operand2, opArr, key) => {
            if (opArr[key] === 1) {
              return operand1 + operand2;
            } else if (opArr[key] === 2) {
              return operand1 - operand2;
            } else if (opArr[key] === 3) {
              return operand1 * operand2;
            } else if (opArr[key] === 4) {
              return operand1 / operand2;
            }
          }

          let oper1 = dS[a][first];
          let oper2 = dS[a][first + 1];
          let res1 = calCer(oper1, oper2, opS[b], first);
          // console.log(res1);

          // Reduce the arrays
          const d2 = [...(dS[a])];
          d2.splice(first, 2, res1);
          
          let tempOpS = [...opS[b]];
          tempOpS.splice(first, 1);
          const oP2 = [...tempOpS];
          let tempOrS = [...orS[c]];
          tempOrS.splice(first, 1);
          const oR2 = [...tempOrS];
          // console.log(d2);
          // console.log(oP2);
          // console.log(oR2);


          // New second and third, adjusted on conditional
          let secondB;
          let thirdB;
          secondB = first > second ? second : second - 1;
          thirdB = first > third ? third : third - 1;

          // Call Calcer on reduced arrays
          let oper1b = d2[secondB];
          let oper2b = d2[secondB + 1];
          let res2 = calCer(oper1b, oper2b, oP2, secondB);
          // console.log(res2);

          // Reduce the arrays
          const d3 = [...(d2)];
          d3.splice(secondB, 2, res2);
          
          let tempOpS2 = [...oP2];
          tempOpS2.splice(secondB, 1);
          const oP3 = [...tempOpS2];
          
          let tempOrS2 = [...oR2];
          tempOrS2.splice(secondB, 1);
          const oR3 = [...tempOrS2];
          // console.log(d3);
          // console.log(oP3);
          // console.log(oR3);

          // New third, adjusted on conditional
          let thirdC;
          thirdC = secondB > thirdB ? thirdB : thirdB - 1;

          // Call Calcer on reduced arrays
          let oper1c = d3[thirdC];
          let oper2c = d3[thirdC + 1];
          let res3 = calCer(oper1c, oper2c, oP3, thirdC);
          
          
          if (res3 === 24) {
            // console.log('Holy Shit, we got one!');
            // console.log(res3);
            // console.log(dS[a]);
            // console.log(opS[b]);
            // console.log(orS[c]);
            let arrayOfArrs = [[...dS[a]], [...opS[b]], [...orS[c]]];
            // console.log(arrayOfArrs);
            sets24.push(arrayOfArrs);

          }
        }
      }
    }
  },

  retInts(arr) {
    let retIntArr = [];
    for (let a = 0; a < arr.length; a++) {
      let tempArr = [];
      // console.log(arr[a]);
      for (let b = 0; b < arr[a].length; b++) {
        let c = parseInt(arr[a][b]);
        
        tempArr.push(c);
      }
      retIntArr.push(tempArr);
    }
    return retIntArr;
  },


}

export default algorithms02;