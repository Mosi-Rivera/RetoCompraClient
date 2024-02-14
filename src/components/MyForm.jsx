import React, { useState } from 'react';
import { registerForm} from "../api/authRoutes"
import "../styles/Form.css"

const MyForm = () => {
  const [formData, setFormData] = useState({
    firstName: '', 
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errorMessage, setErrorMessage] = useState({
    error: undefined
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const password = formData.password;
 
    const confirmPassword = formData.confirmPassword;

    if (password !== confirmPassword){ 
      setErrorMessage ( {error: "Confirm password does not match"});
      return; 
    }

    // Logic to handle form submission
    try {
      const user = await registerForm(formData);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <form onSubmit={handleSubmit} className='register-form'>
      <label htmlFor="firstName" >
        firstName
        <input type="text" placeholder='First Name' name="firstName" value={formData.firstName} onChange={handleChange} />
      </label>
      <br />
      <label htmlFor="lastName">
        lastName
        <input type="text" placeholder='Last Name' name="lastName" value={formData.lastName} onChange={handleChange} />
      </label>
      <br />
      <label htmlFor="email">
        email
        <input type="email" placeholder='Email' name="email" value={formData.email} onChange={handleChange} />
      </label>
      <br />
      <label htmlFor="password">
        password
        <input type="password" placeholder='Password' name="password" value={formData.password} onChange={handleChange} pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$" 
        title="Must contain at least one number and one uppercase and lowercase letter, and at least 5 or more characters" />
      </label>
      <br />
        <input type="password" placeholder='Confirm Password' name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
      <br />
      {errorMessage.error &&  
        <span>{errorMessage.error}
        </span> }
        <br />
      <button type="submit">Register</button>
    </form>
  );
};

export default MyForm;
