import React, { useState } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { auth, creatUserProfileDocument } from "../Firebase/firebase";
import { setCurrentUser } from "../../redux/user/user-actions";

const Register = ({ setCurrentUser }) => {
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
      // create ability to sign in with email and password
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      // create user in firestore and set as current user in redux
      let createdUser = await creatUserProfileDocument(user, { first, last });
      setCurrentUser(createdUser);
    } catch (err) {
      alert(err);
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

const mapStateToProps = createStructuredSelector({
  // currentUser: selectCurrentUser,
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);

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
