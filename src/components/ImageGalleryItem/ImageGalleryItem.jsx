import React from 'react';
import styles from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ largeImageURL, webformatURL, onSelect }) => (
  <li
  
    className={styles.imageGalleryItem}
    onClick={() => onSelect(largeImageURL)}
  >
    <img className={styles.imageGalleryItemImage} src={webformatURL} alt="" />
  </li>
);

ImageGalleryItem.propTypes = {

  largeImageURL: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ImageGalleryItem;



// const ImageGalleryItem = ({images, onSelect}) => (
//     <>
//         {images.map(({ largeImageURL, webformatURL, id}) => (
//             <li key={id} className={styles.imageGalleryItem} onClick={() => onSelect(largeImageURL)}>

//                 <img className={styles.imageGalleryItemImage}
//                 src={webformatURL}
//                 alt=""/>

//             </li>
//         ))}
//     </>
// )
