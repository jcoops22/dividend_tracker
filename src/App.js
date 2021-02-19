import "./App.css";
import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { auth } from "./Components/Firebase/firebase";
import Home from "./Components/Home/Home";
import Landing from "./Components/Home/Landing";
import SignIn from "./Components/Home/SignIn";
import Reports from "./Components/Home/Reports";
import { UserContext } from "./Components/Context/UserProvider";

function App({ history }) {
  const { setCurrentUserAction, currentUser } = useContext(UserContext);
  useEffect(() => {
    // check for user in localStorage
    let user = JSON.parse(window.localStorage.getItem("currentUser"));
    setCurrentUserAction(user);
    // listen for changes like sign out
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setCurrentUserAction(null);
      }
    });
    // clean up
    return () => {
      unsub();
    };
  }, [auth]);

  return (
    <Container className="App">
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route
          exact
          path="/signin"
          render={() => (!currentUser ? <SignIn /> : <Redirect to="/home" />)}
        />
        <Route
          exact
          path="/home"
          render={() =>
            currentUser ? <Home history={history} /> : <Landing />
          }
        />
        <Route
          exact
          path="/reports"
          render={() =>
            currentUser ? <Reports history={history} /> : <Redirect to="/" />
          }
        />
        <Route path="*" component={Landing} />
      </Switch>
    </Container>
  );
}

export default withRouter(App);
// styles
const Container = styled.div`
  /* border: 2px solid blue; */
`;
