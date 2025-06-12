import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/mainLayout";
import Dashboard from "./pages/dashboard";
import ClientList from "./pages/ClientList";
import Client from "./pages/client";
import { ToastContainer } from "react-toastify";
import { NotificationProvider } from "./context/NotificationContext";
import "react-toastify/dist/ReactToastify.css";
import "./styles/App.css";
import SignInPage from "./pages/signIn";
import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";

const App = () => {
  return (
    <NotificationProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} />
        
        {/* This handles signed in vs signed out */}
        <SignedIn>
          <Routes>

            <Route path="/sign-in" element={<SignInPage />} />

            <Route
              path="/"
              element={
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              }
            />
            <Route
              path="/client"
              element={
                <MainLayout>
                  <ClientList />
                </MainLayout>
              }
            />
            <Route
              path="/client/:id"
              element={
                <MainLayout>
                  <Client />
                </MainLayout>
              }
            />
          </Routes>
        </SignedIn>

        <SignedOut>
          <SignIn />
        </SignedOut>
      </Router>
    </NotificationProvider>
  );
};

export default App;
