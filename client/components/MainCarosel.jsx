import { Box, Typography, IconButton, useMediaQuery } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const MainCarousel = () => {
  const sliderData = useSelector((state) => state.slider.items);

  console.log(sliderData);

  return (
    <Box width="30%" m="0 auto">
      <Carousel
        infiniteLoop={true}
        autoPlay={true}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}>
        {sliderData.map((item) => (
          <div key={item.id}>
            <img src={`http://localhost:1337${item.attributes.image.data.attributes.url}`} />
            <Link href="./registration">
              <p className="legend">Go in</p>
            </Link>
          </div>
        ))}
      </Carousel>
    </Box>
  );
};

export default MainCarousel;
