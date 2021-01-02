import "./App.css";
import React, { useEffect } from "react";
import styled from "styled-components";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { auth } from "./Components/Firebase/firebase";
import Home from "./Components/Home/Home";
import Landing from "./Components/Home/Landing";
import { selectCurrentUser } from "./redux/user/user-selectors";
import { setCurrentUser } from "./redux/user/user-actions";
import SignIn from "./Components/Home/SignIn";
import Reports from "./Components/Home/Reports";

function App({ selectCurrentUser, setCurrentUser, history }) {
  useEffect(() => {
    console.log("in the app.js");
    auth.onAuthStateChanged((user) => {
      if (!user) {
        setCurrentUser(null);
      }
    });
  }, [auth]);

  return (
    <Container className="App">
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route
          exact
          path="/signin"
          render={() =>
            !selectCurrentUser ? <SignIn /> : <Redirect to="/home" />
          }
        />
        <Route
          exact
          path="/home"
          render={() =>
            selectCurrentUser ? <Home history={history} /> : <Landing />
          }
        />
        <Route
          exact
          path="/reports"
          render={() =>
            selectCurrentUser ? <Reports history={history} /> : <SignIn />
          }
        />
        <Route path="*" component={Landing} />
      </Switch>
    </Container>
  );
}

const mapStateToProps = createStructuredSelector({
  selectCurrentUser: selectCurrentUser,
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
// styles
const Container = styled.div`
  /* border: 2px solid blue; */
`;
