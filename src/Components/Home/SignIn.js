import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import { withRouter, Link } from "react-router-dom";
import { UserContext } from "../Context/UserProvider";
import { auth, firestore } from "../Firebase/firebase";
import Register from "./Register";
import GoogleSignInButton from "../Shared/Buttons/GoogleSignInButton";
import ErrorComponent from "../Shared/ErrorComponent";

const SignIn = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const { setCurrentUserAction } = useContext(UserContext);
  const [investingForHeader] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1613778050/Dividend%20Tracker/Icons/undraw_investing_7u74_d1vsuv.svg"
  );
  const [littleLoader] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1608614181/Dividend%20Tracker/Icons/SearchResults/loading-loader-svgrepo-com_urrwap.svg"
  );

  useEffect(() => {}, [errorMessage]);
  const handleSubmit = async (e) => {
    // prevent refresh
    e.preventDefault();
    setLoading(true);

    try {
      let { user } = await auth.signInWithEmailAndPassword(email, password);
      let userRef = await firestore
        .doc(`users/${user.uid}`)
        .get()
        .then((data) => {
          let user = data.data();
          // set current user
          setCurrentUserAction(user);
          // set in localStorage storage as well
          window.localStorage.setItem("currentUser", JSON.stringify(user));
          history.push("/home");
          return;
        });
    } catch (err) {
      setLoading(false);
      // alert(err.message);
      setErrorMessage(err.message);
      console.error(err);
    }
  };
  // for loading the registration form
  const handleLoadRegistration = () => {
    let wrapper = document.querySelector("#register_wrapper");

    setTimeout(() => {
      wrapper.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 100);
    setShowRegistrationForm(true);
  };
  return (
    <Container>
      <Header>
        <Link to="/">
          <h1>
            Dividend Tracker <img src={investingForHeader} alt="cash" />
          </h1>
        </Link>
      </Header>
      <Wrapper opacity={loading ? "0.5" : null}>
        <h3>Sign In to your account</h3>
        <Form
          opacity={showRegistrationForm ? "0.5" : null}
          events={showRegistrationForm ? "none" : null}
        >
          {errorMessage ? <ErrorComponent message={errorMessage} /> : null}
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={(e) => {
              setErrorMessage(null);
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            type="password"
            placeholder="enter password"
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorMessage(null);
            }}
          />

          <Button
            disabled={loading}
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Sign In
          </Button>
        </Form>
        <RegWrapper id="register_wrapper">
          {showRegistrationForm ? null : (
            <NoAccount>
              Don't have an account?
              <span onClick={() => handleLoadRegistration(true)}>Register</span>
            </NoAccount>
          )}
          {showRegistrationForm ? (
            <Register
              setShowRegistrationForm={setShowRegistrationForm}
              fromSignIn={true}
            />
          ) : null}
        </RegWrapper>

        {loading ? <Loader src={littleLoader} alt="loading" /> : null}
      </Wrapper>
    </Container>
  );
};

export default withRouter(SignIn);

// styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* border: 1px solid red; */
`;
const Header = styled.div`
  position: relative;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 3rem;
  background-color: #fff;

  h1 {
    display: flex;
    align-items: center;
    margin-left: 2rem;
    font-size: 1.5rem;
    color: #7249d1;
    /* border: 1px solid red; */
  }

  img {
    width: 2rem;
    margin-left: 1rem;
    /* border: 1px solid red; */
  }

  @media ${device.tabletS} {
    position: sticky;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => props.opacity};
  /* border: 1px solid red; */

  h3 {
    margin: 6rem 0 2rem;
    /* border: 1px solid red; */
  }

  @keyframes spin_loader_at_sign_in {
    to {
      transform: rotate(360deg);
    }
  }
`;
const Loader = styled.img`
  width: 2rem;
  animation: spin_loader_at_sign_in 1s linear infinite;
`;

const Form = styled.form`
  position: relative;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 2rem;
  opacity: ${(props) => props.opacity};
  pointer-events: ${(props) => props.events};
  /* border: 1px solid red; */

  label {
    margin-top: 2rem;
  }

  input {
    padding: 0.4rem 1rem;
    width: 80%;
    font-size: 18px;
  }

  input::placeholder {
    color: #ccc;
  }
`;
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 6.3rem;
  height: 3.3rem;
  margin: 3rem 0;
  font-size: 1rem;
  font-weight: 200;
  color: #333;
  font-family: "Exo", sans-serif;
  background-color: #27d67b;
  border-radius: 3px;
  border: none;
  outline: none;
  /* border: 1px solid red; */
`;
const RegWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 2rem 0;
  opacity: 0;
  animation: fade_reg_wrapper_in 1s linear forwards;
  /* border: 1px solid blue; */

  span {
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
    color: #7249d1;
    margin-left: 1rem;
  }

  @keyframes fade_reg_wrapper_in {
    to {
      opacity: 1;
    }
  }
`;
const NoAccount = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
