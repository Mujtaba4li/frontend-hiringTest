import LoginPage from "./screens/LoginPage";
import Dashboard from "./screens/Dashboard";


import {
  BrowserRouter,
  Switch,
  Route,

} from "react-router-dom";

function App() {
  return (
   <>
   <BrowserRouter>
        <Switch>
          <Route path="/" exact component={LoginPage} />
          <Route path="/dashboard" component={Dashboard} />
         
        </Switch>
      </BrowserRouter>
   </>
  );
}

export default App;
