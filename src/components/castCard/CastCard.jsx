import React from "react";
import "./CasdCart.css";

const CastCard = ({ name, character, profilePath }) => {
  const profileUrl = profilePath
    ? `https://image.tmdb.org/t/p/w200${profilePath}`
    : "default-profile.png"; // Use a default image if profilePath is null

  return (
    <div className="text-center">
      <img src={profileUrl} alt={name} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{character}</p>
      </div>
    </div>
  );
};

export default CastCard;
