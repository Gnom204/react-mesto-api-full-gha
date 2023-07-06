import { Link } from "react-router-dom"
import { useState } from "react"

function Register({ onRegister }) {
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
        onRegister(formValue.email, formValue.password)
    }

    return (
        <>
            <div className="register">
                <p className="register__heading">Регистрация</p>
                <form onSubmit={handleSubmit} className="register__form" id="registerForm">
                    <input onChange={handleChange} type="email" name="email" placeholder="Email" className="register__input" id="registerEmailInput" />
                    <input onChange={handleChange} type="password" name="password" placeholder="Пароль" className="register__input" id="registerPasswordInput" />
                    <button type="submit" className="register__button">Зарегистрироваться</button>
                </form>
                <span className="register__description">Уже зарегистрированы? <Link className="register__link" to='/sign-in'>Войти</Link></span>
            </div>
        </>
    )
}

export default Register