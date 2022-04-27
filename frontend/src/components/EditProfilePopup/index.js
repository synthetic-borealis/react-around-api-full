import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import PopupWithForm from '../PopupWithForm';

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUserUpdate({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm name="edit" title="Edit profile" buttonCaption="Save"
      isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <label className="form__field">
        <input id="profile-name-input" type="text" placeholder="Name" name="name" required className="form__input"
          minLength="2" maxLength="40" onChange={handleNameChange} value={name || ''} />
        <span className="form__error profile-name-input-error">Here be error message.</span>
      </label>
      <label className="form__field">
        <input id="profile-job-input" type="text" placeholder="Job" name="about" required className="form__input"
          minLength="2" maxLength="400" onChange={handleDescriptionChange} value={description || ''} />
        <span className="form__error profile-job-input-error">Here be error message.</span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
