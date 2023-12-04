
import React from 'react';
import Routing from './routing/Routing';

import './App.css';
import ShoppingList from './components/ShoppingList/ShoppingList';

const App = () => {
  return (
    <div className='App'>
      Hello World
      {/* Add any layout components or global components here */}
      <Routing />
    </div>
  );
};

export default App;

