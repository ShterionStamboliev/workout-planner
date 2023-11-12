import { useState } from "react";
import './Register.css'
import { useRegister } from "../../hooks/useRegister";

function Register() {
    const [value, setValue] = useState({
        email: '',
        password: ''
    });

    const { register, error, isLoading } = useRegister();

    const changeHandler = (event) => {
        setValue({
            ...value,
            [event.target.name]: event.target.value
        })
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        await register(value.email, value.password);
    }

    return (
        <div className="register-form-container">
            <form className="register-form" onSubmit={handleFormSubmit}>
                <h2>Sign up</h2>

                <label className="register-form-label">Email: </label>
                <input className="register-form-input" type="email" name="email" onChange={changeHandler} value={value.email} />

                <label className="register-form-label">Password: </label>
                <input className="register-form-input" type="password" name="password" onChange={changeHandler} value={value.password} />

                <button disabled={isLoading} className="register-form-button">Register</button>

                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}

export default Register