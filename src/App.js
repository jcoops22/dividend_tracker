import "./App.css";
import styled from "styled-components";
import Home from "./Components/Home/Home";

function App() {
  return (
    <Container className="App">
      <Home />
    </Container>
  );
}

export default App;

// styles
const Container = styled.div`
  /* border: 2px solid blue; */
`;
