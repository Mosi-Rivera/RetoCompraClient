import React, { useState } from 'react';

const MyForm = () => {
  const [formData, setFormData] = useState({
    first_name: '', 
    last_name: '',
    email: '',
    password: '',
    confirm_password: ''
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
  const confirm_password = formData.confirm_password;

    if (password !== confirm_password)
    { 
      setErrorMessage ( {error: "Confirm password does not match"});
      console.log(password,confirm_password)
      return; 
    
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
        <input type="password" name="password" value={formData.password} onChange={handleChange} pattern=" ($10<)(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" />
      </label>
      <br />
      <label>
        Confirm password:
        <input type="password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} />
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