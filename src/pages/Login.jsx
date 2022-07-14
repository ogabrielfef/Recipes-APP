import React, { useContext, useState } from 'react';
import foodContext from '../context/FoodContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const context = useContext(foodContext);
  const SIX = 6;
  const emailForm = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

  console.log(context);

  const handleCLick = () => {
    localStorage.setItem('user', email);
  };

  return (
    <div className="conteinerLogin">
      <form onSubmit={ (event) => event.preventDefault() }>
        <label htmlFor="email">
          <input
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
