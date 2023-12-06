import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Login from "./components/User/Login";
import Signup from './components/User/UserSignup';
import UserProfilePage from './pages/UserProfilePage'
import UserProfileEdit from "./pages/UserProfileEdit";
import AdminLogin from './components/Admin/AdminLogin'
import AdminPage from './components/Admin/AdminPage'
import AdminUserEditPage from './pages/AdminUserEditPage'


import store from "./redux/store/ConfigureStore";
import { Provider } from 'react-redux'
import AdminCreateUser from "./pages/AdminCreateUser";
function App() {
  return (
    <Provider store={store}>
      <div>
        <BrowserRouter> 
          <Routes>
            <Route path="/" exact element={<Homepage />} />
            <Route path="/user/login" element={<Login />} />
            <Route path="/user/signup" element={<Signup />} />
            <Route path="/user/profile" element={<UserProfilePage />} />
            <Route path="/user/profile/edit" element={<UserProfileEdit/>} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminPage />} />
            <Route path="/admin/user/:userId" element={<AdminUserEditPage/>}/>
            <Route path="/admin/createUser" element={<AdminCreateUser/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}
 
export default App;
