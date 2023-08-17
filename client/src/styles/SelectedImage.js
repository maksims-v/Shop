import React from 'react';

const SelectedImage = ({ index, photo, handleOnClick }) => {
  return (
    <img
      style={{ width: '70px', height: '70px' }}
      alt={photo.title}
      {...photo}
      onClick={() => handleOnClick(index)}
    />
  );
};

export default SelectedImage;
