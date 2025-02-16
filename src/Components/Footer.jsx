import React from 'react';

export default function Footer() {
    return (
        <div className="footer">
            <h3>FilmStream</h3>
            <p>Discover the best movies with our platform.</p>
            
            <div className="footer-links">
                <a href="/">Home</a>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
                <a href="/privacy-policy">Privacy Policy</a>
            </div>
            
            <div className="social-icons">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i>
                </a>
            </div>
            
            <div className="footer-bottom">
                <p>&copy; 2025 FilmStream. All rights reserved.</p>
            </div>
        </div>
    );
}
