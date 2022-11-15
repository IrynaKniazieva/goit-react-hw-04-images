import React from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ closeModal, children, imageModal }) {
  useEffect(() => {
    const handleKeyDowm = e => {
      if (e.code === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDowm);
    return () => {
      window.removeEventListener('keydown', handleKeyDowm);
    };
  }, [closeModal]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return createPortal(
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        {children}
        <img src={imageModal} alt="" />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node,
  imageModal: PropTypes.string.isRequired,
};





// class Modal extends React.Component {
// // монтую
//     componentDidMount() {

//     window.addEventListener('keydown', this.handleKeyDowm);

// }
// // розмонтую
// componentWillUnmount() {
//     console.log('Modal componentWillUnmount');
//     window.removeEventListener('keydown', this.handleKeyDowm);
// }
// //  закриття при натискані на Escape
// handleKeyDowm = e => {
//     if(e.code === 'Escape') {
//         console.log('ESK');
//         this.props.closeModal();
//     }
// }

// // закриття при кліку на Backdrop
// handleBackdropClick = e => {
//     console.log("Backdrop");
//     if(e.currentTarget === e.target) {
//         this.props.closeModal();
//     }
// }

// render() {
//     const {imageModal} = this.props

//     return createPortal(
//       <div className={styles.modalBackdrop} onClick={this.handleBackdropClick}>
//         <div className={styles.modalContent}>{this.props.children}
//           <img src={imageModal} alt="" />
//         </div>
//       </div>, modalRoot,
//     );
// }

// }

// export default Modal
