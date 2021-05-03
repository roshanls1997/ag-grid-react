import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Practice from './components/practice/Practice';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Header} />
          <Route path="/practice" component={Practice} />
        </Switch>
      </BrowserRouter>

      
    </div>
  );
}

export default App;