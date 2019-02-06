import React from 'react';
import Home from './Home';
import Details from './Details';
import { BrowserRouter, Route , Switch } from 'react-router-dom';

function App(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/details/:id" component={Details}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
