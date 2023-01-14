import LoginPage from "./screens/LoginPage";
import Dashboard from "./screens/Dashboard";


import {
  BrowserRouter,
  Routes,
  Route,

} from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<LoginPage />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
