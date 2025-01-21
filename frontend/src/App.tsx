import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CreatePage from "src/components/auth/CreatePage";
import LoginPage from 'src/components/auth/LoginPage';
import ProtectRoute from "src/components/auth/protect-route";
import Header from "src/components/header/header";
import Main from "src/components/main/MainPage";

const App = () => {
    let isLoggedIn = true
    if(sessionStorage.getItem("token") === null) {
        isLoggedIn = false
    }
  return (
    <BrowserRouter>
        <Header />
      <Routes>
        <Route path="/" element={<Navigate to = "/home"/>} />
        <Route path="/home" element={
            <ProtectRoute isAuthenticated={isLoggedIn}>
                <Main />
            </ProtectRoute>
        } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signin" element={<CreatePage />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;