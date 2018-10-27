// 

const algorithms = {
  
  // Considerations
  // Time is linear since more rows mean proportionally more passes
  // Object v Array: Object is bigger, name and value
  // This algorithm visits all items 100 times
  // This array algorithm is 3 times slower than the obj algorithm below
  getFinalOpenedDoors(numDoors) {
    // const startTime = Date.now();
    let arr = [];
    
    for (let i = 1; i <= numDoors; i++) {
      arr.push(-1 * i);
    }

    for (let j = 1; j <= numDoors; j++) {
      arr = arr.map(item => {
        return Math.abs(item % j) === 0 ? -1 * item : item ;
      });
    }

    let retArr = arr.filter(num => {
      return num > 0;
    });

    // const endTime = Date.now();
    // console.log(endTime - startTime);

    return retArr;
  },

  getFinalOpenedDoorsSkips(numDoors) {
    // const startTime = Date.now();
    let arr = [];
    
    for (let i = 1; i <= numDoors; i++) {
      arr.push(-1 * i);
    }

    for (let j = 1; j <= numDoors; j++) {
      for (let k = j; k <= numDoors; k+=j) {
        let item = arr[k-1];
        const newVal = Math.abs(item % k) === 0 ? -1 * item : item;
        arr.splice(k-1, 1, newVal);
      }
    }

    let retArr = arr.filter(num => {
      return num > 0;
    });

    // const endTime = Date.now();
    // console.log(endTime - startTime);

    return retArr;
  },

  // This algorithm is fast because it skips items
  // rather than visiting all items it just visits the relevant ones
  getFinalOpenedDoorsObjSkips(numDoors) {

    // const startTime = Date.now();
    let obj = {};
    
    for (let i = 1; i <= numDoors; i++) {
      obj[i] = 'c';
    }

    for (let j = 1; j <= numDoors; j++) {
      for (let k = j; k <= numDoors; k+=j) {
        obj[k] = obj[k] === 'c' ? 'o' : 'c' ;
      }
    }

    let retArr = [];

    for ( let m in obj ) {
      if ( obj[m] === 'o' ) {
        retArr.push(m);
      }
    }

    // const endTime = Date.now();
    // console.log(endTime - startTime);

    return retArr;
  },

  // Next algorithm
}

export default algorithms;