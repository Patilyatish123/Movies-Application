import React from "react";
import "./CasdCart.css";

const CastCard = ({ name, character, profilePath }) => {
  const profileUrl = profilePath
    ? `https://image.tmdb.org/t/p/w200${profilePath}`
    : "default-profile.png"; // Use a default image if profilePath is null

  return (
    <div className="text-center pt-3">
      <div className="image-container">
      <img src={profileUrl} alt={name} className=" rounded  w-75 image-hover-effect" />
      </div>
      <div className="card-body">
        <h5 className="card-title text-white  pt-2 ">{name}</h5>
        <p className="card-text text-secondary fs-6">{character}</p>
      </div>
    </div>
  );
};

export default CastCard;
