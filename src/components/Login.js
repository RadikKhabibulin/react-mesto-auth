import React from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/Auth";


function Login({onHandleLogin}) {
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
    login(email, password)
    .then((data) => {
      if (data.token) {
        setEmail('');
        setPassword('');
        onHandleLogin();
        navigate('/');
      }
    });
  }

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
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
          <button className="login__submit" type="submit" aria-label="Войти">Войти</button>
        </form>
    </div>
  );
}

export default Login;
