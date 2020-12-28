import React, { useState } from "react";
import styled from "styled-components";
import { withRouter, Link } from "react-router-dom";
import { device } from "../../resources/mediaquery";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { auth, firestore } from "../Firebase/firebase";
import GoogleSignInButton from "../Shared/Buttons/GoogleSignInButton";
import Register from "./Register";
import { setCurrentUser } from "../../redux/user/user-actions";

const SignIn = ({ setCurrentUser, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [cash] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1609172536/Dividend%20Tracker/Icons/cash-bill-svgrepo-com_dtqrjh.svg"
  );
  const [littleLoader] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1608614181/Dividend%20Tracker/Icons/SearchResults/loading-loader-svgrepo-com_urrwap.svg"
  );
  const [close] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1608616936/Dividend%20Tracker/Icons/SearchResults/close-svgrepo-com_c2ygft.svg"
  );

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
          setCurrentUser(data.data());
          history.push("/home");
          return;
        });
    } catch (err) {
      setLoading(false);
      alert(err.message);
      console.error(err);
    }
  };

  const handleLoadRegistration = () => {
    setLoading(true);
    let wrapper = document.querySelector("#register_wrapper");

    setTimeout(() => {
      wrapper.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
      setLoading(false);
    }, 3000);
    setShowRegistrationForm(true);
  };
  return (
    <Container>
      <Header>
        <Link to="/">
          <h1>
            Dividend Tracker <img src={cash} alt="cash" />
          </h1>
        </Link>
      </Header>
      <Wrapper opacity={loading ? "0.5" : null}>
        <h3>Sign In to your account</h3>
        <Form
          opacity={showRegistrationForm ? "0.5" : null}
          events={showRegistrationForm ? "none" : null}
        >
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
              <span onClick={() => handleLoadRegistration()}> Register</span>
            </NoAccount>
          )}
          {showRegistrationForm ? (
            <div>
              <Close
                src={close}
                alt="close"
                onClick={() => setShowRegistrationForm(false)}
              />
              <Register />
            </div>
          ) : null}
        </RegWrapper>

        {loading ? <Loader src={littleLoader} alt="loading" /> : null}
      </Wrapper>
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
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  /* border: 1px solid red; */
`;
const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 3rem;
  background-color: #333;

  h1 {
    margin-left: 2rem;
    font-size: 1.5rem;
    color: #fff;
    /* border: 1px solid red; */
  }

  img {
    width: 2rem;
    transform: rotate(-45deg);
    margin-left: 1rem;
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
  cursor: pointer;
  width: 5.5rem;
  height: 2rem;
  margin: 2rem 0;
  border-radius: 3px;
  background-color: #27d67b;
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
const Close = styled.img`
  position: absolute;
  left: calc(100% - 7rem);
  top: 1rem;
  width: 1.5rem;
  cursor: pointer;
  /* border: 1px solid blue; */
`;
