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
import { newInputSearch, filtersSearch } from '@/state/searchPageSlice';

const Search = () => {
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const data = useSelector((state) => state.search.data);
  const status = useSelector((state) => state.search.status);
  const inputSearchValue = useSelector((state) => state.search.inputSearchValue);
  const changePrice = useSelector((state) => state.search.changePrice);
  const brandsChecked = useSelector((state) => state.search.brandsChecked);
  const categoryChecked = useSelector((state) => state.search.categoryChecked);
  const genderChecked = useSelector((state) => state.search.genderChecked);
  const subCategoryChecked = useSelector((state) => state.search.subCategoryChecked);
  const sizesChecked = useSelector((state) => state.search.sizesChecked);
  const discounts = useSelector((state) => state.search.discounts);
  const [currentSearchValue, setCurrentSearchValue] = useState(null);

  useEffect(() => {
    if (inputSearchValue !== currentSearchValue) {
      dispatch(newInputSearch());
      setCurrentSearchValue(inputSearchValue);
    } else {
      dispatch(filtersSearch());
    }
  }, [
    inputSearchValue,
    genderChecked,
    discounts,
    categoryChecked,
    subCategoryChecked,
    brandsChecked,
    changePrice,
  ]);

  const changePage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box>
      <Box pl="2px" m="10px 0px" fontSize="24px">
        SEARCH "{inputSearchValue}"
      </Box>
      <PaginationComponent page={page} changePage={changePage} currentPage={currentPage} />
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
