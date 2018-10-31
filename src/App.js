import React, { Component } from 'react';
import algorithms from './Components/Rosetta-01-100Doors';
import algorithms02 from './Components/Rosetta-02-24Game';
import Euler from './Components/Euler';
import Simulations from './Components/Simulations';
import HackerRank from './Components/HackerRank';
import './App.css';

const AlgsProject = () => {
  const outputR01a = () => algorithms.getFinalOpenedDoors(100);
  const outputR01b = () => algorithms.getFinalOpenedDoorsSkips(100);
  const outputR01c = () => algorithms.getFinalOpenedDoorsObjSkips(100);
  const outputR02a = () => algorithms02.solve24('4878'); // Input digits 4878 1234 6789 1127 1569
  const outputR02b = () => algorithms02.operationCombinations(4); // 4 operations
  const outputE01 = () => Euler.MultiplesOf3and5(49); // 4 operations
  const outputE02 = () => Euler.SumEvenFibs(23); // 4 operations
  const outputS01 = () => Simulations.playGames(99999, 7, 999, 998); // rounds, stopA, stopB
  const outputz = (str) => {return [eval(str)]}; // rounds, stopA, stopB
  const outputH01 = () => HackerRank.waitingTime([1,1,1,1], 0);
  const outputH02 = () => HackerRank.reformatDate();
  const outputH03 = () => HackerRank.arrayPlay();
  const outputE03 = () => Euler.largestPrimeFactor(600851475143);
  const outputE04 = () => Euler.largestPalindromeProduct(5); // arg is number of digits


  
  const show = outputE04(); // Change this to see an algorithm output

  return (
    <div>
      {
        <div>
          <h3>Algorithms</h3>
          {              
            show.map(item => (
              <div>{item}</div>
            ))
          }
        </div>
      }
    </div>
   );
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Problem Solving</h1>
        <AlgsProject />
      </div>
    );
  }
}

export default App;
