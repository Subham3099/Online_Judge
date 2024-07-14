import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // For navigation
import './SignUp.css'
import Cookies from 'js-cookie'
import axios from 'axios';

function Signup(){
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();  

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return; 
    }
    try {

      // const response = await fetch('http://localhost:8000/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      // setSuccessMessage(response.ok)
      // if (response.ok) {
      //   const data = await response.json();
      //   setSuccessMessage(response.data.message);
      //   console.log('Signup successful:', data); 
      //   const navigate = useNavigate();                         
      //   navigate('/login'); 
      // } else {
      //   const errorData = await response.json();
      //   setErrorMessage('Signup failed!');
      // }

      const response = await axios.post('http://localhost:8000/register', formData);
      console.log(response.data.token);
      Cookies.set('authToken', response.data.token);
      navigate('/home');
    } catch (error) {
      console.error('Signup error:', error);
      setErrorMessage('An error occurred. Please try again.');      //it is catching error but it is updated on cloud and backend 
    }
  };

  return (
    <div className="signup-form">
      <h1>Signup - Avast Ye!</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="error-message">{successMessage}</p>}
      <center>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          required
        />
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Ship Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <label htmlFor="confirmPassword">Confirm Ship Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Hoist the Colors!</button>
      </form>
      <a href="/login">
        <button type = "nav">Board yor Ship!!!</button>
      </a>
      </center>
    </div>
  );
};

export default Signup;
