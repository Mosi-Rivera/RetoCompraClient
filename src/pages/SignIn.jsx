import React, { useState } from "react";
import "../styles/SignIn.css";
import Header from "../components/Header";
import { signIn } from "../api/authRoutes";


export default function SignIn() {

    const [signForm, setSignForm] = useState({
        email: "",
        password: ""
    });

    const [submitForm, setSubmitForm] = useState({});

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
        try {
            const user = await signIn(signForm);
            console.log(user)
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div>
            <Header />
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