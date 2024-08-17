import Modal from 'react-modal';
import styles from './ImageModal.module.css';

Modal.setAppElement('#root');

const ImageModal = ({ isOpen, image, onClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Image Modal"
            className={styles.modal}
            overlayClassName={styles.overlay}
        >
            {image && (
                <img src={image.urls.regular}
                    alt={image.alt_description}
                />
            )}
        </Modal>
    );
};

export default ImageModal;
