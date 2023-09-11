import { useState, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import PageCategoryFilter from './PageCategoryFilter';
import CategoryFilter from './CategoryFilter';
import BrandFilter from './BrandFilter';
import CustomButton from 'components/ui/CustomButton';
import PriceSlider from './PriceSlider';
import SortingByPriceAndName from 'components/SortingByPriceAndName';
import { useDispatch, useSelector } from 'react-redux';
import SizesFilter from './SizesFilter';
import SubCategoryFilter from './SubCategoryFilter';
import { clearAllFilters, search, inputValue } from '@/state/searchPageSlice';
import Link from 'next/link';
import { useRouter } from 'next/router';

const disableMarginInAccordion = true;

const MobileFilters = ({ newSearch, clearFilters }) => {
  const [toggle, setToggle] = useState(false);

  const total = useSelector((state) => state.searchPageSlice.metaData.total);
  const [resetPriceSlider, setResetPriceSlider] = useState(false);

  const { asPath } = useRouter();

  const dispatch = useDispatch();

  const toggleButton = () => {
    setToggle(!toggle);
  };

  const clear = () => {
    clearFilters();
    setResetPriceSlider(!resetPriceSlider);
  };

  useEffect(() => {
    dispatch(inputValue(newSearch));
  }, [newSearch]);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: '17px' }}>
        <CustomButton toggleButton={toggleButton}>SHOW FILTERS</CustomButton>
        <Link href={asPath}>
          <CustomButton toggleButton={clear}>CLEAR FILTERS</CustomButton>
        </Link>
      </Box>
      <Box m="0 auto" width="100%">
        <PriceSlider resetPriceSlider={resetPriceSlider} />
      </Box>
      <Box pl="10px" mb="17px" display="flex" justifyContent="space-between">
        <Box pt="10px">
          <Typography sx={{ fontWeight: 'bold' }} component="span">
            {total}
          </Typography>
          <Typography component="span"> products</Typography>
        </Box>
        <SortingByPriceAndName />
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
              <Typography fontWeight="bold">page</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: '0px 0px 0px 17px' }}>
              <pageFilter />
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
    </>
  );
};
export default MobileFilters;
