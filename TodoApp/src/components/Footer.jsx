import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
  return (
    <footer className="footer bg-light text-dark py-3 mt-auto">
      <div className="container text-center">
        <nav className="mb-3">
          <Link to="/" className="text-dark mx-2">Home</Link>
          <Link to="/pricing" className="text-dark mx-2">Pricing</Link>
          <Link to="/aboutUs" className="text-dark mx-2">About</Link>
        </nav>
        <hr className="border-dark" />
        <p className="mb-0">© 2025 Company, Inc</p>
      </div>
      <style jsx="true">{`
        .footer {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          background-color: #f8f9fa; /* Faint gray color from Bootstrap */
        }

        .footer-nav {
          margin: 0;
          padding: 0;
        }

        .footer-nav li {
          display: inline;
          margin-right: 15px;
        }

        .footer-nav li:last-child {
          margin-right: 0;
        }

        .mt-auto {
          flex-grow: 1;
        }

        body, html, #root {
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        #root > * {
          flex-grow: 1;
        }
      `}</style>
    </footer>
  );
}

export default Footer;
