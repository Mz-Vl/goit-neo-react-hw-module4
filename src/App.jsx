import { useState, useEffect } from 'react'
import './App.css'
import toast, { Toaster } from 'react-hot-toast';
import fetchImages from './api';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageModal from './components/ImageModal/ImageModal';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import Loader from './components/Loader/Loader';

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!query) return;

    const loadImages = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchImages(query, page);
        setImages((prevImages) => [...prevImages, ...data.results]);
        if (data.results.length === 0) {
          toast.error('No images found for your query. Try a different search term.');
        }
      } catch (error) {
        setError('Failed to load images. Please try again.');
        toast.error('Failed to load images. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, [query, page]);

  const handleSubmit = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    toast.success(`Searching for ${newQuery}`);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  return (
    <div className="App">
      <SearchBar onSubmit={handleSubmit} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {showModal && (
        <ImageModal
          isOpen={showModal}
          onRequestClose={closeModal}
          image={selectedImage}
          onClose={closeModal} />
      )}
      <Toaster position="top-right" className="toaster" />
    </div>
  );
}

export default App;
