import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../utils/Auth";


function Register({onHandelRegsResult}) {
  const [email, setEmail] = React.useState('');
  const [password , setPassword] = React.useState('');
  const navigate = useNavigate();

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    register(email, password)
    .then(() => {
      onHandelRegsResult(true, 'Вы успешно зарегистрировались!');
      navigate('/sign-in');
    })
    .catch(() => {
      onHandelRegsResult(false, 'Что-то пошло не так! Попробуйте ещё раз.');
    })
  }

  return (
    <div className="login">
      <h2 className="login__title">Регистрация</h2>
        <form className="login__form" method="post" onSubmit={handleSubmit}>
          <input
            className="login__input login__input_element_email"
            id="email-input"
            type="email"
            minLength="2"
            maxLength="40"
            placeholder="Email"
            name="profile-email"
            required
            value={email}
            onChange={handleEmailChange}
          />
          <input
            className="login__input login__input_element_password"
            id="password-input"
            type="password"
            minLength="2"
            maxLength="200"
            placeholder="Пароль"
            name="profile-paswword"
            required
            value={password}
            onChange={handlePasswordChange}
          />
          <button className="login__submit" type="submit" aria-label="Зарегистрироваться">
            Зарегистрироваться
          </button>
        </form>
        <Link to="/sign-in" className="login__link">
          Уже зарегистрированы? Войти
        </Link>
    </div>
  );
}

export default Register;
