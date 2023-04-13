import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Link from 'next/link';

const MainSlider = () => {
  const sliderData = useSelector((state) => state.sliders.mainSliderData);

  return (
    <Box width="30%" m="0 auto" border="1px solid black" minHeight="445px">
      <Carousel
        infiniteLoop={true}
        autoPlay={false}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}>
        {sliderData &&
          sliderData.map((item) => (
            <Box key={item.id}>
              <img src={`http://localhost:1337${item.attributes.image.data.attributes.url}`} />
              <Link href="./registration">
                <p className="legend">Go in</p>
              </Link>
            </Box>
          ))}
      </Carousel>
    </Box>
  );
};

export default MainSlider;
