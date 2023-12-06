import React from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css';

const Register = () => {

  
  return (
    <div className="container">
      {/* Signup Form Section */}
      <div className="form-container col-sm-12 col-md-6">
        <form id="signupForm">
          <h2 className="form-title">SIGN UP</h2>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control" id="email" name="email" required />
            <div className="invalid-feedback">Invalid</div>
            <div className="valid-feedback">Perfect!</div>
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" id="username" name="username" required />
            <div className="invalid-feedback">Invalid</div>
            <div className="valid-feedback">Perfect!</div>
            <span className="badge badge-warning" id="usernameWarning">At least 5 alphabets or digits</span>
          </div>
          {/* ... (similar conversion for other form groups) */}
          <div className="progress mb-3">
            <div className="progress-bar" id="progressBar" role="progressbar" style={{ width: '0%' }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
              <span id="progressBarText" />
            </div>
          </div>
          <div className="centered-button">
            <button type="submit" className="btn btn-primary" id="signupButton">
              Sign Up
            </button>
            <br />
            <br />
            <a href="login.html">Already an Amigo? Login here</a>
          </div>
        </form>
      </div>

      {/* Image with Text Overlay */}
      <div className="col-sm-12 col-md-6 image-container">
        <img src={require('../../assets/images/signup-bg.png')}alt="Background Image" className="img-fluid image" />
        <div className="text-overlay text-center">
          <p className="h2">APARTMENT AMIGO</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
