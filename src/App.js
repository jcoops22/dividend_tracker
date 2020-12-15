import "./App.css";
import styled from "styled-components";
import Home from "./Components/Home/Home";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <Container className="App">
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Container>
  );
}

export default App;

// styles
const Container = styled.div`
  /* border: 2px solid blue; */
`;
