import PriceSlider from 'components/PriceSlider';
import { Box, Container, Typography } from '@mui/material';
import Item from 'components/Item';
import { useState, useEffect, useMemo } from 'react';
import { useDebounce } from 'use-debounce';
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
  const minPrice = useSelector((state) => state.search.minPrice);
  const maxPrice = useSelector((state) => state.search.maxPrice);
  const inputSearchValue = useSelector((state) => state.search.inputSearchValue);
  const changeMinPrice = useSelector((state) => state.search.changeMinPrice);
  const changeMaxPrice = useSelector((state) => state.search.changeMaxPrice);
  const price = useSelector((state) => state.search.price);
  const [inputValue, setInputValue] = useState();

  // console.log(changeMinPrice, changeMaxPrice);

  // setValue([changeMinPrice, changeMaxPrice]);

  useEffect(() => {
    filterSearch(inputSearchValue);
    setInputValue(inputSearchValue);
    console.log('hai');
  }, [price, inputSearchValue]);

  async function filterSearch(search, value) {
    if (inputValue !== inputSearchValue) {
      console.log('1');
      if (minPrice !== maxPrice) {
        console.log('1.2');
        const res = await fetch(
          `${process.env.API_URL}/api/products/filter?search=${search}&pmin=1&pmax=10000`,
        );
        const products = await res.json();
        setData(products);

        dispatch(setMinPrice(products.meta.priceMin));
        dispatch(setMaxPrice(products.meta.priceMax));
        dispatch(setChangeMinPrice(1));
        dispatch(setChangeMaxPrice(10000));
        setInputValue(inputSearchValue);
      }
    } else {
      console.log('2');
      if (minPrice !== maxPrice) {
        console.log('2.1');
        const res = await fetch(
          `${process.env.API_URL}/api/products/filter?search=${search}&pmin=${changeMinPrice}&pmax=${changeMaxPrice}`,
        );
        const products = await res.json();
        setData(products);

        if (inputValue !== inputSearchValue) {
          dispatch(setMinPrice(products.meta.priceMin));
          dispatch(setMaxPrice(products.meta.priceMax));
          setInputValue(inputSearchValue);
        } else {
          setInputValue(inputSearchValue);
        }
      }
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

// export async function getServerSideProps({ query }) {
//   const { search } = query;
//   console.log('hai');
//   const res = await fetch(`${process.env.API_URL}/api/products/filter?search=${search}`);
//   const searchData = await res.json();

//   return { props: { searchData, search } };
// }

// const [minPrice, setMinPrice] = useState(Number(price.meta.priceMin));
// const [maxPrice, setMaxPrice] = useState(Number(price.meta.priceMax));
// const [value, setValue] = useState([Number(price.meta.priceMin), Number(price.meta.priceMax)]);
// const [debouncedValue] = useDebounce(value, 500);

// async function filterSearch(search, value) {
//   const res = await fetch(
//     `${process.env.API_URL}/api/products/filter?search=${search}&pmin=${value[0]}&pmax=${value[1]}`,
//   );
//   const products = await res.json();
// }
