import React from 'react';
import { Link } from 'react-router-dom'; // Import Link if you are using React Router
import '../Home/Home.css';
import Carousel from 'react-bootstrap/Carousel';

const Home = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light" id="mynav">
        <Link className="navbar-brand px-5 col-sm-12 col-md-6" to="/">
          Apartment Amigo
        </Link>
        <div className="col-sm-12 col-md-4 ml-auto">
          <ul className="navbar-nav">
            <li className="nav-item px-1">
              <Link className="nav-link" to="# ">
                Discover
              </Link>
            </li>
            <li className="nav-item px-1">
              <Link className="nav-link" to="/features">
                Features
              </Link>
            </li>
            <li className="nav-item px-1">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item px-1">
              <Link className="nav-link" to="/contact">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-sm-12 col-md-1 mr-5 login-div">
          {/* Use Link for navigation */}
          <Link to="/login" className="btn btn-light px-4" id="loginButton">
            Login
          </Link>
        </div>
      </nav>

      {/* Main Section */}
      <div className="container mt-5">
        <div className="row">
          {/* Centered Text */}
          <div className="col-md-6 offset-md-3 text-center custom-text">
            <p>
              Want your apartment to feel like home? <br />
              Want to live in harmony with your roommates? <br />
              Become an Amigo today, <br />
              <em>
                with <strong>Apartment Amigo</strong>
              </em>
            </p>
          </div>

          <div className="col-md-6 offset-md-3 mt-3">
            {/* Bootstrap Carousel */}
            <div
              id="imageCarousel"
              className="carousel carousel-dark slide"
              data-ride="carousel"
            >
              {/* Indicators */}
              <ol className="carousel-indicators">
                <li
                  data-target="#imageCarousel"
                  data-slide-to="0"
                  className="active"
                ></li>
                <li data-target="#imageCarousel" data-slide-to="1"></li>
                <li data-target="#imageCarousel" data-slide-to="2"></li>
                <li data-target="#imageCarousel" data-slide-to="3"></li>
                <li data-target="#imageCarousel" data-slide-to="4"></li>
              </ol>
              {/* Slides */}
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src=""
                    className="img-fluid"
                    alt="Home"
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <h5>Welcome to Apartment Amigo!</h5>
                    <p>Your one-stop shop for managing your household</p>
                  </div>
                </div>
                {/* Add other carousel items similarly */}
              </div>
              {/* Controls */}
              <a
                className="carousel-control-prev"
                href="#imageCarousel"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#imageCarousel"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
