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
    // console.log(sets24);

    const stringsArray = this.convertArraysToString(sets24);
    console.log(stringsArray);

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

  convertArraysToString(sets24) {
    // console.log(sets24);
    let retArr = [];

    for (let i = 0; i < sets24.length; i++) {
      // get phaseObj

      // ****************
      // i = 8 is an example of a negative scenario
      // ________________
      let phaseObj = this.getPhaseObj(sets24[i]); // CHANGE back after!!! to i
      // console.log(phaseObj);
      // get phaseStr
      let phaseStr = this.getPhaseStr(phaseObj);
      // push phaseStr to returnObj
      retArr.push(phaseStr);
      // return returnObj
       // ************************** And replace this below to include all items
    }
    return retArr;
  },

  getPhaseObj(inArr) {
    console.log(inArr);
    // console.log(inArr[0]);
    const newInArr0 = [...inArr[0]];
    // console.log(newInArr0);


    // get order indexes
    const first = inArr[2].indexOf(1);
    const second = inArr[2].indexOf(2);
    const third = inArr[2].indexOf(3); 
    // console.log(first, second, third);

    const posFirst = first === 0 ? 'L' : (first === 1 ? 'M' : 'R');
    const posSecond = second === 0 ? 'L' : (second === 1 ? 'M' : 'R');
    const posThird = third === 0 ? 'L' : (third === 1 ? 'M' : 'R');

    // splice at inArr[first] cut 2 replace with [inArr[0][first], inArr[0][first + 1]]
    newInArr0.splice(first, 2, [inArr[0][first], inArr[0][first + 1]]);
    // console.log(newInArr0);

    // get vals based on first
    const d1 = newInArr0[first];
    const op1 = inArr[1][first];
    

    const d2 = newInArr0[second];
    const op2 = inArr[1][second];
    
    const d3 = newInArr0[third];
    const op3 = inArr[1][third];

    const retPhObj = {
      phase1: {
        d1: d1,
        op: op1,
        opInd: first,
        pos: posFirst,
      },
      phase2: {
        d2: d2,
        op: op2,
        opInd: second,
        pos: posSecond,
      },
      phase3: {
        d3: d3,
        op: op3,
        opInd: third,
        pos: posThird,
      }
    }

    return retPhObj;
  },

  getPhaseStr(inObj) {
    console.log(inObj);
    // Gets the type of operation from each phase object
    let opPat1 = inObj.phase1.op;
    let opPat2 = inObj.phase2.op;
    let opPat3 = inObj.phase3.op;

    const opP1 = opPat1 < 3 ? 'a' : 'm';
    const opP2 = opPat2 < 3 ? 'a' : 'm';
    const opP3 = opPat3 < 3 ? 'a' : 'm';

    const d1a = inObj.phase1.d1[0];
    const d1b = inObj.phase1.d1[1];
    const d2 = inObj.phase2.d2;
    const d3 = inObj.phase3.d3;

    // first second third
    const opInd1 = inObj.phase1.opInd;
    const opInd2 = inObj.phase2.opInd;
    const opInd3 = inObj.phase3.opInd;


    // conditions G
    const testG = (opP1 === 'a' && opP2 === 'm' && opP3 === 'a') && (opInd3 === 1);
    // conditions F
    const testF = (opP1 === 'a' && opP2 === 'a' && opP3 === 'm') && (opInd3 === 1);
    // conditions DE
    const testDE = (opP2 === 'a' && opP3 === 'm');
    // conditions ABC
    const testABC = (opP1 === 'a' && opP2 === 'm' && Math.abs(opInd1 - opInd2) === 1);
    // Need to add in condition for if the result of operation is negative
    const testNeg1 = ((opPat1 === 2 && opPat2 === 2) || (opPat2 === 2 && opPat3 === 2));
    console.log('Negative! ', testNeg1);

    // Get string vals of ops
    let getOp = (key) => {
      if (key === 1) {
        return '+';
      } else if (key === 2) {
        return '-';
      } else if (key === 3) {
        return '*';
      } else if (key === 4) {
        return '/';
      }
    }

    const op1Str = getOp(opPat1);
    const op2Str = getOp(opPat2);
    const op3Str = getOp(opPat3);

    const g1Arr = [d1a, op1Str, d1b, {phase: 1}];
    const g2Arr = [d2, op2Str,, {phase: 2}];
    const g3Arr = [d3, op3Str,, {phase: 3}];

    // console.log(g1Arr);
    // console.log(g2Arr);
    // console.log(g3Arr);

    // TO Be REDUNDANT*********
    // const _chunk1Left = opInd1 === 0 ? g1Str : (opInd2 === 0 ? g2Str : g3Str);
    // const _chunk2Mid = opInd1 === 1 ? g1Str : (opInd2 === 1 ? g2Str : g3Str);
    // const _chunk3End = opInd1 === 2 ? g1Str : (opInd2 === 2 ? g2Str : g3Str);
    // END of REDUNDANT__________

    const chunk1Left = opInd1 === 0 ? g1Arr : (opInd2 === 0 ? g2Arr : g3Arr);
    const chunk2Mid = opInd1 === 1 ? g1Arr : (opInd2 === 1 ? g2Arr : g3Arr);
    const chunk3End = opInd1 === 2 ? g1Arr : (opInd2 === 2 ? g2Arr : g3Arr);

    console.log(chunk1Left, chunk2Mid, chunk3End);

    // TEMP ONLY DELETE after use ******************************************

    // const gStr = `${chunk1Left}${chunk2Mid}${chunk3End}`;
    //   console.log('testG ', gStr);
    //   const fStr = `(${chunk1Left})${chunk2Mid}(${chunk3End})`;
    //   console.log('testF ', fStr);
    //   const deStr = `${chunk1Left}${chunk2Mid}${chunk3End}`;
    //   console.log('testDE ', deStr);
    //   const abcStr = `${chunk1Left}${chunk2Mid}${chunk3End}`;
    //   console.log('testABC ', abcStr);


    // END of TEMP section _________________________________________________

    const cL1 = chunk1Left[0];
    const cL2 = chunk1Left[2];
    const cLop = chunk1Left[1];
    const cLphase = chunk1Left[3].phase;
    const cM1 = chunk2Mid[0];
    const cM2 = chunk2Mid[2]; 
    const cMop = chunk2Mid[1];
    const cMphase = chunk2Mid[3].phase;
    const cR1 = chunk3End[0];
    const cR2 = chunk3End[2];
    const cRop = chunk3End[1];
    const cRphase = chunk3End[3].phase;
    
    // Conditionally adding brackets
    if (testNeg1) {

      // Must have brackets if a negative is produced
      // 
      const bracketChunk = (opPat1 === 2 && opPat2 === 2) ? 2 : 3;

      const negArr = [];

      if (cLphase === 1) {
        const tempChunk = [cL1, cLop, cL2];
        negArr.push(...tempChunk);
      } else {
        negArr.push(cL1, cLop);
      }

      if (bracketChunk === 2) {
        const tempChunk2 = ['(', cM1, cMop, cM2, ')'];
        negArr.push(...tempChunk2);
      } else if (cLphase === 1) {
        negArr.push(cMop, cM1);
      } else {
        negArr.push(cM1, cMop)
      }

      if (cRphase === 1) {
        const tempChunk3 = [cR1, cRop, cR2];
        negArr.push(...tempChunk3);
      } else {
        negArr.push(cRop, cR1)
      }

      const negStr = negArr.join('');
      console.log('negStr ', negStr);
      return negStr;


    } else if (testG) {

      // G string has no brackets - special case of no brackets though
      const gStr = [];
      gStr.push(cL1, cLop);
      if (cL2) {
        gStr.push(cL2);
        gStr.push(cMop, cM1);
        gStr.push(cRop, cR1);
      } else if (cM2) {
        gStr.push(cM1, cMop, cM2);
        gStr.push(cRop, cR1);
      } else if (cR2) {
        gStr.push(cMop, cM1);
        gStr.push(cR1, cRop, cR2);
      } 

      const retStr = gStr.join('');
      console.log('testG ', retStr);
      return 'gStr';

    } else if (testF) {
      
      // F string has two sets of brackets
      const fStr = `(${chunk1Left})${chunk2Mid}(${chunk3End})`;
      console.log('testF ');
      return 'fStr not completed';
      
    } else if (testDE) {
      // Big brackets, one of two positions
      const deStr = `${chunk1Left}${chunk2Mid}${chunk3End}`;
      console.log('testDE ');
      return 'deStr not completed';

    } else if (testABC) {
      // Small brackets, one of three positions
      // Only one bracket and it goes around the phase 1 items
      const abcArr = [];

      if (cLphase === 1) {
        const tempChunk = ['(', cL1, cLop, cL2, ')'];
        abcArr.push(...tempChunk);
      } else {
        abcArr.push(cL1, cLop);
      }

      if (cMphase === 1) {
        const tempChunk2 = ['(', cM1, cMop, cM2, ')'];
        abcArr.push(...tempChunk2);
      } else if (cLphase === 1) {
        abcArr.push(cMop, cM1);
      } else {
        abcArr.push(cM1, cMop)
      }

      if (cRphase === 1) {
        const tempChunk3 = ['(', cR1, cRop, cR2, ')'];
        abcArr.push(...tempChunk3);
      } else {
        abcArr.push(cRop, cR1)
      }

      const abcStr = abcArr.join('');
      console.log('abcStr ', abcStr);
      return abcStr;

    } else {

      // No brackets and put together in order of appearance
      const noBrStr = [];
      noBrStr.push(cL1, cLop);
      if (cL2) {
        noBrStr.push(cL2);
        noBrStr.push(cMop, cM1);
        noBrStr.push(cRop, cR1);
      } else if (cM2) {
        noBrStr.push(cM1, cMop, cM2);
        noBrStr.push(cRop, cR1);
      } else if (cR2) {
        noBrStr.push(cMop, cM1);
        noBrStr.push(cR1, cRop, cR2);
      } 

      const retStr = noBrStr.join('');
      console.log('noBrStr ', retStr);
      return retStr;

    }

  },

}

export default algorithms02;