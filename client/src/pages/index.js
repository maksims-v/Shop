import HeadBanner from 'components/HeadBanner';
import { Box } from '@mui/material';
import NewArrivalsSlider from 'components/NewArrivalsSlider';

const Home = () => {
  return (
    <Box mb="300px">
      <HeadBanner />
      <NewArrivalsSlider />
    </Box>
  );
};

export default Home;
