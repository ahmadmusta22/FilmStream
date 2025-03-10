import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom"; // ✅ Use HashRouter
import { Provider } from "react-redux";
import store from "./redux/store.js";
// import Navbar from "./Components/Navbar.jsx";
import Navbar from "./Components/Navbar.jsx";
import Movies from "./Components/Movies.jsx";
import Register from "./Components/Register.jsx";
import Login from "./Components/Signin.jsx";
import Showdetails from "./Components/Showdetails.jsx";
import Favorites from "./Components/Favorites.jsx";
import Footer from "./Components/Footer.jsx";
import Notfound from "./Notfound.jsx";
import { LanguageProvider } from "./Contexts/LanguageContext.jsx";
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
          <Router> {/* ✅ Use HashRouter here */}
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




