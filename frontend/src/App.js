import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Login from './components/Login';
import Signup from './components/Signup';
import Layout from './hoc/Layout';
import Home from './pages/Home';
import MainPage from './pages/MainPage';
import store from './store';
import PrivateRoute from './components/PrivateRoute';


const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/main" component={MainPage} />
          </Switch>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
