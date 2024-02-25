import React, { useContext, useState } from "react";
import { signIn } from "../api/authRoutes";
import userContext from "../contexts/userContext";
import CryptoJS from "crypto-js";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
const defaultErrorState = { server: "", email: "", password: "" }


export default function SignIn() {
    const { setUserInfo } = useContext(userContext);

    const [signForm, setSignForm] = useState({
        email: "",
        password: ""
    });

    const [errorMessage, setErrorMessage] = useState(defaultErrorState)

    function handleChange(event) {
        const { name, value } = event.target;
        setSignForm(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const encryptedPassword = CryptoJS.AES.encrypt(signForm.password, import.meta.env.VITE_KEY).toString()
        if (signForm.email === "" || signForm.password === "") {
            setErrorMessage({
                email: signForm.email === "" ? "all fields are required" : "",
                password: signForm.password === "" ? "all fields are required" : ""
            })
            return
        }
        try {
            const { user } = await signIn({ ...signForm, password: encryptedPassword });
            setUserInfo({ isAuthenticated: true, user });
        }
        catch (error) {
            if (error.status === 400) {
                const { field, errorMessage } = await error.json()
                setErrorMessage({ ...defaultErrorState, [field]: errorMessage })
                return
            }
            setErrorMessage({ ...defaultErrorState, server: "something went wrong, please try again" })
        }
    }

    return (
        <>
            <Box component="form" onSubmit={handleSubmit} width={200}>
                <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    name="email"
                    value={signForm.email}
                    onChange={handleChange}
                    type="email"
                    size="normal"
                    fullWidth
                    helperText={errorMessage.email}
                    error={!!errorMessage.email}
                >
                </TextField>
                <TextField
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    name="password"
                    value={signForm.password}
                    onChange={handleChange}
                    type="password"
                    size="normal"
                    fullWidth
                    helperText={errorMessage.password}
                    error={!!errorMessage.password}
                >
                </TextField>
                {errorMessage.server &&
                    <Typography color="error">{errorMessage.server}</Typography>
                }
                <Button
                    variant="contained"
                    size="normal"
                    color="secondary"
                    fullWidth
                    type="submit"
                >Sign In
                </Button>
            </Box >
        </>
    )
}
