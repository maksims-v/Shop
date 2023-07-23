import PriceSlider from 'components/PriceSlider';
import BrandFilter from 'components/BrandFilter';
import { Box, Typography, TextField, Divider } from '@mui/material';
import Item from 'components/Item';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setMinPrice,
  setMaxPrice,
  setChangeMinPrice,
  setChangeMaxPrice,
  setBrands,
} from '@/state/searchPageSlice';

const Search = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const inputSearchValue = useSelector((state) => state.search.inputSearchValue);
  const changeMinPrice = useSelector((state) => state.search.changeMinPrice);
  const changeMaxPrice = useSelector((state) => state.search.changeMaxPrice);
  const brandsChecked = useSelector((state) => state.search.brandsChecked);

  const [inputValue, setInputValue] = useState();

  // const brandsFilter = Object.entries(brandsChecked);

  // const getBrandsFilter = brandsFilter
  //   .filter((item, index) => {
  //     if (item[1]) return item;
  //   })
  //   .map((item) => {
  //     if (item[1]) return item[0];
  //   });

  useEffect(() => {
    filterSearch(inputSearchValue);
  }, [inputSearchValue, changeMinPrice, changeMaxPrice, brandsChecked]);

  async function filterSearch(search) {
    if (inputSearchValue !== inputValue) {
      const res = await fetch(
        `${process.env.API_URL}/api/products/filter?search=${search}&pmin=1&pmax=10000`,
      );
      const products = await res.json();

      setData(products);

      const brands = getBrands(products);
      brands ? dispatch(setBrands(brands)) : dispatch(setBrands([]));

      dispatch(setMinPrice(products.meta.priceMin));
      dispatch(setMaxPrice(products.meta.priceMax));
      dispatch(setChangeMinPrice(products.meta.priceMin));
      dispatch(setChangeMaxPrice(products.meta.priceMax));
      setInputValue(inputSearchValue);
    } else {
      const res = await fetch(
        `${process.env.API_URL}/api/products/filter?search=${search}&pmin=${changeMinPrice}&pmax=${changeMaxPrice}&brands=${brandsChecked}`,
      );
      const products = await res.json();

      // const brands = getBrands(products);
      // brands ? dispatch(setBrands(brands)) : dispatch(setBrands([]));

      setData(products);
    }
  }

  return (
    <Box>
      <Box pl="2px" m="10px 0px" fontSize="24px">
        SEARCH "{inputSearchValue}"
      </Box>
      <Box display="flex">
        <Box flex="1 1 10%">
          <Box fontSize="18px">FILTERS</Box>
          <Divider sx={{ width: '90%', mb: '10px' }} />
          <PriceSlider />
          <BrandFilter />
        </Box>

        <Box
          flex="1 1 80%"
          margin="0 auto"
          display="grid"
          justifyContent="space-around"
          columnGap="1.33"
          rowGap="20px"
          gridTemplateColumns="repeat(auto-fill, 250px)">
          {data && data?.data?.map((item) => <Item key={item.id} item={item} />)}
        </Box>
      </Box>
    </Box>
  );
};

export default Search;

function getBrands(arr) {
  const getAllBrandsArr = arr.data.map((item) => {
    return item.attributes.brand;
  });
  const filterGetBrandsArr = getAllBrandsArr
    .filter((item) => {
      if (item !== null) {
        return item;
      }
    })
    .map((item) => {
      return item.toLowerCase();
    });

  const brands = filterGetBrandsArr.filter((item, id) => filterGetBrandsArr.indexOf(item) === id);

  return brands;
}
