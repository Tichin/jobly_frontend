import RouteList from "./Routelist";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./NavBar";
import './App.css';
import { useState } from 'react';
import JoblyApi from './api.js';
import jwt_decode from "jwt-decode";
import userContext from "./userContext";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";


/**
 * App to initialize jobly
 *
 * state: none
 *
 * props: none
 *
 * App -> {RouteList, NavBar}
 *
 */

function App() {

  const [user, setUser] = useState({ token: '', currentUser: null });

  /**
  * Login user
  * Takes fields of a user
  * fields can be: { username, password}
  *
  * update user state
  */
  async function login(fields) {

    const token = await JoblyApi.login(fields);

    console.log("App in login, token=", token);

    // decode
    // decoded: {username: 'testtest', isAdmin: false, iat: 1693603878}
    const decoded = jwt_decode(token);
    console.log('App in login after decode=', decoded);

    setUser({ token: token, currentUser: decoded });
  }

  /**
   * Signup user
   * Takes fields of a user
   * fields can be: { username, password, firstName, lastName, email }
   *
   * update user state
   */
  async function signup(fields) {
    const token = await JoblyApi.signup(fields);

    console.log("App in signup, token=", token);

    // decode
    // decoded: {username: 'testtest', isAdmin: false, iat: 1693603878}

    const decoded = jwt_decode(token);
    console.log('App in signup after decode=', decoded);

    setUser({ token: token, currentUser: decoded });
  }

  // login => token, done
  // setUser({token: token}) done
  //  username<= decode(token) done
  // signup done
  // logout??
  // need to have function in api.js => set token: null, currentUser:null
  // edit
  return (
    <userContext.Provider value={{
      user: user.currentUser,
      login: login,
      signup: signup
    }}>
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <RouteList />
        </BrowserRouter>
      </div>
    </userContext.Provider>

  );
}

export default App;
