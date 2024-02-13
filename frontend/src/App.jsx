import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Pictures from "./Components/Photography/Pictures";

function App() {

  return (
    <>
      <Header />
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/:album" component={Pictures} />
          <Route component={<Redirect push to={Home} />} />
        </Switch>
      </div>
    </>
  );
}

export default App;
