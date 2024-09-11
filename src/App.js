import logo from './logo.svg';
import './App.css';
import coffeeCup from './coffee-cup.png'

function App() {
  return (
    <div className="App">
      <div className='leftside'>
        <img src={coffeeCup}/>
      </div>
      <div className='rightside'>
        <h1>Buy Me A Coffee</h1>
      </div>
    </div>
  );
}

export default App;
