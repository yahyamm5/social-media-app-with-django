import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import UserList from "./components/UserList"
import Feed from "./pages/Feed"

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/feed" element={<Feed/>} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/list" element={<UserList/>} />
    </Routes>
  )
}

export default App
