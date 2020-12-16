import React, { useState } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import { auth, creatUserProfileDocument } from "../Firebase/firebase";

const Register = () => {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("Passwords don't match");
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      creatUserProfileDocument(user, { first, last });
    } catch (err) {
      alert(err);
      console.log(err);
      console.error(err);
    }
  };

  return (
    <Form>
      <legend>Create your account:</legend>
      <fieldset>
        <label>First Name:</label>
        <input
          type="text"
          placeholder="first"
          onChange={(e) => setFirst(e.target.value)}
        />
        <label>Last Name:</label>
        <input
          type="text"
          placeholder="last"
          onChange={(e) => setLast(e.target.value)}
        />
        <label>Email:</label>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          placeholder="enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Confirm Password:</label>
        <input
          type="password"
          placeholder="confirm password"
          onChange={(e) => setConfirm(e.target.value)}
        />
      </fieldset>
      <button onClick={(e) => handleSubmit(e)}>Submit</button>
    </Form>
  );
};

export default Register;

// styles
const Form = styled.form`
  overflow: hidden;
  opacity: 1;
  animation: fade_in_registration_form 1.3s 1.5s backwards;

  fieldset {
    display: flex;
    flex-direction: column;
  }

  label {
    color: #999;
  }

  input {
    font-size: 17px;
    height: 2.3rem;
    width: 8rem;
  }

  @keyframes fade_in_registration_form {
    from {
      height: 0;
    }
  }
`;
