import React from 'react';

// Contexts
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const cardImage = `url(${props.card.link})`;
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardDeleteButtonClass = `card__delete-button ${isOwn ? '' : 'card__delete-button_hidden'}`;
  const cardLikeButtonClass = `card__like-button ${isLiked ? 'card__like-button_active' : ''}`;
  const likes = props.card.likes.length;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="card">
      <button className="card__image" aria-label={props.card.name} style={{backgroundImage: cardImage}} onClick={handleClick}/>
      <div className="card__container">
        <h2 className="card__caption">{props.card.name}</h2>
        <div className="card__like-container">
          <button className={cardLikeButtonClass} onClick={handleLikeClick} type="button" aria-label="Like"></button>
          <p className="card__like-counter">{likes}</p>
        </div>
      </div>
      <button className={cardDeleteButtonClass} onClick={handleDeleteClick} type="button" aria-label="Delete"></button>
    </article>
  );
}

export default Card;
