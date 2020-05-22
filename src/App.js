import React from 'react';
import './App.css';
import Recipe from './Recipe/pages/recipe'

/**
 * Parent
 *      App
 * 
 * Child
 *      Recipe
 */

function App() {
  return (
    <div className="wrapper">
      <Recipe />
    </div>
  );
}

export default App;
