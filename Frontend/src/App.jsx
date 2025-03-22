import React from "react";
import AuthSidebar from "./UI components/AuthSidebar";
import AuthButton from "./UI components/AuthButton";
import { Navigate, Route, Routes } from "react-router-dom";
import Welcome from "./Pages/Welcome/Welcome";
import Singup from "./Pages/Singup";
import Signin from "./Pages/Signin";
import Home from "./Pages/Home/Home";
import VerifiedEmail from "./Pages/VerifiedEmail";
import ProtectedRoute from "./Secure/ProtectedRoute";
import { useAuthContext } from "./Context/UseAuthProvider";

const App = () => {
  const { isAuth } = useAuthContext();

  return (
    <>
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route
          path="/sign-up"
          element={isAuth ? <Navigate to={"/"} /> : <Singup />}
        />
        <Route
          path="/sign-in"
          element={isAuth ? <Navigate to={"/"} /> : <Signin />}
        />
        <Route
          path="/sign-up/verify-email/:token"
          element={<VerifiedEmail />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
