import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListMemberComponent from './components/ListMemberComponent';
import AddMemberComponent from './components/AddMemberComponent';
import LoginComponent from './components/LoginComponent';

function App() {
  return (
    <div className="app-wrapper">
      <Router>
        <HeaderComponent />
        <div className="main-content container">
          <Routes>
            <Route path="/" element={<LoginComponent />} />
            <Route path="/members" element={<ListMemberComponent />} />
            <Route path="/add-member" element={<AddMemberComponent />} />
            <Route path="/edit-member/:id" element={<AddMemberComponent />} />
          </Routes>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
