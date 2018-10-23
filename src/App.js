import React, { Component } from 'react';
import algorithms from './Components/rosetta-code-algorithms';
import algorithms02 from './Components/rosetta-02-24Game';
import './App.css';

const GetFinalOpenedDoors = () => {
  const output1 = algorithms.getFinalOpenedDoors(100);
  const output2 = algorithms.getFinalOpenedDoorsSkips(100);
  const output3 = algorithms.getFinalOpenedDoorsObjSkips(100);
  const output02a = algorithms02.solve24('1127'); // Input digits
  const output02b = algorithms02.operationCombinations(4); // 4 operations
  
  const show = '24Game';

  return (
    <div>
      {show === 'OpCombos' && (
        <div>
          <h3>Operation Combinations</h3>
          {              
            output02b.map(item => (
              <div>{item}</div>
            ))
          }
        </div>
      )}
      {show === '24Game' && (
        <div>
          <h3>24 Game</h3>
          {              
            output02a.map(item => (
              <div>{item}</div>
            ))
          }
        </div>
      )}
      {show === 'ArrayWithMap' && (
        <div>
          <h3>Using Array with map</h3>
          {
            output1.map(p => (
              <span key={p}>{p}, </span>
            ))
          }
        </div>
        )
      }
      {show === 'ArrayWithSkips' && (
        <div>
          <h3>Using Array with skips</h3>
          {
            output2.map(p => (
              <span key={p} >{p}, </span>
            ))
          }
        </div>
        )
      }
      {show === 'ObjectWithSkips' && (
        <div>
          <h3>Using Object with skips</h3>
          {
            output3.map(p => 
              <span key={p}>{p}, </span>  
            )
          }
        </div>
        )
      }
    </div>
   );
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Problem Solving</h1>
        <GetFinalOpenedDoors />
      </div>
    );
  }
}

export default App;
