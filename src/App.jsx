import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Auth/AuthContext";
import Home from "./Home";
import Contact from "./Contact";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import ConfirmSignUp from "./Auth/ConfirmSignUp";
import Profile from "./Profile";
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword";
import RouteGuard from "./RouteGuard";
import ChangePassword from './Auth/ChangePassword';
import ResendCode from './Auth/ResendCode';
import UpdateProfile from './Auth/UpdateProfile';
import UserProfile from './Auth/UserProfile';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/signup">SignUp</Link>
            </li>
          </ul>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Profile />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/confirm-sign-up" element={<ConfirmSignUp />} />
            <Route path="/resend-code" element={<ResendCode />} />
            <Route
              path="/change-password"
              element={
                <RouteGuard>
                  <ChangePassword />
                </RouteGuard>
              }
            />
            <Route
              path="/update-user"
              element={
                <RouteGuard>
                  <UpdateProfile />
                </RouteGuard>
              }
            />
            <Route
              path="/profile"
              element={
                <RouteGuard>
                  <UserProfile />
                </RouteGuard>
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;