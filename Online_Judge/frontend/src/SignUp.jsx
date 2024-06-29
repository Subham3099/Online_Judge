import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // For navigation
import './SignUp.css'

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

    // try {
    //     const response = await axios.post('/http://localhost:8000/register', formData); // Replace with your actual API endpoint
  
    //     setSuccessMessage(response.data.message); // Assuming "message" is the key for success message in response
    //     setFormData({ firstname: '', lastname: '', email: '', password: '' }); // Clear form after successful signup
    //   } catch (error) {
    //     if (error.response) {
    //       setErrorMessage(error.response.data); // Assuming the error message is in the response data
    //     } else {
    //       setErrorMessage('Network error occurred. Please try again.');
    //     }
    //   }
    try {

      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setSuccessMessage(response.ok)
      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(response.data.message);
        console.log('Signup successful:', data); 
        // const navigate = useNavigate();                         
        // navigate('/login'); 
      } else {
        const errorData = await response.json();
        setErrorMessage('Signup failed!');
      }
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
      {/* <Link to="/admin/login">L/ogin to Administrator Account</Link> */}
      {/* <Link to="/sign-in">Login to Yer Ship</Link> */}
    </div>
  );
};

export default Signup;
