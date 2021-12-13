import React from 'react';
import { Link } from 'react-router-dom';
import {
  formClassList as formClasses,
  routePaths
} from "../utils/constants";

const CredentialSection = (props) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const formClassName = `${formClasses.formClass} ${formClasses.credentialFormClass}`;
  const formName = `${props.name}-form`;
  const linkPath = props.name === 'login' ? routePaths.signup : routePaths.signin;
  const sectionTitle = props.name === 'login' ? 'Log in' : 'Sign up';
  const loginLinkText = 'Not a member yet? Sign up here!';
  const signupLinkText = 'Already a member? Log in here!';
  const linkText = props.name === 'login' ? loginLinkText : signupLinkText;
  const emailInputId = `${props.name}-email-input`;
  const passwordInputId = `${props.name}-password-input`;

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    // const emailValue = emailRef.current.value;
    // const passwordValue = passwordRef.current.value;

    if (typeof props.onSubmit === 'function') {
      props.onSubmit({email, password});
    }
  }

  return (
    <section className="credential-section">
      <h2 className="credential-section__title">{sectionTitle}</h2>
      <form className={formClassName} id={formName} action="#" onSubmit={handleSubmit}>
        <label className="form__field form__field_type_credentials">
          <input type="email" id={emailInputId} name="email" placeholder="Email"
            required className="form__input form__input_place_credentials" value={email}
            onChange={handleEmailChange} />
        </label>
        <label className="form__field form__field_type_credentials">
          <input type="password" id={passwordInputId} name="password" placeholder="Password"
            required minLength="4" className="form__input form__input_place_credentials" value={password}
            onChange={handlePasswordChange} />
        </label>
        <button type="submit" className="form__submit-btn form__submit-btn_type_credentials">{sectionTitle}</button>
      </form>
      <Link to={linkPath} className="credential-section__link">{linkText}</Link>
    </section>
  );
};

export default CredentialSection;
