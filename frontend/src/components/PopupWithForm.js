import {
  popupClassList as popupClasses,
  formClassList as formClasses
} from '../utils/constants';

function PopupWithForm(props) {
  const sectionClassName = `${popupClasses.popupSectionClass} ${
    popupClasses.popupTypeClassPrefix
  }${props.name} ${props.isOpen ? popupClasses.openedPopupSection : ''}`;

  const formPopupClassName = `${popupClasses.popupModalClass} ${popupClasses.formPopupTypePrefix}${props.name}`;
  const formClassName = `${formClasses.formClass} ${formClasses.formTypeClassPrefix}${props.name}`;
  const formName = `${props.name}-form`;
  const formTitleClassName = `form__title ${props.children ? 'form__title_gap-size_small' : ''}`;

  return (
    <section className={sectionClassName}>
      <div className={popupClasses.popupOverlayClass} onClick={props.onClose} />
      <div className={formPopupClassName}>
        <form id={formName} className={formClassName} action="#" name={formName} autoComplete="off" onSubmit={props.onSubmit}>
          <fieldset className="form__fieldset">
            <h2 className={formTitleClassName}>{props.title}</h2>
            {props.children}
          </fieldset>
          <button type="submit" className="form__submit-btn">{props.buttonCaption}</button>
        </form>
        <button className="close-button" type="button" aria-label="Close" onClick={props.onClose}></button>
      </div>
    </section>
  );
}

export default PopupWithForm;
