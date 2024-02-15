import React, { useContext, useState } from "react";
// import "../styles/Form.css"
import { signIn } from "../api/authRoutes";
import userContext from "../contexts/userContext";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";


export default function SignIn() {
    const {setUserInfo} = useContext(userContext);
    const [errorMessage, setErrorMessage] = useState({error: ''});
    const [signForm, setSignForm] = useState({
        email: "",
        password: ""
    });


    // this function will handle both inputs, by copying the singForm object, spreding it and adding the input name and value dynamically.
    function handleChange(event) {
        //this const deconstructured the event.target, to save space and readability.
        const { name, value } = event.target;

        //prevValue will take the object template on setSignForm, we will use that to plug in the new value.
        setSignForm(prevValue => {
            return {
                //...prevValue will spread the object, and will add what the user typed on the input ([name] = event.target.name, value = event.target.value)
                ...prevValue,
                [name]: value
            }
        })
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            if (!signForm.email || !signForm.password) {
                setErrorMessage({error: "Please fill all fields."});
                return;
            }
            const {user} = await signIn(signForm);
            console.log(user)
            setUserInfo({isAuthenticated: true, user});

        } catch (error) {
            setSignForm(state => ({...state, password: ''}));
            setErrorMessage({error: "Invalid username or password."});
        }
    }



    return (
        <div>
            <Box
                component="form"
                autoComplete="off"
                noValidate
                onSubmit={handleSubmit}
            >
                <div>
                    <TextField 
                        margin="normal"
                        label='Email' 
                        color="primary"
                        focused 
                        type="email" 
                        name="email"
                        value={signForm.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <TextField 
                        margin="normal"
                        label='Password' 
                        color="primary"
                        focused 
                        type="password" 
                        name="password"
                        value={signForm.password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    {errorMessage.error && <Typography color="error" marginBottom={1}>*{errorMessage.error}</Typography>}
                </div>
                <div>
                    <Button 
                    variant="contained"
                    type="submit"
                    size="large"
                    fullWidth
                    >
                        Log In
                    </Button>
                </div>
            </Box>
        </div>
    )
}
