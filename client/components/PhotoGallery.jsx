import Gallery from 'react-photo-gallery-next';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { useState, useCallback } from 'react';
import { Box } from '@mui/material';
const photos = [
  {
    src: 'https://source.unsplash.com/2ShvY8Lf6l0/800x599',
    width: 1,
    height: 1,
  },
  {
    src: 'https://source.unsplash.com/Dm-qxdynoEc/800x799',
    width: 1,
    height: 1,
  },
  {
    src: 'https://source.unsplash.com/qDkso9nvCg0/600x799',
    width: 1,
    height: 1,
  },
  {
    src: 'https://source.unsplash.com/iecJiKe_RNg/600x799',
    width: 1,
    height: 1,
  },
];

const PhotoGallery = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  return (
    <Box>
      <Gallery targetRowHeight={50} photos={photos} onClick={openLightbox} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Box>
              <Carousel
                currentIndex={currentImage}
                views={photos.map((x) => ({
                  ...x,
                  srcset: x.srcSet,
                  caption: x.title,
                }))}
              />
            </Box>
          </Modal>
        ) : null}
      </ModalGateway>
    </Box>
  );
};

export default PhotoGallery;
