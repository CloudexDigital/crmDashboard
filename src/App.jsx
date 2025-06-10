import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/mainLayout';
import Dashboard from './pages/dashboard';
import ClientList from "./pages/ClientList";
import Client from './pages/client'; 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './styles/App.css'

const App = () => {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        } />
        <Route path="/client" element={
          <MainLayout>
            <ClientList />
          </MainLayout>
        } />
         <Route path="/client/:id" element={
          <MainLayout>
            <Client />
          </MainLayout>
        } />
      </Routes>
    </Router>
  );
};

export default App;
