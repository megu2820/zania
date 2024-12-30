import React, { useState } from "react";

interface CardProps {
  type: string;
  title: string;
  index: number;
  openOverlay: (type: string) => void; 
}

const Card: React.FC<CardProps> = ({ type, title, index, openOverlay }) => {
  const [loading, setLoading] = useState(true);
  const thumbnailSrc = `/thumbnails/${type}.jpg`;

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageClick = () => {
    openOverlay(type); 
  };
  
  return (
        <div
          className="card"
        >
          {loading && (
            <div className="spinner">
              <div className="spinner-circle"></div>
              <div className="spinner-text">Loading...</div>
            </div>
          )}
          <img
            src={thumbnailSrc}
            onClick={handleImageClick} 
            className={`thumbnail ${loading ? "hidden" : ""}`}
            onLoad={handleImageLoad}
          />
          <h3>{title}</h3>
        </div>
  );
};

export default Card;

