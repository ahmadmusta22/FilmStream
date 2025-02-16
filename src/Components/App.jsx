import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom"; // ✅ Use HashRouter
import { Provider } from "react-redux";
import store from "../redux/store.js";
import Navbar from "./Navbar";
import Movies from "./Movies";
import Register from "./Register";
import Login from "./Signin";
import Showdetails from "./Showdetails";
import Favorites from "./Favorites";
import Footer from "./Footer";
import Notfound from "../Notfound";
import { LanguageProvider } from "../Contexts/LanguageContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../index.css';
import '../App.css';
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




