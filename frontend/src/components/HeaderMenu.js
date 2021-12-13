import React from 'react';
import { Link } from 'react-router-dom';
import { menuClasses } from '../utils/constants';

const HeaderMenu = ({linkText, linkPath, userEmail, className, ...props}) => {
  return (
    <div className={className}>
      <div className={menuClasses.containerClass}>
        { userEmail ? <p className="header__user-email">{userEmail}</p> : <div />}
        <Link to={linkPath} className="header__link header__link_place_menu header__link_type_logout">{linkText}</Link>
      </div>
    </div>
  );
};

export default HeaderMenu;
