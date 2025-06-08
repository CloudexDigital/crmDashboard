import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/mainLayout';
import Dashboard from './pages/dashboard';
import Client from './pages/client'; 
import './styles/App.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        } />
        <Route path="/client" element={
          <MainLayout>
            <Client />
          </MainLayout>
        } />
      </Routes>
    </Router>
  );
};

export default App;
