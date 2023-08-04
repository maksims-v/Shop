import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import GenderFilter from './GenderFilter';
import CategoryFilter from './CategoryFilter';
import BrandFilter from './BrandFilter';
import { useDispatch, useSelector } from 'react-redux';
import SizesFilter from './SizesFilter';
import SubCategoryFilter from './SubCategoryFilter';
import CustomButton from 'components/ui/CustomButton';

const disableMarginInAccordion = true;

const MobileFilters = ({ toggleButton, toggle }) => {
  console.log('hai');
  return (
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
  );
};
export default MobileFilters;
