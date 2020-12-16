import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { device } from "../../resources/mediaquery";
import { auth } from "../Firebase/firebase";
import GoogleSignInButton from "../Shared/Buttons/GoogleSignInButton";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      console.log("signed in");
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

export default SignIn;

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
