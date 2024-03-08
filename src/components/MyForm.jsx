import React, { useContext, useState } from 'react';
import { registerForm } from "../api/authRoutes"
import userContext from "../contexts/userContext";
import CryptoJS from "crypto-js";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import PasswordValidator from "password-validator"
import EmailValidator from "email-validator"


const passwordSchema = new PasswordValidator();
passwordSchema
  .is().min(5)
  .is().max(100)
  .has().uppercase()
  .has().lowercase()
  .has().digits()

const defaultErrorState = { server: "", email: "", password: "", firstName: "", lastName: "", confirmPassword: "" }


const MyForm = () => {
  const { setUserInfo } = useContext(userContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errorMessage, setErrorMessage] = useState(defaultErrorState)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password)
      return setErrorMessage({
        firstName: formData.firstName === "" ? "All fields are required" : "",
        lastName: formData.lastName === "" ? "All fields are required" : "",
        email: formData.email === "" ? "All fields are required" : "",
        password: formData.password === "" ? "All fields are required" : "",
        confirmPassword: formData.confirmPassword === "" ? "All fields are required" : "",
      })

    if (!EmailValidator.validate(formData.email)) {
      return setErrorMessage({ ...defaultErrorState, email: "Please enter valid email" })
    }
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;


    if (!passwordSchema.validate(password)) {
      return setErrorMessage({ ...defaultErrorState, password: "Must be at least 5 characters, contain lowercase, uppercase and number" })
    }


    if (password !== confirmPassword) {
      setErrorMessage({ ...defaultErrorState, confirmPassword: "Confirm password does not match" });
      return;
    }
    const encryptedPassword = CryptoJS.AES.encrypt(formData.password, import.meta.env.VITE_KEY)
    const { confirmPassword: _, ...newFormData } = formData

    try {
      const { user } = await registerForm({
        ...newFormData, password: encryptedPassword.toString()
      });


      setUserInfo({ isAuthenticated: true, user });
    } catch (error) {
      console.log(error)
      if (error.status === 400) {
        const { field, errorMessage } = await error.json()

        return setErrorMessage({ ...defaultErrorState, [field]: errorMessage })
      }
      setErrorMessage(defaultErrorState)
    }


    // Add logic to handle form submission
  };

  return (
    <Box component="form" sx={{ maxWidth: 200 }} onSubmit={handleSubmit}>
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
        size="normal"
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
        size="normal"

      />
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={!!errorMessage.email}
        helperText={errorMessage.email}
        fullWidth
        margin='normal'
        size="normal"
        type="email"

      />
      <TextField
        id="password"
        label="Password"
        variant="outlined"
        name="password"
        value={formData.password}
        type="password"
        onChange={handleChange}
        error={!!errorMessage.password}
        helperText={errorMessage.password}
        fullWidth
        margin='normal'
        size="normal"

      />
      <TextField
        id="confirmPassword"
        label="Confirm Password"
        variant="outlined"
        name="confirmPassword"
        value={formData.confirmPassword}
        type="password"
        onChange={handleChange}
        error={!!errorMessage.confirmPassword}
        helperText={errorMessage.confirmPassword}
        fullWidth
        margin='normal'
        size="normal"

      />
      {errorMessage.server &&
        <Typography color="error">{errorMessage.server}
        </Typography>}
      <br />
      <Button
        variant="contained"
        size="normal"
        color="secondary"
        fullWidth
        type="submit"
      > Register</Button>
    </Box>
  );
};

export default MyForm;
