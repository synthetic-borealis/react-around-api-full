// Form Classes
const formClassList = {
  formSelector: '.form',
  formClass: 'form',
  credentialFormClass: 'form_type_credential',
  formTypeClassPrefix: 'form_type_',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-btn',
  fieldsetSelector: '.form__fieldset',
  errorSelector: '.form__error',
  inactiveButtonClass: 'form__submit-btn_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
};

// Popup Classes
const popupClassList = {
  openedPopupSection: 'popup-section_opened',
  closeButton: 'close-button',
  imageSelector: '.image-popup__image',
  imageCaptionSelector: '.image-popup__caption',
  popupSectionClass: 'popup-section',
  popupTypeClassPrefix: 'popup-section_type_',
  popupModalClass: 'popup-modal',
  formPopupTypePrefix: 'form-popup_type_',
  popupOverlayClass: 'popup-section__overlay',
};

// Card Classes
const cardClassList = {
  cardSelector: '.card',
  imageSelector: '.card__image',
  captionSelector: '.card__caption',
  likeButtonSelector: '.card__like-button',
  activeLikeButtonClass: 'card__like-button_active',
  likeCounterSelector: '.card__like-counter',
  deleteButtonSelector: '.card__delete-button'
};

// Header Menu Classes
const menuClasses = {
  menuClass: 'header__menu',
  openMenuClass: 'header__menu_active',
  containerClass: 'header__menu-container',
  menuButtonClass: 'header__menu-button',
  activeMenuButtonClass: 'header__menu-button_active',
};

// Info Tooltip Classes & Messages
const tooltipClasses = {
  containerClass: 'tooltip',
  iconClass: 'tooltip__icon',
  successIconClass: 'tooltip__icon_type_success',
  errorIconClass: 'tooltip__icon_type_error',
};

const tooltipMessages = {
  success: 'Success! You have now been registered.',
  error: 'Oops, something went wrong! Please try again.',
  badLogin: 'Wrong password or e-mail!',
};

// Route Paths
const routePaths = {
  root: '/',
  signup: '/signup',
  signin: '/signin',
  logout: '/logout',
  userInfo: '/users/me',
  userAvatar: '/users/me/avatar',
  cards: '/cards',
};

// API Options
const baseUrl = 'https://api.synthetic-borealis.students.nomoreparties.site';
const baseHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

// Container Selectors
const confirmContainerSelector = '.popup-section_type_confirm';
const placesContainerSelector = '.places';
const editContainerSelector = '.popup-section_type_edit';
const addContainerSelector = '.popup-section_type_add';
const changeAvatarContainerSelector = '.popup-section_type_change-avatar';
const imagePopupContainerSelector = '.popup-section_type_image';
const tooltipContainerSelector = '.popup-section_type_tooltip';

// Labels, headings, etc.
const profileNameSelector = '.profile__name';
const profileJobSelector = '.profile__job';
const profileAvatarSelector = '.profile__avatar';

// Template Selectors
const cardTemplateSelector = '#card-template';

// Misc. Values
const popupTransitionDuration = 500;
const menuTransitionDuration = 200;
const maxTabletWidth = 767;

export {
  formClassList,
  popupClassList,
  cardClassList,
  menuClasses,
  tooltipClasses,
  tooltipMessages,
  routePaths,
  baseUrl,
  baseHeaders,
  confirmContainerSelector,
  placesContainerSelector,
  editContainerSelector,
  addContainerSelector,
  changeAvatarContainerSelector,
  imagePopupContainerSelector,
  tooltipContainerSelector,
  profileNameSelector,
  profileJobSelector,
  profileAvatarSelector,
  cardTemplateSelector,
  popupTransitionDuration,
  menuTransitionDuration,
  maxTabletWidth
};
