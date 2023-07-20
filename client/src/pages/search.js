import PriceSlider from 'components/PriceSlider';
import { Box, Container, Typography } from '@mui/material';
import Item from 'components/Item';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setMinPrice,
  setMaxPrice,
  setChangeMinPrice,
  setChangeMaxPrice,
} from '@/state/searchPageSlice';

const Search = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const inputSearchValue = useSelector((state) => state.search.inputSearchValue);
  const changeMinPrice = useSelector((state) => state.search.changeMinPrice);
  const changeMaxPrice = useSelector((state) => state.search.changeMaxPrice);
  const [inputValue, setInputValue] = useState();

  useEffect(() => {
    filterSearch(inputSearchValue);
  }, [inputSearchValue, changeMinPrice, changeMaxPrice]);

  async function filterSearch(search) {
    if (inputSearchValue !== inputValue) {
      const res = await fetch(
        `${process.env.API_URL}/api/products/filter?search=${search}&pmin=1&pmax=10000`,
      );
      const products = await res.json();
      setData(products);
      dispatch(setMinPrice(products.meta.priceMin));
      dispatch(setMaxPrice(products.meta.priceMax));
      dispatch(setChangeMinPrice(products.meta.priceMin));
      dispatch(setChangeMaxPrice(products.meta.priceMax));
      setInputValue(inputSearchValue);
    } else {
      const res = await fetch(
        `${process.env.API_URL}/api/products/filter?search=${search}&pmin=${changeMinPrice}&pmax=${changeMaxPrice}`,
      );
      const products = await res.json();

      setData(products);
    }
  }

  return (
    <Box>
      <Box pl="2px" m="10px 0px" fontSize="24px">
        SEARCH "{inputSearchValue}"
      </Box>
      <Box display="flex">
        <Box flex="1 1 20%">
          <Box>FILTERS</Box>
          <Box width="80%">
            <Typography>PRICE</Typography>
            <PriceSlider />
          </Box>
        </Box>
        <Box
          flex="1 1 80%"
          margin="0 auto"
          display="grid"
          justifyContent="space-around"
          columnGap="1.33"
          rowGap="20px"
          gridTemplateColumns="repeat(auto-fill, 300px)">
          {data && data?.data?.map((item) => <Item key={item.id} item={item} />)}
        </Box>
      </Box>
    </Box>
  );
};

export default Search;
