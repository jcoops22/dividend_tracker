import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { device } from "../../resources/mediaquery";

const SignIn = () => {
  return (
    <Container>
      <h3>Sign In</h3>
      <Form>
        <label htmlFor="username">Username:</label>
        <input name="username" type="text" placeholder="username" />
        <label htmlFor="password">Password:</label>
        <input name="password" type="password" placeholder="enter password" />
        <Link to="/home">
          <button>Submit</button>
        </Link>
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
  height: 300px;
  width: 100%;
  max-width: 400px;
  border: 3px solid #333;
`;
