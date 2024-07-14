import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './SignUp.css'

function Login(){
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();  

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8000/login', formData);
      console.log(response.data.token);
      Cookies.set('authToken', response.data.token);
      navigate('/home');
    } catch (error) {
      console.error('Signup error:', error);
      setErrorMessage('An error occurred. Please try again.');      //it is catching error put it is updated on cloud and backend 
    }

  };

  return (
    <center>
    <div className="signin-form">
      <h1>Come Aboard!!</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Hoist the Colors!</button>
      </form>
    </div>
    <a href="/">
      <button type = "nav2">Register yor Ship!!!</button>
    </a>
    </center>
  );
};

export default Login;