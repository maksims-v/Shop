import PriceSlider from 'components/PriceSlider';
import BrandFilter from 'components/BrandFilter';
import SaleClearanceFilter from 'components/SaleClearanceFilter';
import CategoryFilter from 'components/CategoryFilter';
import GenderFilter from 'components/GenderFilter';
import SubCategoryFilter from 'components/SubCategoryFilter';
import PaginationComponent from 'components/PaginationComponent';
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
} from '@/state/searchPageSlice';

const Search = () => {
  const [data, setData] = useState([]);

  const [startpage, setStartpage] = useState(0);
  const [limitpage, setLimitpage] = useState(16);
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

  const discounts = useSelector((state) => state.search.discounts);

  const [inputValue, setInputValue] = useState();

  useEffect(() => {
    filterSearch(inputSearchValue);
    console.log(currentPage);
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
  ]);

  async function filterSearch(search) {
    if (inputSearchValue !== inputValue) {
      const res = await fetch(
        `${process.env.API_URL}/api/products?search=${search}&pmin=1&pmax=10000&pagination[startpage]=${startpage}&pagination[limitpage]=${limitpage}&currentPage=1`,
      );
      const products = await res.json();

      console.log(products);

      setData(products);

      const brands = products ? getBrandsArr(products) : [];
      const category = getCategoryArr(products);
      const gender = getGenderArr(products);
      const suCategory = getSubCategoryArr(products);

      dispatch(setBrands(brands));
      category ? dispatch(setCategory(category)) : dispatch(setCategory([]));
      gender ? dispatch(setGender(gender)) : dispatch(setGender([]));
      suCategory ? dispatch(setSubCategory(suCategory)) : dispatch(setSubCategory([]));

      dispatch(setMinPrice(products.meta.priceMin));
      dispatch(setMaxPrice(products.meta.priceMax));
      dispatch(setChangeMinPrice(products.meta.priceMin));
      dispatch(setChangeMaxPrice(products.meta.priceMax));

      setInputValue(inputSearchValue);
      setPage(products?.meta?.pages);
    } else {
      const res = await fetch(
        `${process.env.API_URL}/api/products?search=${search}&pmin=${changeMinPrice}&pmax=${changeMaxPrice}&brands=${brandsChecked}&sale=${discounts}&category=${categoryChecked}&gender=${genderChecked}&subcat=${subCategoryChecked}&currentPage=${currentPage}`,
      );
      const products = await res.json();
      console.log(products);
      setData(products);
      setPage(products?.meta?.pages);
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

function getBrandsArr(arr) {
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

function getCategoryArr(arr) {
  const getAllCategoryArr = arr.data.map((item) => {
    return item.attributes.category;
  });
  const filterGetCategoryArr = getAllCategoryArr
    .filter((item) => {
      if (item !== null) {
        return item;
      }
    })
    .map((item) => {
      return item.toLowerCase();
    });

  const category = filterGetCategoryArr.filter(
    (item, id) => filterGetCategoryArr.indexOf(item) === id,
  );

  return category;
}

function getGenderArr(arr) {
  const getAllGenderArr = arr.data.map((item) => {
    return item.attributes.gender;
  });
  const filterGetGenderArr = getAllGenderArr
    .filter((item) => {
      if (item !== null) {
        return item;
      }
    })
    .map((item) => {
      return item.toLowerCase();
    });

  const gender = filterGetGenderArr.filter((item, id) => filterGetGenderArr.indexOf(item) === id);

  return gender;
}

function getSubCategoryArr(arr) {
  const getAllSubCategoryArr = arr.data.map((item) => {
    return item.attributes.subcategory;
  });
  const filterGetSebCategoryArr = getAllSubCategoryArr
    .filter((item) => {
      if (item !== null) {
        return item;
      }
    })
    .map((item) => {
      return item.toLowerCase();
    });

  const subCategory = filterGetSebCategoryArr.filter(
    (item, id) => filterGetSebCategoryArr.indexOf(item) === id,
  );

  return subCategory;
}
