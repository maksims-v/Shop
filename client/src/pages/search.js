import PriceSlider from 'components/PriceSlider';
import BrandFilter from 'components/BrandFilter';
import SaleClearanceFilter from 'components/SaleClearanceFilter';
import CategoryFilter from 'components/CategoryFilter';
import GenderFilter from 'components/GenderFilter';
import SubCategoryFilter from 'components/SubCategoryFilter';
import PaginationComponent from 'components/PaginationComponent';
import SizesFilter from 'components/SizesFilter';
import { Box, Divider } from '@mui/material';
import Item from 'components/Item';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setData,
  setMetaData,
  setNewInputSearchValue,
  clearFilters,
} from '@/state/searchPageSlice';

const Search = () => {
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.search.data);
  const inputSearchValue = useSelector((state) => state.search.inputSearchValue);
  const newInputSearchValue = useSelector((state) => state.search.newInputSearchValue);
  const changePrice = useSelector((state) => state.search.changePrice);
  const brandsChecked = useSelector((state) => state.search.brandsChecked);
  const categoryChecked = useSelector((state) => state.search.categoryChecked);
  const genderChecked = useSelector((state) => state.search.genderChecked);
  const subCategoryChecked = useSelector((state) => state.search.subCategoryChecked);
  const sizesChecked = useSelector((state) => state.search.sizesChecked);
  const discounts = useSelector((state) => state.search.discounts);
  const searchFlag = useSelector((state) => state.search.searchFlag);

  useEffect(() => {
    if (inputSearchValue !== newInputSearchValue) {
      newSearch(inputSearchValue);
    } else {
      searchWithFilters(inputSearchValue);
    }
  }, [searchFlag, changePrice]);

  // }, [searchFlag, currentPage]);

  async function newSearch(search) {
    console.log('1');
    try {
      const res = await fetch(
        `${process.env.API_URL}/api/products?search=${search}&pmin=1&pmax=10000&currentPage=1`,
      );
      const products = await res.json();

      if (products?.data && Object.keys(products.meta).length !== 0) {
        dispatch(setData(products?.data));
        dispatch(setNewInputSearchValue(inputSearchValue));
        dispatch(setMetaData(products.meta));
        setPage(products.meta.pages);
        dispatch(clearFilters());
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function searchWithFilters(search) {
    console.log('2');
    try {
      const res = await fetch(
        `${process.env.API_URL}/api/products?search=${search}&pmin=${changePrice[0]}&pmax=${changePrice[1]}&brands=${brandsChecked}&sale=${discounts}&category=${categoryChecked}&gender=${genderChecked}&subcat=${subCategoryChecked}&currentPage=${currentPage}&size=${sizesChecked}`,
      );
      const products = await res.json();
      dispatch(setData(products?.data));
      setPage(products?.meta?.pages);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box>
      <Box pl="2px" m="10px 0px" fontSize="24px">
        SEARCH "{inputSearchValue}"
      </Box>
      <PaginationComponent page={page} handleChange={handleChange} currentPage={currentPage} />
      <Box display="flex">
        <Box flex="1 1 10%">
          <Box fontSize="18px">FILTERS</Box>
          <Divider sx={{ width: '90%', mb: '10px' }} />
          <GenderFilter />
          <SaleClearanceFilter />
          <CategoryFilter />
          <SubCategoryFilter />
          <BrandFilter />
          <PriceSlider />
          <SizesFilter />
        </Box>
        <Box
          flex="1 1 80%"
          margin="0 auto"
          display="grid"
          justifyContent="space-around"
          columnGap="1.33"
          rowGap="20px"
          gridTemplateColumns="repeat(auto-fill, 250px)">
          {data && data?.map((item) => <Item key={item.id} item={item} />)}
        </Box>
      </Box>
    </Box>
  );
};

export default Search;
