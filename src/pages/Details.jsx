import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ButtonFav from '../components/ButtonFav';
import ButtonShare from '../components/ButtonShare';
import useResultAPIs from '../services/combinerAPIs';
import './details.css';

export default function Details() {
  const [recipieDetails, setRecipieDetails] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const history = useHistory();
  const { location: { pathname } } = history;
  const { getById } = useResultAPIs(pathname.split('/')[1]);

  const getIngredients = (recipe) => {
    const newIngredients = Object.entries(recipe)
      .filter((key) => +(key[0].slice(+('-1'))) && key[1])
      .reduce((acc, current, index, src) => {
        const [, value] = current;
        if (index + 1 > src.length / 2) {
          acc[0].push(value);
        } else {
          acc[1].push(value);
        }
        return acc;
      }, [[], []]);
    return newIngredients;
  };

  useEffect(() => {
    const id = pathname.split('/')[2];
    (async () => {
      const result = await getById(id);
      console.log(result);
      setRecipieDetails(result);
      setIngredients(getIngredients(result));
    })();
  }, [getById, pathname]);

  if (Object.keys(recipieDetails).length === 0) return '';

  return (
    <>
      <div className="card-details">
        <img
          className="image-card"
          src={ recipieDetails.recipethumb }
          alt="Big Mac"
        />
        <div className="card-inner">
          <div className="title-subtitle-card">
            <h1 className="title-card">{ recipieDetails.recipe }</h1>
            <p className="category-card">{ recipieDetails.category }</p>
          </div>
          <div className="icons-card">
            <ButtonShare />
            <ButtonFav { ...recipieDetails } />
          </div>
        </div>

      </div>
      <div className="content-wrapper">
        <div className="container container-ingredient">
          <h2>Ingredients</h2>
          <div className="container-info">
            <ul>
              {ingredients.length > 0 && ingredients[1].map((ingredient, index) => (
                <li
                  key={ index }
                >
                  { `${ingredient} - ${ingredients[0][index]}` }
                </li>))}
            </ul>
          </div>
        </div>
        <div className="container container-instructions">
          <h2>Instructions</h2>
          <div className="container-info">
            <p>
              {recipieDetails.inuctions}
            </p>
          </div>
        </div>
        <div className="container container-video">
          <h2>Video</h2>
          <iframe
            src={ recipieDetails.strYoutube?.replace('watch?v=', 'embed/') }
            title="YouTube video player"
            frameBorder="0"
            allow={ `accelerometer;
              autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture` }
            allowFullScreen
          />
        </div>
      </div>
    </>
  );
}
