import { Link, useLocation, useNavigate } from "react-router-dom";


function Header({loggedIn, email, onHandleLogout}) {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  let linkName = 'Выйти';
  if (!loggedIn) {
    linkName = pathname === '/sign-up' ? 'Войти' : 'Регистрация';
  }

  function clickButtonHandler(buttonName) {
    if (buttonName === 'Выйти') {
      localStorage.removeItem('jwt');
      onHandleLogout();
    }
    else if (buttonName === 'Регистрация')
      navigate('sign-up');
    else
      navigate('sign-in');
  }

  return (
    <header className="header">
      <Link to="/" className="header__logo" />
      <nav className="header__nav">
        <p className="header__user-email">{email}</p>
        <button
          className={`header__button ${loggedIn ? 'header__button_logout' : ''}`}
          onClick={() => clickButtonHandler(linkName)}
        >
          {linkName}
        </button>
      </nav>
    </header>
  );
}

export default Header;
