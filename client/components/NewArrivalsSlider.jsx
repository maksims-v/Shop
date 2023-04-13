import { Box, IconButton } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import Item from './Item';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useSelector } from 'react-redux';

const NewArrivalsSlider = () => {
  const sliderData = useSelector((state) => state.sliders.newArrivalsData);

  console.log(sliderData);

  return (
    <Box width="100%">
      {' '}
      <Carousel
        infiniteLoop={true}
        autoPlay={false}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        centerMode
        centerSlidePercentage={20}
        renderArrowPrev={(onClickHandler, hasPrev, label) => (
          <IconButton
            onClick={onClickHandler}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '0px',
              color: 'red',
              padding: '5px',
              zIndex: '10',
            }}>
            <NavigateBeforeIcon sx={{ fontSize: 40 }} />
          </IconButton>
        )}
        renderArrowNext={(onClickHandler, hasNext, label) => (
          <IconButton
            onClick={onClickHandler}
            sx={{
              position: 'absolute',
              top: '50%',
              right: '0px',
              color: 'red',
              padding: '5px',
              zIndex: '10',
            }}>
            <NavigateNextIcon sx={{ fontSize: 40 }} />
          </IconButton>
        )}>
        {sliderData && sliderData.map((item) => <Item key={item.id} item={item} />)}
      </Carousel>
    </Box>
  );
};

export default NewArrivalsSlider;
