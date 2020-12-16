import "./App.css";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Landing from "./Components/Home/Landing";
import AddForm from "./Components/Home/AddForm";

function App() {
  return (
    <Container className="App">
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/add" component={AddForm} />
      </Switch>
    </Container>
  );
}

export default App;

// styles
const Container = styled.div`
  /* border: 2px solid blue; */
`;
