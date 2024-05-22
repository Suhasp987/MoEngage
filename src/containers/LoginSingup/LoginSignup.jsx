import React, { useState } from 'react';
import './LoginSignup.css';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { message } from 'antd'; 

const LoginSignup = () => {
  const navigation = useNavigate();
  const [login, setLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (login) {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, formData);
        console.log(response.data);
        if (response.data.success) {
          localStorage.setItem('token', response.data.token);
          navigation('/home');
        }
      } else {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/register`, formData);
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        message.success('User created successfully. Switching to login.');

        // Switch to login form
        setLogin(true);

        // Clear form inputs
        setFormData({
          username: '',
          email: '',
          password: '',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      message.error('Error submitting form. Please try again.');
    }
  };

  const toggleForm = () => {
    setLogin((prevLogin) => !prevLogin);
  };

  return (
    <div className="loginSignup-container">
      <form className="form" onSubmit={handleFormSubmit}>
        <h2>{login ? 'Login' : 'Sign Up'}</h2>
        {!login && (
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleFormChange}
              required
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleFormChange}
            required
          />
        </div>
        <button type="submit">{login ? 'Login' : 'Sign Up'}</button>
        <p onClick={toggleForm}>
          {login ? 'Need an account? Sign up' : 'Already have an account? Login'}
        </p>
      </form>
    </div>
  );
};

export default LoginSignup;
