import { useState } from "react";

function Login({ onLogin }) {

    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(formValue.email, formValue.password);
    }

    return (
        <>
            <div className="register">
                <p className="register__heading">Вход</p>
                <form onSubmit={handleSubmit} className="register__form" id="loginForm">
                    <input onChange={handleChange} type="email" name="email" placeholder="Email" className="register__input" id="loginEmailInput" />
                    <input onChange={handleChange} type="password" name="password" placeholder="Пароль" className="register__input" id="loginPasswordInput" />
                    <button type="submit" className="register__button">Войти</button>
                </form>
            </div>
        </>
    )
}

export default Login