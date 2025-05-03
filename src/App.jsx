import { useState } from 'react';

import Counter from './components/Counter/Counter.jsx';
import Header from './components/Header.jsx';
import { log } from './log.js';
import ConfigureCounter from './components/Counter/ConfigureCounter';

function App() {
  log('<App /> rendered');

  // const [enteredNumber, setEnteredNumber] = useState(0);
  const [chosenCount, setChosenCount] = useState(0);

  // function handleChange(event) {
  //   setEnteredNumber(+event.target.value);
  // }

  function handleSetClick(enteredNumber) {
    setChosenCount(enteredNumber);
    // setEnteredNumber(0);
  }

  return (
    <>
      <Header />
      <main>
        {/* Set counter input causes entire component to re-render whether related to it or not. */}
        {/*  
        <section id="configure-counter">
          <h2>Set Counter</h2>
          <input type="number" onChange={handleChange} value={enteredNumber} />
          
          <button onClick={handleSetClick}>Set</button>
        </section>
        */}
        <ConfigureCounter onSet={handleSetClick} />
        <Counter key={chosenCount} initialCount={chosenCount} />
        {/* Counter component should not re-render on change of set counter input. It's happding because app components re-renders on change of state. */}
        {/* To fix this Counter component can use memo inside it. To prevent unnecessary re-render. */}
      </main>
    </>
  );
}

export default App;
