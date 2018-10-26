const Simulations = {

  // Simulate any number of n length games
  playGames(k, n , a, b) {
    let aGames = 0;
    let bGames = 0;
    let count = 0; 
    console.log(k, n, a, b);

    while (count < k) {
      let gameWinner = this.playNRounds(n, a, b);
      if (gameWinner === 'A') {aGames += 1}; 
      if (gameWinner === 'B') {bGames += 1};
      count++;
    }

    let aPercent = Math.round(aGames / k * 100);
    let bPercent = Math.round(bGames / k * 100);
    console.log(aGames, bGames, count, aPercent, bPercent);

    return [`Total Games: ${k}`, `A: ${aGames} (${aPercent}%)`, `B: ${bGames} (${bPercent}%)`];
  },
  
  // Simulate any number of rounds
  playNRounds(n, a, b) {

    const stop = {};
    stop.a = a;
    stop.b = b;

    let nRounds = [];
    let roundStats = [];
    let newRound = {};
    let roundLength = 0;
    let winsCount = {a: 0, b: 0, tie: 0, none: 0};
    let scoreSumA = 0;
    let scoreSumB = 0;
    let winnerGame = '';

    while (nRounds.length < n) {
      // newRound will be an array of objects {die1: , die2:, cuml: }
      newRound = this.playOneRound(stop);
      nRounds.push(newRound);
      roundLength = newRound.allRolls.length;
      let winner = newRound.winner;
      winsCount[winner] += 1;
      scoreSumA += newRound.scoreA;
      scoreSumB += newRound.scoreB;

      if (roundStats[roundLength]) {
        roundStats[roundLength].count += 1;

      } else {
        roundStats[roundLength] = {count: 1};
      }
      // console.log(roundStats[roundLength]);

    }

    if (scoreSumA === scoreSumB) {
      winnerGame = 'Draw';
    } else if (scoreSumA > scoreSumB) {
      winnerGame = 'A';
    } else {
      winnerGame = 'B';
    }

    const roundStatsRet = roundStats.map((item, i) => {
      return `${i}: ${item.count} ${Math.round(item.count / n * 100)}%`;
    });

    roundStatsRet.push(`A score: ${scoreSumA} ~ B score: ${scoreSumB} ~ Game winner is ${winnerGame}`);

    // console.log(roundStats);
    // console.log(roundStatsRet);

    return winnerGame;
  },
  
  // play a round until double or PlayerA ends and PlayerB ends
  playOneRound(stop) {
    // console.log(stop);
    let resultsArr = [];
    let end = false;
    let roll = [];
    let allRolls = [];
    let cuml = 0;
    let rollCount = 0;
    let stopScores = {a: 0, b: 0}
    let winner = '';
   

    while ((rollCount < stop.a || rollCount < stop.b) && end === false) {

      // console.log(rollCount);
      
      roll = this.getRoll();
      // console.log(roll);

      rollCount += 1;

      if (roll.die1 !== roll.die2) {
        cuml += (roll.die1 + roll.die2);
        // console.log(cuml);
        (rollCount <= stop.a) && (stopScores.a = cuml);
        (rollCount <= stop.b) && (stopScores.b = cuml);
      } else {
        cuml = 0;
        if (stop.a >= rollCount) {stopScores.a = cuml};
        if (stop.b >= rollCount) {stopScores.b = cuml};
        end = true;
        // console.log(cuml, stopScores.a, stopScores.b);
      };
      
      
      allRolls.push({die1: roll.die1, die2: roll.die2, cuml: cuml});
    }

    const scoreA = stopScores.a;
    const scoreB = stopScores.b;
    // console.log('scoreA', scoreA);
    // console.log('scoreB', scoreB);

    if (scoreA > scoreB) {
      winner = 'a';
    } else if (scoreB > scoreA) {
      winner = 'b';
    } else if (scoreA > 0 && scoreA === scoreB) {
      winner = 'tie';
    } else {
      winner = 'none';
    }

    // console.log(allRolls);
    // console.log('stopScores', stopScores);
    // console.log('winner', winner);

    const retObj = {
      allRolls: allRolls,
      scoreA: scoreA,
      scoreB: scoreB,
      winner: winner,
    };
    // console.log(retObj);

    return retObj;
  },

  // get a roll of two dice
  getRoll() {
    let die1 = Math.ceil(Math.random() * 6);
    let die2 = Math.ceil(Math.random() * 6);

    return {die1, die2};
  },
}

export default Simulations;