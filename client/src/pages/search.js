import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Item from 'components/Item';

const Search = () => {
  const [searchData, setSearchData] = useState([]);

  const productSearch = useSelector((state) => state.search.searchProduct);

  useEffect(() => {
    search();
  }, [productSearch]);

  async function search() {
    const getFilterItems = await fetch(
      `http://localhost:1337/api/products/filter?search=${productSearch}`,
    );

    const response = await getFilterItems.json();
    setSearchData(response.data);
  }

  return (
    <Box
      margin="0 auto"
      display="grid"
      justifyContent="space-around"
      columnGap="1.33"
      rowGap="20px"
      gridTemplateColumns="repeat(auto-fill, 300px)">
      {' '}
      {searchData && searchData.map((item) => <Item key={item.id} item={item} />)}{' '}
    </Box>
  );
};

export default Search;
