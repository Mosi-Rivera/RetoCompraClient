import React, { useContext, useState } from "react";
import "../styles/Form.css"
import { signIn } from "../api/authRoutes";
import userContext from "../contexts/userContext";
import CryptoJS from "crypto-js";


export default function SignIn() {
    const { setUserInfo } = useContext(userContext);

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

    async function handleClick(event) {
        event.preventDefault();
        const encryptedPassword = CryptoJS.AES.encrypt(signForm.password, import.meta.env.VITE_KEY).toString()
        try {
            const { user } = await signIn({ ...signForm, password: encryptedPassword });
            console.log(user)
            setUserInfo({ isAuthenticated: true, user });

        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div>
            <form className="signin-form" onSubmit={handleClick}>
                <input onChange={handleChange}
                    name="email"
                    value={signForm.email}
                    placeholder="Email"
                    type="email"
                ></input>
                <input onChange={handleChange}
                    name="password"
                    value={signForm.password}
                    placeholder="Password"
                    type="password"
                ></input>
                <button>Sign In</button>
            </form>
        </div>
    )
}
