import { Link, useNavigate, Routes, Route } from "react-router-dom";


function Header({loggedIn, email, onHandleLogout}) {
  const navigate = useNavigate();

  function clickButtonHandler() {
    if (loggedIn) {
      localStorage.removeItem('jwt');
      onHandleLogout();
    }
    else {
      navigate('sign-in');
    }
  }

  return (
    <header className="header">
      <Link to="/" className="header__logo" />
      <nav className="header__nav">
        <p className="header__user-email">{email}</p>
        <Routes>
          <Route path="/sign-in" element={
            <Link to="/sign-up" className="header__link">Регистрация</Link>
          } />
          <Route path="/sign-up" element={
            <Link to="/sign-in" className="header__link">Войти</Link>
          } />
          <Route path="/" element={
            <Link
              to="/sign-in"
              className={`header__link ${loggedIn && 'header__link_logout'}`}
              onClick={clickButtonHandler}
            >
              Выйти
            </Link>
          } />
        </Routes>
      </nav>
    </header>
  );
}

export default Header;
