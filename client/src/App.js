
import React from 'react';
import Routing from './routing/Routing';

import './App.css';
import ShoppingList from './components/ShoppingList/ShoppingList';
import ChoreChart from './components/ChoreChart/ChoreChart'

const App = () => {
  return (
    <div className='App'>
      Hello World
      {
        <div>
        {/* <ShoppingList/> */}
        <ChoreChart/>
        </div>
      }
      <Routing />
    </div>
  );
};

export default App;

