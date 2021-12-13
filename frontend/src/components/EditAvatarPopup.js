import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = React.createRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({avatar: avatarRef.current.value});
  }

  return (
    <PopupWithForm name="change-avatar" title="Change profile picture" buttonCaption="Save"
          isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <label className="form__field">
        <input id="profile-avatar-input" type="url" placeholder="Image Link" name="avatar" required
          className="form__input form__input_type_avatar-link" ref={avatarRef} />
        <span className="form__error profile-avatar-input-error">Here be error message.</span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
