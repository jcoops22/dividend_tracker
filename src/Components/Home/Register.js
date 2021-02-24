import React, { useContext, useState } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import { auth, creatUserProfileDocument } from "../Firebase/firebase";
import { UserContext } from "../Context/UserProvider";
import ErrorComponent from "../Shared/ErrorComponent";

const Register = ({ setShowRegistrationForm, fromSignIn }) => {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [littleLoader] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1608614181/Dividend%20Tracker/Icons/SearchResults/loading-loader-svgrepo-com_urrwap.svg"
  );
  const [errorMessage, setErrorMessage] = useState(null);
  const { setCurrentUserAction } = useContext(UserContext);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (password !== confirm) {
      setErrorMessage("Passwords don't match");
      setLoading(false);
      return;
    }
    if (!first.length || !last.length) {
      setErrorMessage("Please enter a first and last name");
      setLoading(false);
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
      setCurrentUserAction(createdUser);
    } catch (err) {
      setLoading(false);
      setErrorMessage(err.message);
    }
  };

  return (
    <Form
      opacity={loading ? "0.5" : null}
      border={fromSignIn ? "none" : "2px solid #7249d1"}
    >
      {fromSignIn ? (
        <Close onClick={() => setShowRegistrationForm(false)}>&#10005;</Close>
      ) : null}
      <legend>Create your account:</legend>
      <fieldset>
        {errorMessage ? <ErrorComponent message={errorMessage} /> : null}
        <label>First Name:</label>
        <input
          type="text"
          placeholder="first"
          onChange={(e) => {
            setFirst(e.target.value);
            setErrorMessage(null);
          }}
        />
        <label>Last Name:</label>
        <input
          type="text"
          placeholder="last"
          onChange={(e) => {
            setLast(e.target.value);
            setErrorMessage(null);
          }}
        />
        <label>Email:</label>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
            setErrorMessage(null);
          }}
        />
        <label>Password:</label>
        <input
          type="password"
          placeholder="enter password"
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorMessage(null);
          }}
        />
        <label>Confirm Password:</label>
        <input
          type="password"
          placeholder="confirm password"
          onChange={(e) => {
            setConfirm(e.target.value);
            setErrorMessage(null);
          }}
        />
      </fieldset>
      <button disabled={loading} onClick={(e) => handleSubmit(e)}>
        Create Account
      </button>
      {loading ? <img src={littleLoader} alt="loading" /> : null}
    </Form>
  );
};

export default Register;

// styles
const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 600px;
  height: 100%;
  padding: 2rem 0;
  margin: 0 auto;
  overflow: hidden;
  opacity: ${(props) => props.opacity};
  background-color: rgba(255, 255, 255, 0);
  /* border: 1px solid red; */

  legend {
    width: 100%;
    font-size: 1.3rem;
    text-align: center;
    padding-left: 1rem;
    margin: 1rem 0;
    /* border: 1px solid red; */
  }

  fieldset {
    position: relative;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 600px;
    padding: 3rem 0;
    background-color: #fff;
    border-radius: 3px;
    border: none;
    /* border: 1px solid red; */

    input {
      font-family: "Exo", sans-serif;
      padding: 0.5rem 1rem;
      width: 80%;
      font-size: 20px;
      font-weight: bolder;
      margin-bottom: 0.5rem;
      /* border: 1px solid red; */
    }

    input::placeholder {
      color: #ccc;
      opacity: 0.6;
    }

    @media ${device.tabletS} {
      border-radius: 5px;
      border: ${(props) => props.border};
    }
  }

  img {
    position: absolute;
    width: 2rem;
    animation: spin_loader_in_register_form 1s linear infinite;
    /* border: 1px solid red; */

    @keyframes spin_loader_in_register_form {
      to {
        transform: rotate(360deg);
      }
    }
  }

  label {
    color: #999;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 7.8rem;
    height: 4.3rem;
    margin-top: 1rem;
    font-size: 1.2rem;
    font-weight: 200;
    color: #333;
    font-family: "Exo", sans-serif;
    background-color: #27d67b;
    border-radius: 3px;
    border: none;
    outline: none;
    /* border: 1px solid red; */
  }

  @keyframes fade_in_registration_form {
    from {
      height: 0;
      opacity: 0;
    }
  }
`;
const Close = styled.div`
  position: absolute;
  top: 0;
  left: calc(100% - 1.6rem);
  display: inline;
  width: 100%;
  font-size: 1.5rem;
  color: #999;
  color: #7249d1;
  cursor: pointer;
  /* border: 1px solid red; */
`;
