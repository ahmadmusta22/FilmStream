import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Movies from './Movies';
import Register from './Register';
import Notfound from '../Notfound';
import Navbar from './Navbar';
import Login from './Signin';
import Showdetails from './Showdetails';
import Favorites from './Favorites';
import Footer from './Footer';
import { LanguageProvider } from '../Contexts/LanguageContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from '../redux/store';


function App() {
  return (
    <LanguageProvider>
      <Provider store={store}>
        <div className="dark-mode">
          {/* ✅ Add basename */}
          <Router basename="/">
            <Navbar />
            <Routes>
              <Route path="/" element={<Movies />} />
              <Route path="/login" element={<Login />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/register" element={<Register />} />
              <Route path="/show/:id" element={<Showdetails />} />
              <Route path="*" element={<Notfound />} />
            </Routes>
            <ToastContainer theme="dark" />
          </Router>
          <Footer />
        </div>
      </Provider>
    </LanguageProvider>
  );
}

export default App;




