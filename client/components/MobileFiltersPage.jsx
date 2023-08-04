import { useState, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Box, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import CustomButton from './ui/CustomButton';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GenderFilter from './filtersComponents/GenderFilter';
import CategoryFilter from './filtersComponents/CategoryFilter';
import SubCategoryFilter from './filtersComponents/SubCategoryFilter';
import SizesFilter from './filtersComponents/SizesFilter';
import BrandFilter from './filtersComponents/BrandFilter';
import ProductList from './ProductList';
import { clearFilters, setSortValue } from '@/state/searchPageSlice';
import PriceSlider from './filtersComponents/PriceSlider';
import FilteringByPriceAndName from './FilteringByPriceAndName';

const disableMarginInAccordion = true;

const MobileFiltersPage = () => {
  const [toggle, setToggle] = useState(false);
  const inputSearchValue = useSelector((state) => state.search.inputSearchValue);
  const total = useSelector((state) => state.search.metaData.total);

  const dispatch = useDispatch();

  const toggleButton = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    dispatch(clearFilters());
  }, [inputSearchValue]);

  const getValue = (e) => {
    dispatch(setSortValue(e.target.value));
  };

  return (
    <>
      <Box sx={{ mt: '17px' }}>
        <Box display="flex" alignContent="center" flexDirection="column">
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 'bold',
              margin: '0 auto 17px auto',
            }}>
            Your search for as produced {total} results
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: '17px' }}>
            <CustomButton toggleButton={toggleButton}>SHOW FILTERS</CustomButton>
            <CustomButton>CLEAR FILTERS</CustomButton>
          </Box>
          <Box m="0 auto" width="100%">
            <PriceSlider />
          </Box>
          <Box pl="10px" mb="17px" display="flex" justifyContent="space-between">
            <Box pt="10px">
              <Typography sx={{ fontWeight: 'bold' }} component="span">
                {total}
              </Typography>
              <Typography component="span"> products</Typography>
            </Box>
            <FilteringByPriceAndName getValue={getValue} />
          </Box>

          <Box
            sx={{
              display: toggle ? 'block' : 'none',
              position: 'absolute',
              top: '0px',
              left: '0px',
              zIndex: '99',
              height: '100%',
              width: '100%',
              backgroundColor: 'white',
            }}>
            <Box sx={{ mb: '50px' }}>
              <Box>
                <Typography
                  sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    lineHeight: '60px',
                    width: '100%',
                  }}>
                  Filters
                </Typography>
                <CloseIcon
                  fontSize="large"
                  onClick={toggleButton}
                  sx={{ position: 'absolute', top: '17px', right: '15px' }}
                />
              </Box>

              <Accordion disableGutters={disableMarginInAccordion}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header">
                  <Typography fontWeight="bold">GENDER</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: '0px 0px 0px 17px' }}>
                  <GenderFilter />
                </AccordionDetails>
              </Accordion>

              <Accordion disableGutters={disableMarginInAccordion}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header">
                  <Typography fontWeight="bold">CLOTHING & SHOES</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: '0px 0px 0px 17px' }}>
                  <CategoryFilter />
                </AccordionDetails>
              </Accordion>

              <Accordion disableGutters={disableMarginInAccordion}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header">
                  <Typography fontWeight="bold">BRANDS</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: '0px 0px 0px 17px' }}>
                  <BrandFilter />
                </AccordionDetails>
              </Accordion>

              <Accordion disableGutters={disableMarginInAccordion}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header">
                  <Typography fontWeight="bold">SIZE</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: '0px 0px 0px 17px' }}>
                  <SizesFilter />
                </AccordionDetails>
              </Accordion>

              <Accordion disableGutters={disableMarginInAccordion}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header">
                  <Typography fontWeight="bold">CATEGORIES</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: '0px 0px 0px 17px' }}>
                  <SubCategoryFilter />
                </AccordionDetails>
              </Accordion>
            </Box>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', pb: '55px' }}>
              <CustomButton toggleButton={toggleButton}>SHOW</CustomButton>
            </Box>
          </Box>

          {/* {toggle && <MobileFilters toggleButton={toggleButton} />} */}
          <ProductList />
        </Box>
      </Box>
    </>
  );
};

export default MobileFiltersPage;
