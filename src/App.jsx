import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/mainLayout';
import Dashboard from './pages/dashboard';
import Client from './pages/client'; 
import './styles/App.css'

const App = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/client" element={<Client />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
