import React, { useState } from 'react';

const ImageOverlay: React.FC<{ imageUrl: string; onClose: () => void }> = ({ imageUrl, onClose }) => {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="overlay-content">
        <img src={imageUrl} alt="overlay" />
      </div>
    </div>
  );
};

export default ImageOverlay;
