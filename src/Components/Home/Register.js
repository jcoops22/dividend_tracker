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
      <button onClick={(e) => handleSubmit(e)}>Create Account</button>
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
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: fade_in_registration_form 1.3s 2s backwards;
  /* border: 1px solid red; */

  legend {
    width: 100%;
    text-align: left;
    padding-left: 1rem;
    margin: 1rem 0;
  }

  fieldset {
    width: 100%;
    max-width: 600px;
    position: relative;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    background-color: #fff;
    border-radius: 3px;
    /* animation: slide_fieldset_in_register_form 1s 1.5s backwards; */
    border: none;

    input {
      font-family: "Exo", sans-serif;
      padding: 0.5rem 1rem;
      width: 80%;
      font-size: 20px;
      font-weight: bolder;
    }
    input::placeholder {
      color: #ccc;
    }

    @keyframes slide_fieldset_in_register_form {
      from {
        left: -100%;
      }
    }

    @media ${device.tabletS} {
      border: 2px solid #7249d1;
    }
  }

  label {
    color: #999;
  }

  button {
    cursor: pointer;
    width: 6.5rem;
    height: 3.3rem;
    align-self: center;
    padding: 0.5rem;
    margin-top: 1rem;
    background-color: #27d67b;
    border-radius: 3px;
    border: none;
    outline: none;
  }
  @keyframes fade_in_registration_form {
    from {
      height: 0;
      opacity: 0;
    }
  }
`;
