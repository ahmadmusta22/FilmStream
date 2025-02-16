import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../Contexts/LanguageContext";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const favoritesCount = useSelector((state) => state.favorites.favorites.length);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark w-100">
      <div className="container">
        <Link className="navbar-brand" to="/">FilmStream</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">{t("home")}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/favorites">
                {t("favorites")} <span className="badge bg-danger">{favoritesCount}</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">{t("signin")}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">{t("register")}</Link>
            </li>
          </ul>
          <button className="btn btn-outline-light" onClick={toggleLanguage}>
            {language === "en" ? "EN" : "AR"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;






