import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";
import Navbar from "./Components/Navbar";
import Movies from "./Components/Movies";
import Register from "./Components/Register";
import Login from "./Components/Signin";
import Showdetails from "./Components/Showdetails";
import Favorites from "./Components/Favorites";
import Footer from "./Components/Footer";
import Notfound from "./Notfound";
import { LanguageProvider } from "./Contexts/LanguageContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './index.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <LanguageProvider>
      <Provider store={store}>
        <div className="dark-mode">
          <Router>
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




