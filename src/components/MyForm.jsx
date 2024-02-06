import React, { useState } from 'react';
import { registerForm} from "../api/authRoutes"
import "../styles/Myform.css"

const MyForm = () => {
  const [formData, setFormData] = useState({
    first_name: '', 
    last_name: '',
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
  const confirm_password = formData.confirmPassword;

      if (password !== confirm_password)
    { 
      setErrorMessage ( {error: "Confirm password does not match"});
      console.log(password,confirm_password)
      return; 
  
    }

    try {
      const user = await registerForm(formData);
      console.log(user)
  } catch (error) {
      console.log(error)
    }

    // Add logic to handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
      </label>
      <br />
      <label>
        Last Name:
        <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$" 
        title="Must contain at least one number and one uppercase and lowercase letter, and at least 5 or more characters" />
      </label>
      <br />
      <label>
        Confirm password:
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
      </label>
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