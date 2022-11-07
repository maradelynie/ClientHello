import { ReactNode } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "../components/Header";
import Load from '../Views/Load/Index'
import Home from '../Views/Home/Index'
// import Login from '../Views/Login/Index'
import Tournament from "../Views/Tournament/Index";
import Keys from "../Views/Keys/Index";
import Match from "../Views/Match/Index";

interface route {
  page: ReactNode;
}

const AppRoutes = () => (
  <BrowserRouter>
    <Header/>
      <div className="main-container">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/load" element={<Load/>} />
        <Route path="/tournament/:id" element={<Tournament/>} />
        <Route path="/keys/:category/:id" element={<Keys/>} />
        <Route path="/match" element={<Match/>} />
        {/* <Route path="/login" element={<Login/>} /> */}
      </Routes>
    </div>
  </BrowserRouter>
)

const PrivateRoutes = (routeProps:route) => {
  const token = sessionStorage.getItem('tokenHello')

  if(token) {return (
    <>
    {routeProps.page}
    </>
  )} else {return (
    <Navigate to="/login" replace />
  )}
}
export default AppRoutes;
