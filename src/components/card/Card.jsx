// Card.js
// import React from 'react';
import "./Card.css";
const Card = ({ poster_path, title, rating }) => {
  return (
    <div className="cards-container custom-cards">
      <img
        src={`https://image.tmdb.org/t/p/w200${poster_path}`}
        className="card-img-top"
        alt={title}
      />
      <div className="card-body  py-0 px-2">
        <h5 className="card-title  pt-2 m-0">{title}</h5>
        <p className="card-text pt-2 ">{rating}</p>
      </div>
    </div>
  );
};

export default Card;
