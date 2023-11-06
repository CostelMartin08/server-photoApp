import React, { useState } from "react";
//import url base

const Register = () => {

    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const register = async () => {
        try {
            const response = await fetch(`/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    username: registerUsername,
                    password: registerPassword,
                }),
            });

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <section>
            <div>
                <h1>Register</h1>
                <input
                    placeholder="username"
                    onChange={(e) => setRegisterUsername(e.target.value)}
                />
                <input
                    placeholder="password"
                    onChange={(e) => setRegisterPassword(e.target.value)}
                />
                <button
                    onClick={register}
                >Submit
                </button>
            </div>


        </section>



    );
}

export default Register;