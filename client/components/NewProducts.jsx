import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useState, useEffect } from 'react';

const NewProducts = () => {
  const sliderData = useSelector((state) => state.sliders.mainSliderData);

  const [hrefChange, setHrefChange] = useState('/');

  return (
    <Box width="80%" m="0 auto" textAlign="center">
      <Carousel
        infiniteLoop={true}
        autoPlay={false}
        showThumbs={false}
        showIndicators={true}
        showStatus={false}
        interval={5000}
        dynamicHeight={true}>
        {sliderData &&
          sliderData.map((item) => (
            <Link style={{ height: '100px', width: '100%' }} href={hrefChange}>
              <img
                key={item.id}
                src={`http://localhost:1337${item.attributes.image.data.attributes.url}`}
              />
            </Link>
          ))}
      </Carousel>
    </Box>
  );
};

export default NewProducts;
