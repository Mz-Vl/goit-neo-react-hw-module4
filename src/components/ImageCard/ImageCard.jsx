const ImageCard = ({ image, onClick }) => {
    return (
        <div onClick={onClick}>
            <img src={image.urls.small} alt={image.description} />
        </div>
    );
};

export default ImageCard;
