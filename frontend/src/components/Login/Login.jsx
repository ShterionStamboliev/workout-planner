import { useState } from "react"
import { useLogin } from '../../hooks/useLogin'
import 'react-toastify/dist/ReactToastify.css'
import './Login.css'
import { ToastContainer, Zoom } from 'react-toastify'

function Login() {
    const [value, setValue] = useState({
        email: '',
        password: ''
    });

    const { login, isLoading } = useLogin();

    const changeHandler = (event) => {
        setValue({
            ...value,
            [event.target.name]: event.target.value
        })
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        

        await login(value.email, value.password);
    }

    return (
        <div className="login-form-container">
            <form className="login-form" onSubmit={handleFormSubmit}>
                <h2>Log in</h2>

                <label className="login-form-label">Email: </label>
                <input className="login-form-input" type="email" name="email" onChange={changeHandler} value={value.email} />

                <label className="login-form-label">Password: </label>
                <input className="login-form-input" type="password" name="password" onChange={changeHandler} value={value.password} />

                <button disabled={isLoading} className="login-form-button">Log in</button>
            </form>

            <ToastContainer
                transition={Zoom}
                autoClose={3000}
            />
        </div>
    )
}

export default Login