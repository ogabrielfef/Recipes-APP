import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { setLocalStore } from '../services/LocalStorege';
import './buttonStart.css';

export default function ButtonStart() {
  const [start, setStart] = useState(false);
  const history = useHistory();
  const { location: { pathname } } = history;
  const handleClick = () => {
    setStart(true);
    setLocalStore('iniciadas', pathname);
  };

  return (
    <div>
      {
        start
          ? <button type="button">
            Continue Recipe
            </button>
          : <button
            className="start"
            type="button"
            data-testid="start-recipe-btn"
            onClick={ () => handleClick() }
          >
            Start Recipe
            </button>
      }
      { start && <Redirect to="/foods/:id/in-progress" />}
    </div>
  );
}
