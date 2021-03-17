import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './component/login/login';
import Register from './component/register/register';
import Messenger from './component/messenger/messenger'
import ListUser  from './component/listUser/listUser'
class App extends Component {

  render() {

    return (
      <div>
        <Router>
          <Switch>
              <Route exact path="/registers" component={Register} />
              <Route exact path="/" component={Login} />
              <Route exact path="/messenger" component={ListUser} />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
