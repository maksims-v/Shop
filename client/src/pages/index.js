import HeadBanner from 'components/HeadBanner';
import { Box, Button } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { mainSliderData, newArrivslsSliderData } from '@/state/slidersSlice';
import NewArrivalsSlider from 'components/NewArrivalsSlider';

const Home = () => {
  const dispatch = useDispatch();

  async function getItems() {
    const getBanner = await fetch('http://localhost:1337/api/head-banners?populate=*', {
      method: 'GET',
    });

    const newArrivalsData = await fetch('http://localhost:1337/api/products?populate=*', {
      method: 'GET',
    });

    const mainSliderDataJson = await getBanner.json();
    const newArrivalsDataJson = await newArrivalsData.json();

    dispatch(mainSliderData(mainSliderDataJson?.data));
    dispatch(newArrivslsSliderData(newArrivalsDataJson?.data));
  }

  async function searchFilterItems() {
    const getFilterItems = await fetch('http://localhost:1337/api/products/hoddie?populate=*');

    // const getFilterItemsJson = await getFilterItems.json();
    // const response = await getFilterItemsJson.json();
  }

  const search = () => {
    searchFilterItems();
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <Box mb="300px">
      <HeadBanner />
      <Button onClick={search}> Жми</Button>
      <NewArrivalsSlider />
    </Box>
  );
};

export default Home;
