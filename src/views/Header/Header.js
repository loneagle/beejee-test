import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../utils/context';

const Header = () => {
  const { authTokens, removeToken } = useAuth();

  return (
    <div className="header">
      <Link to="/">Home</Link>
      {(authTokens) ? (
        <Link to="/" onClick={() => removeToken()}>
          Logout
        </Link>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
};

export default Header;
