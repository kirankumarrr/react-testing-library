import {  Route, Switch } from 'react-router-dom'
import UserSignUpPage from '../pages/UserSignUpPage';

import * as apiCalls from '../api/apiCalls';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import UserPage from '../pages/UserPage'
import TopBar from '../components/TopBar/TopBar';

const actions = {
  postSignup :apiCalls.signup, 
  postLogin :apiCalls.login
}

function App() {


  return (
    <div className="container">
      <TopBar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={(props)=> <LoginPage {...props} actions={actions} />} />
        <Route exact path="/signup" component={(props)=> <UserSignUpPage {...props} actions={actions} />} />
        <Route exact path="/:userpage" component={UserPage} />
      </Switch>
    </div>
  );
}

export default App;
