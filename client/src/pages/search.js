import { Box, Container, Typography } from '@mui/material';
import Item from 'components/Item';
import Slider from '@mui/material/Slider';
import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';

const Search = ({ searchData, search }) => {
  const [data, setData] = useState(searchData);
  const [minMaxPriceArr, setMinMaxPriceArr] = useState(
    data?.data?.map((item) => {
      if (item.attributes.sale) {
        return item.attributes.salePrice;
      }
      return item.attributes.price;
    }),
  );

  const [value, setValue] = useState([
    Math.min.apply(null, minMaxPriceArr),
    Math.max.apply(null, minMaxPriceArr),
  ]);
  const [debouncedValue] = useDebounce(value, 500);

  useEffect(() => {
    setData(searchData);
  }, [searchData, data]);

  async function filterSearch(search, value) {
    const res = await fetch(
      `${process.env.API_URL}/api/products/filter?search=${search}&pmin=${value[0]}&pmax=${value[1]}`,
    );
    const products = await res.json();
    setData(products);
  }

  useEffect(() => {
    filterSearch(search, value);
  }, [debouncedValue]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box pl="2px" m="10px 0px" fontSize="24px">
        SEARCH "{search}"
      </Box>
      <Box display="flex">
        <Box flex="1 1 20%">
          <Box>FILTERS</Box>
          <Box width="80%">
            <Typography>PRICE</Typography>
            <Slider
              getAriaLabel={() => 'Temperature range'}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              min={value[0]}
              max={value[1]}
            />
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

export async function getServerSideProps({ query }) {
  const { search } = query;

  const res = await fetch(`${process.env.API_URL}/api/products/filter?search=${search}`);
  const searchData = await res.json();

  return { props: { searchData, search } };
}
