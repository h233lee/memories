import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MainPage from './components/Pages/MainPage';
import LoginPage from './components/Pages/LoginPage';
import SignUpPage from './components/Pages/SignUpPage';

import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

const App = () => {
  const store = createStore(
    reducers,
    composeWithDevTools(compose(applyMiddleware(thunk)))
  );

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/posts" component={MainPage} />
          <Route exact path="/SignUpPage" component={SignUpPage} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
