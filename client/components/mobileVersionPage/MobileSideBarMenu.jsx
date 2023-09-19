import { useState } from 'react';
import {
  Box,
  Drawer,
  Typography,
  Divider,
  AccordionSummary,
  AccordionDetails,
  Accordion,
  IconButton,
} from '@mui/material';
import Link from 'next/link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Image from 'next/image';
import { useSelector } from 'react-redux';

const MobileSideBarMenu = ({ mobileOpen, handleDrawerToggle }) => {
  const [expanded, setExpanded] = useState(true);
  const disable = true;

  const headerFetchData = useSelector((state) => state.headerSlice.data);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box component="nav">
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 250,
          },
        }}>
        <Box sx={{ textAlign: 'center', backgroundColor: 'white', height: '100%' }}>
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ position: 'absolute', right: '0px', top: '6px', zIndex: 5 }}>
            <KeyboardArrowLeftIcon fontSize="large" />
          </IconButton>
          <Link href="/">
            {' '}
            <Box sx={{}}>
              <Image src="/logo.png" alt="logo" width={90} height={65} />
            </Box>
          </Link>
          <Divider color="white" />

          <Box sx={{ backgroundColor: 'white' }}>
            {headerFetchData &&
              headerFetchData.map((item, index) =>
                item.link.length == 0 ? (
                  <Accordion
                    key={index}
                    sx={{
                      textAlign: 'left',
                    }}
                    disableGutters={disable}
                    expanded={expanded === item.label}
                    onChange={handleChange(item.label)}>
                    <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
                      <Link href={item.href}>
                        <Typography
                          onClick={handleDrawerToggle}
                          sx={{ width: '100%', flexShrink: 0, fontWeight: 'bold' }}>
                          {item.label}
                        </Typography>
                      </Link>
                    </AccordionSummary>
                  </Accordion>
                ) : (
                  <Accordion
                    key={index}
                    sx={{
                      textAlign: 'left',
                    }}
                    disableGutters={disable}
                    expanded={expanded === item.label}
                    onChange={handleChange(item.label)}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header">
                      <Typography sx={{ width: '100%', flexShrink: 0, fontWeight: 'bold' }}>
                        {item.label}
                      </Typography>
                    </AccordionSummary>

                    <AccordionDetails sx={{ p: '0px 16px' }}>
                      {item.link.map((linkItem, index) => (
                        <Link key={index} href={linkItem.href}>
                          <Box
                            onClick={handleDrawerToggle}
                            sx={{ fontSize: '14px', mb: '5px', pl: ' 5px' }}>
                            {linkItem.label}
                          </Box>
                        </Link>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                ),
              )}
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default MobileSideBarMenu;
