import { useContext} from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `card__trash-button ${!isOwn && 'card__trash-button_hidden'}`
  );
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `card__like-button ${isLiked && 'card__like-button_liked'}`
  );;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      <img className="card__image" src={card.link} alt="Место" onClick={handleClick}/>
      <div className="card__body">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Поставить лайк"
            onClick={handleLikeClick}
          />
          <p className="card__likes-counter">{card.likes.length}</p>
        </div>
      </div>
      <button
        className={cardDeleteButtonClassName}
        type="button"
        aria-label="Удалить карточку"
        onClick={handleDeleteClick}
      />
    </li>
  );
}

export default Card;
