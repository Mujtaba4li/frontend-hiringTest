import LoginPage from "./screens/LoginPage";
import Dashboard from "./screens/Dashboard";
import UserAuth from "./api/UserAuth";
// import {useNavigate} from 'react-router-dom'
import {

  Routes,
  Route,

} from "react-router-dom";
import PageNotFound from "./screens/PageNotFound";

function App() {
  // const navigate=useNavigate();
  const { getToken } = UserAuth();
  if (!getToken()) {
    // navigate('LoginPage');
    return <LoginPage />
  }
  return (
    <>

      <Routes>
        <Route path="/" exact element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

    </>
  );
}

export default App;
