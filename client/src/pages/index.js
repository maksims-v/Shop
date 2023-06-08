import { Box } from '@mui/material';
import MainSlider from 'components/MainSlider';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { mainSliderData, newArrivslsSliderData } from '@/state/slidersSlice';
import Link from 'next/link';
import NewArrivalsSlider from 'components/NewArrivalsSlider';

const Home = () => {
  const dispatch = useDispatch();

  async function getItems() {
    const getMainSliderData = await fetch('http://localhost:1337/api/sliders?populate=*', {
      method: 'GET',
    });

    const newArrivalsData = await fetch('http://localhost:1337/api/products?populate=*', {
      method: 'GET',
    });

    const mainSliderDataJson = await getMainSliderData.json();
    const newArrivalsDataJson = await newArrivalsData.json();

    dispatch(mainSliderData(mainSliderDataJson?.data));
    dispatch(newArrivslsSliderData(newArrivalsDataJson?.data));
  }

  useEffect(() => {
    getItems();
  }, []);

  return (
    <Box mb="300px">
      {/* <MainSlider /> */}

      <Box m="20px 0px 50px 0px" fontWeight="bold" fontSize="20px">
        <Link href="/newArrivals">
          <Box component="span">New Arrivals</Box>{' '}
        </Link>
      </Box>
      <NewArrivalsSlider />
    </Box>
  );
};

export default Home;
