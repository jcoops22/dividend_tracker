import React, { useContext, useState } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import { auth, creatUserProfileDocument } from "../Firebase/firebase";
import { UserContext } from "../Context/UserProvider";

const Register = () => {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [littleLoader] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1608614181/Dividend%20Tracker/Icons/SearchResults/loading-loader-svgrepo-com_urrwap.svg"
  );
  const { setCurrentUserAction } = useContext(UserContext);

  const handleSubmit = async (e) => {
    setLoading(true);
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
      setCurrentUserAction(createdUser);
    } catch (err) {
      setLoading(false);
      alert(err);
      console.error(err);
    }
  };

  return (
    <Form opacity={loading ? "0.5" : null}>
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
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => props.opacity};
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
