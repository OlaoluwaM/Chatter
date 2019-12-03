import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Auth } from './components/Auth';
import './index.css';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Auth} />
        </Switch>
      </div>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
