import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';

export default function Login({ history }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const SIX = 6;
  const emailForm = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

  const handleCLick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));

    history.push('/foods');
  };

  return (
    <div className="conteinerLogin">
      <form onSubmit={ (event) => event.preventDefault() } className="form-login">
        <label htmlFor="email">
          <input
            placeholder="email"
            type="text"
            name="email"
            data-testid="email-input"
            id="email"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
          />
        </label>
        <label htmlFor="senha">
          <input
            placeholder="senha"
            type="password"
            data-testid="password-input"
            id="senha"
            value={ senha }
            onChange={ (e) => setSenha(e.target.value) }
          />
        </label>
        <button
          type="submit"
          data-testid="login-submit-btn"
          onClick={ () => handleCLick() }
          disabled={ !(senha.length > SIX && email.match(emailForm)) }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};
