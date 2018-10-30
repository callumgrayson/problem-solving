const Simulations = {

  // Simulate any number of n length games
  // k is number of games
  // n is number of rounds per game
  // a is number of rounds player A plays
  // b is number of rounds player B plays
  playGames(k, n , a, b) {
    let aGames = 0;
    let bGames = 0;
    let count = 0; 

    let roundLengthsList = [];
    let roundScoresList = {};
    let gameRoundsList = [];
    let gameScoresList = [];

    // play k number of games and record results
    while (count < k) {
      let gameResults = this.playNRounds(n, a, b);
      // console.log(gameResults);
      let gameWinner = gameResults.gameWinner;
      if (gameWinner === 'A') {aGames += 1}; 
      if (gameWinner === 'B') {bGames += 1};
      count++;

      // loop through roundLengths and send to gamesStats
      // console.log(gameResults);
      for (let c in gameResults.roundLengths) {
        let gl = gameResults.roundLengths[c];
        // console.log(gl);
        if (roundLengthsList[gl]) {
          roundLengthsList[gl].count += 1;
    
        } else {
          roundLengthsList[gl] = {count: 1};
        }
      }

      // loop through roundScores and send to gameStats
      for (let d in gameResults.roundScores) {
        let gs = gameResults.roundScores[d];
        // console.log(gs);
        if (roundScoresList[gs]) {
          roundScoresList[gs] += 1;
    
        } else {
          roundScoresList[gs] = 1;
        }
      }

      // sum the number of rounds in this game and record
      const sumRounds = gameResults.roundLengths.reduce((acc, v) => acc + v);
      gameRoundsList.push(sumRounds);
      
      // sum the scores of each round in this game and record
      const sumScores = gameResults.roundScores.reduce((acc, v) => acc + v);
      gameScoresList.push(sumScores);

    }

    // console.log(roundLengthsList);
    // console.log(roundScoresList);


    let aPercent = Math.round(aGames / k * 100);
    let bPercent = Math.round(bGames / k * 100);
    // console.log(aGames, bGames, count, aPercent, bPercent);

    // Average round length
    let meanGameRoundLength = (gameRoundsList.reduce((a, b) => a + b) / gameRoundsList.length);
    meanGameRoundLength = Math.round(meanGameRoundLength * 10) / 10;
    // console.log(meanGameRoundLength);

    // Average round score
    // console.log(gameScoresList);
    let meanGameScore = (gameScoresList.reduce((a, b) => a + b) / gameScoresList.length); 
    meanGameScore = Math.round(meanGameScore * 10) / 10;

    // Get average round length by
    // summing array index by count / sum of counts
    // console.log(roundLengthsList);
    let roundLengthSumCount = roundLengthsList.reduce((acc, v, i) => {
      // console.log(acc.sum);
      acc.sum += i * v.count;
      acc.count += v.count;
      return acc;
    }, {sum: 0, count: 0});
    const avRoundLength = Math.round(roundLengthSumCount.sum / roundLengthSumCount.count * 10) / 10;
    // console.log(roundLengthSumCount);
    // console.log(avRoundLength);

    // Get average round score by
    // summing array index * value / sum of values (counts)
    // console.log(roundScoresList);

    let roundScoreSumCount = (obj) => {
      let acc = {sum: 0, count: 0};
      for (let j in obj) {
        acc.sum += j * obj[j];
        acc.count += obj[j];
      }
      return acc;
    }

    let abc = roundScoreSumCount(roundScoresList);
    // console.log(abc);
    const avRoundScore = Math.round(abc.sum / abc.count * 10) / 10;
    // console.log(avRoundScore);


    // return an array
    // array should have game lengths + count
    // array should have total games + count
    // array should have average game length
    // array should have average game score
    // array should have average round length
    // array should have average round score
    let retArray = [
      `Total Games: ${k}`,
      `Mean Game Rounds: ${meanGameRoundLength}`,
      `Mean Game Score: ${meanGameScore}`,
      `Mean Round Length: ${avRoundLength}`,
      `Mean Round Score: ${avRoundScore}`,
    ];



    return retArray;
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
    let roundScore = 0;
    let winsCount = {a: 0, b: 0, tie: 0, none: 0};
    let scoreSumA = 0;
    let scoreSumB = 0;
    let winnerGame = '';
    let retRound = {
      gameWinner: '',
      roundLengths: [],
      roundScores: [],
      gameScore: 0,
    };

    while (nRounds.length < n) {
      // newRound will be an array of objects {die1: , die2:, cuml: }
      newRound = this.playOneRound(stop);
      nRounds.push(newRound);
      roundLength = newRound.allRolls.length;
      if (newRound.allRolls[roundLength - 2]) {
        roundScore = newRound.allRolls[roundLength - 2].cuml;
      } else {
        roundScore = 0;
      }

      retRound.roundLengths.push(roundLength);
      retRound.roundScores.push(roundScore);
      let winner = newRound.winner;
      winsCount[winner] += 1;
      scoreSumA += newRound.scoreA;
      scoreSumB += newRound.scoreB;

      if (roundStats[roundLength]) {
        roundStats[roundLength].count += 1;

      } else {
        roundStats[roundLength] = {count: 1};
      }
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

    // calculate game score and update retRound object
    const gameScore = retRound.roundScores.reduce((acc, v) => {
      return acc + v;
    });
    retRound.gameScore = gameScore;

    // set gameWinner in retRound
    retRound.gameWinner = winnerGame;


    // console.log(nRounds);
    // console.log(roundStats);
    // console.log(roundStatsRet);
    // console.log(retRound);

    // this object must have a gameWinner property
    return retRound;
  },
  
  // play a round until double or PlayerA ends and PlayerB ends
  playOneRound(stop) {
    // console.log(stop);

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

  getRoundLengths(lengthsArray) {
    const la = lengthsArray;
    return 'nothing yet';
  },

  // 
  getRoundScores(scoresArray) {
    const sa = scoresArray;
    return 'nothing yet';
  }
}

export default Simulations;