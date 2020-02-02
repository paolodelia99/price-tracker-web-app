import React,{Fragment,useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from "./store";
import AppNavbar from './components/AppNavbar';
import LandingPage from './components/Landing/LandingPage';
import Routes from './components/Routes';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

  return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Switch>
              <Route exact path='/' component={LandingPage}/>
              <Route component={Routes}/>
              <Route/>
            </Switch>
          </Fragment>
        </Router>
      </Provider>
  );
}

export default App;
