import React from "react"
import { createPortal } from "react-dom";
import styles from './Modal.module.css'

const modalRoot = document.querySelector('#modal-root');

class Modal extends React.Component {
// монтую
    componentDidMount() {
    console.log('Modal componentDidMount');

    window.addEventListener('keydown', this.handleKeyDowm);
   
}
// розмонтую
componentWillUnmount() {
    console.log('Modal componentWillUnmount');
    window.removeEventListener('keydown', this.handleKeyDowm);
}
//  закриття при натискані на Escape
handleKeyDowm = e => {
    if(e.code === 'Escape') {
        console.log('ESK');
        this.props.closeModal();
    }
}

// закриття при кліку на Backdrop
handleBackdropClick = e => {
    console.log("Backdrop");
    if(e.currentTarget === e.target) {
        this.props.closeModal();
    }
}

render() {
    const {imageModal} = this.props
  
    return createPortal(
      <div className={styles.modalBackdrop} onClick={this.handleBackdropClick}>
        <div className={styles.modalContent}>{this.props.children}
          <img src={imageModal} alt="" />
        </div>
      </div>, modalRoot,
    );
}

}

export default Modal


