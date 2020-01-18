import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth0 } from '../react-auth0-spa';

const Header = props => {
  const { logout } = useAuth0();

  return (
    <div className="header">
      <Link to={props.back}>
        <FontAwesomeIcon icon="arrow-left" size="2x" />
      </Link>
      <button onClick={() => logout()}>Log out</button>
      <h1>{props.title}</h1>
    </div>
  );
};

export default Header;
