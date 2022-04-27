import React from 'react';
import PopupWithForm from '../PopupWithForm';

function AddPlacePopup(props) {
  const [values, setValues] = React.useState({name: '', link: ''});

  function handleChange(e) {
    setValues({...values, [e.target.name]: e.target.value});
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlaceSubmit(values).then(() => {
      setValues({name: '', link: ''});
    });
  }

  return (
    <PopupWithForm
      name="add"
      title="New place"
      buttonCaption="Create"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__field">
        <input
          id="place-title-input"
          type="text"
          placeholder="Title"
          name="name"
          required
          className="form__input form__input_type_place-title"
          minLength="1"
          maxLength="30"
          onChange={handleChange}
          value={values.name || ""}
        />
        <span className="form__error place-title-input-error">
          Here be error message.
        </span>
      </label>
      <label className="form__field">
        <input
          id="place-link-input"
          type="url"
          placeholder="Image Link"
          name="link"
          required
          className="form__input form__input_type_place-link"
          onChange={handleChange}
          value={values.link || ""}
        />
        <span className="form__error place-link-input-error">
          Here be error message.
        </span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
