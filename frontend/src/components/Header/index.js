import React from 'react';
import { Link } from 'react-router-dom';
import HeaderMenu from '../HeaderMenu';
import { menuClasses, menuTransitionDuration, maxTabletWidth } from '../../utils/constants';
import logoImage from '../../images/logo.svg';

function Header(props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [menuClass, setMenuClass] = React.useState(`${menuClasses.menuClass}`);
  const menuButtonClass = `${menuClasses.menuButtonClass} ${isMenuOpen ? menuClasses.activeMenuButtonClass : ''}`;
  const linkClass = `header__link ${props.currentScreen === 'main' ? 'header__link_type_logout' : ''}`;

  function handleWindowResize() {
    if (window.innerWidth > maxTabletWidth) {
      setIsMenuOpen(false);
    }
  }

  // componentDidMount/componentWillUnmount
  React.useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  function handleMenuButtonClick() {
    if (isMenuOpen) {
      setMenuClass(`${menuClasses.menuClass}`);
      setTimeout(() => {
        setIsMenuOpen(false);
      }, menuTransitionDuration);
    } else {
      setIsMenuOpen(true);
      setImmediate(() => {
        setMenuClass(`${menuClasses.menuClass} ${menuClasses.openMenuClass}`);
      });
    }
  }

  function mainHeaderLinkOrButton () {
    if (props.currentScreen === 'main') {
      return (
        <>
          <div className="header__link-container">
            {props.userEmail ? (
              <p className="header__user-email">{props.userEmail}</p>
            ) : (
              <div />
            )}
            <Link to={props.linkPath} className={linkClass}>
              {props.linkText}
            </Link>
          </div>
          <button className={menuButtonClass} onClick={handleMenuButtonClick} />
        </>
      );
    } else {
      return (
        <>
          <Link to={props.linkPath} className={linkClass}>
            {props.linkText}
          </Link>
        </>
      );
    }
  }

  return (
    <header className="header">
      {isMenuOpen ? (
        <HeaderMenu
          linkText={props.linkText}
          linkPath={props.linkPath}
          userEmail={props.userEmail}
          className={menuClass}
        />
      ) : (
        <div />
      )}

      <div className="header__container">
        <img className="logo" src={logoImage} alt="Around the U.S." />
        {mainHeaderLinkOrButton()}
      </div>
    </header>
  );
}

export default Header;
