import React, { useState } from "react";
import styled from "styled-components";
import { withRouter, Link } from "react-router-dom";
import { device } from "../../resources/mediaquery";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { auth, firestore } from "../Firebase/firebase";
import GoogleSignInButton from "../Shared/Buttons/GoogleSignInButton";
import { setCurrentUser } from "../../redux/user/user-actions";

const SignIn = ({ setCurrentUser, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let { user } = await auth.signInWithEmailAndPassword(email, password);
      let userRef = await firestore
        .doc(`users/${user.uid}`)
        .get()
        .then((data) => {
          setCurrentUser(data.data());
          history.push("/home");
          return;
        });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Container>
      <Link to="/home">Home</Link>
      <h3>Sign In to your account</h3>
      <Form>
        <label htmlFor="email">Email:</label>
        <input
          name="email"
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          name="password"
          type="password"
          placeholder="enter password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Submit
        </button>

        <GoogleSignInButton />
      </Form>
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({});
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));

// styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Form = styled.form`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px solid #333;
`;
