import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Login from './components/Login';
import Signup from './components/Signup';
import Layout from './hoc/Layout';
import Home from './pages/Home';
import store from './store';



const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
