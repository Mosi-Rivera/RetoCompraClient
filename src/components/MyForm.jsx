import React, { useContext, useState } from 'react';
import { registerForm } from "../api/authRoutes"
import userContext from "../contexts/userContext";
import CryptoJS from "crypto-js";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import { Typography } from '@mui/material';

console.log(import.meta.env.VITE_KEY)

const MyForm = () => {
  const { setUserInfo } = useContext(userContext);
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


    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password)
    return setErrorMessage ({
      firstName: formData.firstName === "" ? "All fields are requiered": "",
      lastName: formData.lastName === "" ? "All fields are requiered": "",
      email: formData.email === "" ? "All fields are requiered": "",
      password: formData.password === "" ? "All fields are requiered": ""
  })

  const password = formData.password;
  const confirmPassword = formData.confirmPassword;

    if (password !== confirmPassword) {
      setErrorMessage({ error: "Confirm password does not match" });
      console.log(password, confirmPassword)
      return;
    }
    const encryptedPassword = CryptoJS.AES.encrypt(formData.password, import.meta.env.VITE_KEY)
    delete formData.confirmPassword
    try {
      const { user } = await registerForm({
        ...formData, password: encryptedPassword.toString()
      });
      console.log(user)


      setUserInfo({isAuthenticated: true, user});
  } catch (error) {
    console.log(error)
    if (error.status === 400) {
    const {field, errorMessage} = await error.json() 
console.log(field,errorMessage)
     setErrorMessage({[field]: errorMessage})
    }  
    console.log(error.status)

    }

    // Add logic to handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <Box component="form" sx={{maxWidth: 200}} onSubmit={handleSubmit}>
  <TextField 
    id="firstName"
    label="First Name"
    variant="outlined"
    name="firstName"
    value={formData.firstName}
    onChange={handleChange}
    error={!!errorMessage.firstName}  
    helperText={errorMessage.firstName}
    fullWidth
    margin='normal'
    />  
  <TextField 
    id="lastName"
    label="Last Name"
    variant="outlined"
    name="lastName"
    value={formData.lastName}
    onChange={handleChange}
    error={!!errorMessage.lastName}  
    helperText={errorMessage.lastName}
    fullWidth
    margin='normal'
    />  
    <TextField 
    id="email"
    label="Email"
    variant="outlined"
    name="mail"
    value={formData.email}
    onChange={handleChange}
    inputProps={{pattern: "^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$"}}
    error={!!errorMessage.email}
    helperText={errorMessage.email}
    fullWidth
    margin='normal'
    />  
    <TextField
    id="password"
    label="Password"
    variant="outlined"
    name="password"
    value={formData.password}
    onChange={handleChange}
    inputProps={{pattern:"($10<)(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" }}
    error={!!errorMessage.password}
    helperText={errorMessage.password}
    fullWidth
    margin='normal'
    />
       <TextField
    id="confirmPassword"
    label="Confirm Password"
    variant="outlined"
    name="confirmPassword"
    value={formData.confirmPassword}
    onChange={handleChange}
    error={!!errorMessage.confirmPassword}
    helperText={errorMessage.confirmPassword}
    fullWidth
    margin='normal'
    />  
      {errorMessage.server &&
        <Typography color="error">{errorMessage.server}
        </Typography>}
      <br />
      <button type="submit">Register</button>
    </Box>
  );
};

export default MyForm;
