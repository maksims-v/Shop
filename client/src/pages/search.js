import PriceSlider from 'components/PriceSlider';
import BrandFilter from 'components/BrandFilter';
import SaleClearanceFilter from 'components/SaleClearanceFilter';
import CategoryFilter from 'components/CategoryFilter';
import GenderFilter from 'components/GenderFilter';
import SubCategoryFilter from 'components/SubCategoryFilter';
import PaginationComponent from 'components/PaginationComponent';
import Sizes from 'components/Sizes';
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
  setCategory,
  setGender,
  setSubCategory,
  setSizes,
} from '@/state/searchPageSlice';

const Search = () => {
  const [data, setData] = useState(null);

  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const inputSearchValue = useSelector((state) => state.search.inputSearchValue);
  const changeMinPrice = useSelector((state) => state.search.changeMinPrice);
  const changeMaxPrice = useSelector((state) => state.search.changeMaxPrice);
  const brandsChecked = useSelector((state) => state.search.brandsChecked);
  const categoryChecked = useSelector((state) => state.search.categoryChecked);
  const genderChecked = useSelector((state) => state.search.genderChecked);
  const subCategoryChecked = useSelector((state) => state.search.subCategoryChecked);
  const sizesChecked = useSelector((state) => state.search.sizesChecked);

  const discounts = useSelector((state) => state.search.discounts);

  const [inputValue, setInputValue] = useState();

  useEffect(() => {
    filterSearch(inputSearchValue);
    console.log(data);
  }, [
    inputSearchValue,
    changeMinPrice,
    changeMaxPrice,
    brandsChecked,
    discounts,
    categoryChecked,
    genderChecked,
    subCategoryChecked,
    currentPage,
    sizesChecked,
  ]);

  async function filterSearch(search) {
    if (inputSearchValue !== inputValue) {
      try {
        const res = await fetch(
          `${process.env.API_URL}/api/products?search=${search}&pmin=1&pmax=10000&currentPage=1`,
        );
        const products = await res.json();

        if (products?.data && Object.keys(products.meta).length !== 0) {
          setData(products);
          dispatch(setGender(products.meta.genders));
          dispatch(setCategory(products.meta.category));
          dispatch(setSubCategory(products.meta.subCategory));
          dispatch(setBrands(products.meta.brands));
          dispatch(setSizes(products.meta.sizes));
          dispatch(setMinPrice(products.meta.priceMin));
          dispatch(setMaxPrice(products.meta.priceMax));
          dispatch(setChangeMinPrice(products.meta.priceMin));
          dispatch(setChangeMaxPrice(products.meta.priceMax));
          setInputValue(inputSearchValue);
          setPage(products.meta.pages);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await fetch(
          `${process.env.API_URL}/api/products?search=${search}&pmin=${changeMinPrice}&pmax=${changeMaxPrice}&brands=${brandsChecked}&sale=${discounts}&category=${categoryChecked}&gender=${genderChecked}&subcat=${subCategoryChecked}&currentPage=${currentPage}&size=${sizesChecked}`,
        );
        const products = await res.json();

        setData(products);
        setPage(products?.meta?.pages);
      } catch (error) {
        console.log(error);
      }
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
          <Sizes />
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
