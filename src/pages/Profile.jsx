import React from 'react';
// import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';

export default function Profile() {
  const history = useHistory();
  return (
    <>
      <Header pageTitle="Profile" />
      <h1>Profile</h1>
      <h3 data-testid="profile-email">Email</h3>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button type="button" data-testid="profile-logout-btn">Logout</button>
    </>
  );
}

// Profile.propTypes = {
//   history: PropTypes.shape({
//     push: PropTypes.func,
//   }).isRequired,
// };
