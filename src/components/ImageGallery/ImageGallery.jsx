import React from 'react';
import styles from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, onSelect }) => (
  <ul className={styles.imageGallery}>
    {images.map(({ largeImageURL, webformatURL, id }) => (
      <ImageGalleryItem
        key={id}
        webformatURL={webformatURL}
        largeImageURL={largeImageURL}
        onSelect={onSelect}
      />
    ))}
  </ul>
);

ImageGallery.propTypes = {
  onSelect: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};

export default ImageGallery;

// const ImageGallery = ({children}) => (
//     <ul className={styles.imageGallery}>{children}</ul>
// )
