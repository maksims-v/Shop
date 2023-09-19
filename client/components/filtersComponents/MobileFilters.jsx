import { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Drawer,
} from '@mui/material';
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
import MobileSearchChip from './MobileSearchChip';

const disableMarginInAccordion = true;

const MobileFilters = ({ newSearch, clearFilters }) => {
  const [mobileSearchMenuOpen, setMobileSearchMenuOpen] = useState(false);

  const total = useSelector((state) => state.searchPageSlice.metaData.total);
  const pageCategory = useSelector((state) => state.searchPageSlice.pageCategory);

  const [resetPriceSlider, setResetPriceSlider] = useState(false);

  const router = useRouter();
  const { query, asPath } = router;

  const dispatch = useDispatch();

  const clear = () => {
    clearFilters();
    dispatch(search({ pageCategory: 'all' }));
    setResetPriceSlider(!resetPriceSlider);
  };

  const handleDrawerToggle = () => {
    setMobileSearchMenuOpen((prevState) => !prevState);
  };

  useEffect(() => {
    dispatch(inputValue(newSearch));
  }, [newSearch]);

  return (
    <>
      {newSearch && (
        <Typography variant="h3" sx={{ margin: ' 0 auto' }}>
          Your search for
          <Typography component="span" sx={{ pl: '5px', fontSize: '22px', fontWeight: '600' }}>
            {newSearch}
          </Typography>{' '}
          {total} results
        </Typography>
      )}
      <MobileSearchChip />
      <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: '17px' }}>
        <CustomButton toggleButton={handleDrawerToggle}>SHOW FILTERS</CustomButton>
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

      <Drawer
        variant="temporary"
        open={mobileSearchMenuOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: '100%',
          },
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
              onClick={handleDrawerToggle}
              sx={{ position: 'absolute', top: '17px', right: '15px' }}
            />
          </Box>
          {pageCategory.filter((item) => item !== 'all').length !== 1 && (
            <Accordion disableGutters={disableMarginInAccordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography fontWeight="bold">GENDER</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ p: '0px 0px 0px 17px' }}>
                <PageCategoryFilter />
              </AccordionDetails>
            </Accordion>
          )}

          <Accordion disableGutters={disableMarginInAccordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header">
              <Typography fontWeight="bold">CATEGORIES</Typography>
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
              <Typography fontWeight="bold">
                {query.pageCategory == 'equipment' ? 'EQUIPMENT' : 'CLOTHING & SHOES'}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: '0px 0px 0px 17px' }}>
              <SubCategoryFilter />
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
        </Box>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', pb: '55px' }}>
          <CustomButton toggleButton={handleDrawerToggle}>SHOW</CustomButton>
        </Box>
      </Drawer>
    </>
  );
};
export default MobileFilters;
