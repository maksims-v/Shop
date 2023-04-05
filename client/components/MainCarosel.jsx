import { Box, Typography, IconButton, useMediaQuery } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const MainCarousel = () => {
  return (
    <Carousel>
      <div>
        <img src="../assets/1.jpeg" />
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img src="assets/2.jpeg" />
        <p className="legend">Legend 2</p>
      </div>
      <div>
        <img src="assets/3.jpeg" />
        <p className="legend">Legend 3</p>
      </div>
      <div>
        <img src="assets/4.jpeg" />
        <p className="legend">Legend 4</p>
      </div>
      <div>
        <img src="assets/5.jpeg" />
        <p className="legend">Legend 5</p>
      </div>
      <div>
        <img src="assets/6.jpeg" />
        <p className="legend">Legend 6</p>
      </div>
    </Carousel>
  );
};

export default MainCarousel;
