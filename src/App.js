import React from 'react'
import { Container } from 'react-bootstrap';
import {
  BrowserRouter as Router, Route, Switch
} from 'react-router-dom' 

import Nav from './components/Nav'
import Home from './components/Home'
import Favourite from './components/Favourite'

function App() {
  return (
    <Container>
      <Router>
        <Nav/>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/favourite' component={Favourite}/>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
