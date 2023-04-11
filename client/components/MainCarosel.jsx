import { Box } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Link from 'next/link';

const MainCarousel = ({ sliderImage }) => {
  return (
    <Box width="30%" m="0 auto" border="1px solid black">
      <Carousel
        infiniteLoop={true}
        autoPlay={false}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}>
        {sliderImage &&
          sliderImage.map((item) => (
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
