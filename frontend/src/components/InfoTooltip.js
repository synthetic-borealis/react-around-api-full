import {
  popupClassList as popupClasses,
  tooltipClasses,
  tooltipContainerSelector
} from "../utils/constants";

const InfoTooltip = (props) => {
  const sectionOpenClass = `${props.isOpen ? popupClasses.openedPopupSection : ''}`;
  const sectionClassName = `${popupClasses.popupSectionClass} ${tooltipContainerSelector} ${sectionOpenClass}`;
  const iconTypeClass = props.tooltip.isSuccessful ? tooltipClasses.successIconClass : tooltipClasses.errorIconClass;
  const iconClassName = `${tooltipClasses.iconClass} ${iconTypeClass}`;

  return (
    <section className={sectionClassName}>
      <div className={popupClasses.popupOverlayClass} onClick={props.onClose} />
      <div className={popupClasses.popupModalClass}>
        <div className={tooltipClasses.containerClass}>
          <div className={iconClassName} />
          <h2 className="tooltip__text">{props.tooltip.message}</h2>
        </div>
        <button className="close-button close-button_type_tooltip" type="button" onClick={props.onClose} />
      </div>
    </section>
  );
};

export default InfoTooltip;
