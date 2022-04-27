import {
  popupClassList as popupClasses,
} from '../../utils/constants';

function ImagePopup(props) {
  const className = `${popupClasses.popupSectionClass} ${popupClasses.popupTypeClassPrefix}image ${props.isOpen ? popupClasses.openedPopupSection : ""}`;

  return (
    <section className={className}>
      <div className={popupClasses.popupOverlayClass} onClick={props.onClose} />
      <div className="image-popup">
        <img className="image-popup__image" src={props.card.link} alt={props.card.name} />
        <p className="image-popup__caption">{props.card.name}</p>
        <button className="close-button close-button_type_image-popup" type="button" onClick={props.onClose}></button>
      </div>
    </section>
  );
}

export default ImagePopup;
