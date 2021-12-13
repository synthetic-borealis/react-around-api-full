import React from 'react';
import { routePaths } from '../utils/constants';

const Logout = (props) => {
  React.useEffect(() => {
    if (typeof props.onLogout === 'function') {
      props.onLogout();
    }
    props.history.push(routePaths.signin);
  }, [props]);

  return null;
};

export default Logout;
