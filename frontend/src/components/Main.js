import React from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

import Card from './Card';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-container">
          <div
            className="profile__avatar"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          ></div>
          <button
            className="profile__avatar-button"
            onClick={props.onEditAvatarClick}
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__header">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              aria-label="Edit"
              onClick={props.onEditProfileClick}
            ></button>
          </div>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button
          className="add-button"
          type="button"
          aria-label="Add"
          onClick={props.onAddPlaceClick}
        ></button>
      </section>

      <section className="places">
        {props.cards.map((card) => (
          <Card
            key={card["_id"]}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
