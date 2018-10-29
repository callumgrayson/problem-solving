const HackerRank = {

  waitingTime(tickets, p) {
    // Write your code here
    const jVal = tickets[p];

    const sumValsLessThanJVal = tickets.reduce((acc, val) => {
        console.log(jVal - 1);
        console.log(val);
        if (val >= (jVal)) {
          console.log(acc + jVal - 1);
            return acc + jVal - 1;
        } else {
            return acc + val;
        }
    }, 0);

    console.log(sumValsLessThanJVal);

    let lastPass = 0; 
    for (let i = 0; i < p; i++) {
      console.log(tickets[i]);
        if (tickets[i] >= jVal) {
          lastPass += 1;
        };
    }

    const retVal = sumValsLessThanJVal + lastPass + 1;
  
    return [retVal];
  },

  reformatDate() {
    const dates = [
      "20th Oct 2052", 
      "6th Jun 1933", 
      "26th May 1960",
      "20th Sep 1958",
      "16th Mar 2068", 
      "25th May 1912", 
      "16th Dec 2018", 
      "26th Dec 2061",
      "4th Nov 2030",
      "28th Jul 1963"
    ];

    const monthsArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    // loop through dates
    const splitDates = dates.map(date => {
      return date.split(" ");
    });
    console.log(splitDates);

    // for each date split into arrays
    // for the day str return just the integer by removing 'th'
    const minusTH = splitDates.map(date => {
      const dateSplit = date[0].split("");
      const len2 = dateSplit.length - 2;
      let tempDay = dateSplit.splice(0, len2);
      if (tempDay.length < 2) {
        tempDay.unshift("0");
      }
      let strJoined = tempDay.join("");

      const newDate1 = date.slice(1);
      
      newDate1.unshift(strJoined);
      const newDate = [...newDate1];
      return newDate;
    });

    console.log(minusTH);

    function getMonth(int) {
      return monthsArr.indexOf(int) + 1;
    }

    const retArr = minusTH.map(item => {
      console.log(item[1]);
      let newMonth = "" + getMonth(item[1]);
      console.log(newMonth.length);
      if (newMonth.length < 2) {
        newMonth = "0" + newMonth;
      }
      item.splice(1, 1, newMonth);
      console.log(newMonth);

      console.log(item);

      const retItem = `${item[2]}-${item[1]}-${item[0]}`;

      return retItem;
    });

    return retArr;
  },

  arrayPlay() {

    // Array Original
    const arr = ["Start", "One", "Two", "Three", 4, "Five", 6, 7, "End"];
    const arrShift = arr.slice(1);

    // Array pop
    const arrPop = arr.slice(0, arr.length - 1);

    // Array remove from middle
    const index1 = arr.indexOf("Two");
    const arrMidCut = arr.slice(0, index1).concat(arr.slice(index1 + 1));

    // Array remove multiple from middle
    const index2 = arr.indexOf("Two");
    const cutsLen = 3;
    const arrMidCuts3 = arr.slice(0, index2).concat(arr.slice(index2 + cutsLen));

    // Filter array by type
    const arrFilter1 = arr.filter(item => {
      return typeof item === 'number';
    });

    // return Array of method outputs
    const retArr = [
      'arr: -- ' + arr.join(", "),
      'arrShift: -- ' + arrShift.join(", "),
      'arrPop: -- ' + arrPop.join(", "),
      'arrMidCut: -- ' + arrMidCut.join(", "),
      'arrMidCuts3: -- ' + arrMidCuts3.join(", "),
      'arrFilter1: -- ' + arrFilter1.join(", "),
    ]
    return [...retArr];
  },

}



export default HackerRank;