import { useContext } from 'react';

import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }} >
          <button className="profile__avatar-button" type="button" aria-label="Редактировать аватар" onClick={onEditAvatar} />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__description">{currentUser.about}</p>
          <button className="profile__edit-button" type="button" aria-label="Редактировать профиль" onClick={onEditProfile} />
        </div>
        <button className="profile__add-button" type="button" aria-label="Добавить новое место" onClick={onAddPlace} />
      </section>
      <section className="cards">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
