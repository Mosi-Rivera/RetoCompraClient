import React, { useContext, useState } from 'react';
import { registerForm} from "../api/authRoutes"
import userContext from "../contexts/userContext";
import { Box, Button, TextField, Typography } from '@mui/material';
// import "../styles/MyForm.css"

const MyForm = () => {
  const {setUserInfo} = useContext(userContext);
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

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setErrorMessage({error: "All fields must be filled."});
      return;
    }

    if (password !== confirmPassword){ 
      setErrorMessage ( {error: "Passwords do not match."});
      return; 
    }

    try {
      const {user} = await registerForm(formData);
      setUserInfo({isAuthenticated: true, user});
    } catch (error) {
      setErrorMessage({error: "Something went wrong. Try again."});
    }
  };

  return (
    <Box
    component="form"
    autoComplete='off'
    onSubmit={handleSubmit}
    >
      <div>
        <TextField
        fullWidth
        margin="normal"
        focused
        color="primary"
        type='text'
        name='firstName'
        label="First Name"
        onChange={handleChange}
        value={formData.firstName}
        />
      </div>
      <div>
        <TextField
        fullWidth
        margin="normal"
        focused
        color="primary"
        type='text'
        name='lastName'
        label="Last Name"
        onChange={handleChange}
        value={formData.lastName}
        />
      </div>
      <div>
        <TextField
        fullWidth
        margin="normal"
        focused
        color="primary"
        type='email'
        name='email'
        label="Email"
        onChange={handleChange}
        value={formData.email}
        />
      </div>
      <div>
        <TextField
        fullWidth
        margin="normal"
        focused
        color="primary"
        type='password'
        name='password'
        label="Password"
        onChange={handleChange}
        value={formData.password}
        />
      </div>
      <div>
        <TextField
        fullWidth
        margin="normal"
        focused
        color="primary"
        type='password'
        name='confirmPassword'
        label="Confirm Password"
        onChange={handleChange}
        value={formData.confirmPassword}
        />
      </div>
      <div>
        {errorMessage.error && <Typography color="error" marginBottom={1}>*{errorMessage.error}</Typography>}
      </div>
      <div>
        <Button 
        variant="contained"
        size="large"
        fullWidth
        type='submit'
        >
          Register
        </Button>
      </div>
    </Box>
  );
};

export default MyForm;
