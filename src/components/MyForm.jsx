import React, { useState } from 'react';

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

  const handleSubmit = (e) => {
    e.preventDefault();

  const password = formData.password;
  const confirmPassword = formData.confirmPassword;

    if (password !== confirmPassword)
    { 
      setErrorMessage ( {error: "Confirm password does not match"});
      console.log(password,confirmPassword)
      return; 
    
    }


    // Add logic to handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
      </label>
      <br />
      <label>
        Last Name:
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} pattern=" ($10<)(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" />
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
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;