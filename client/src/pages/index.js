import Carousel from 'components/MainCarosel';
import { useEffect } from 'react';
import { getSliderData } from '@/http/itemAPI';
import { useDispatch } from 'react-redux';
import { sliderData } from '@/state/sliderSlice';

const Home = () => {
  const dispatch = useDispatch();

  async function getItems() {
    const items = await fetch('http://localhost:1337/api/sliders?populate=*', {
      method: 'GET',
    });
    const itemsJson = await items.json();
    dispatch(sliderData(itemsJson?.data));
  }

  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      <Carousel />
    </>
  );
};

export default Home;
