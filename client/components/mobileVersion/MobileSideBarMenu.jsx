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

const MobileSideBarMenu = ({ mobileOpen, handleDrawerToggle, womensCategory, mensCategory }) => {
  const [expanded, setExpanded] = useState(true);
  const disable = true;

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
            width: 200,
          },
        }}>
        <Box sx={{ textAlign: 'center', backgroundColor: '#262624', height: '100%' }}>
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ color: 'white', position: 'absolute', right: '0px', top: '6px', zIndex: 5 }}>
            <KeyboardArrowLeftIcon fontSize="large" />
          </IconButton>

          <Typography variant="h6" sx={{ my: 2, color: '#ffde00' }}>
            ADVENTURE
          </Typography>
          <Divider color="white" />

          <Box sx={{ backgroundColor: 'black' }}>
            <Accordion
              sx={{
                backgroundColor: '#262624',
                color: 'white',
                textAlign: 'left',
              }}
              disableGutters={disable}
              expanded={expanded === 'panel1'}
              onChange={handleChange('panel1')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                aria-controls="panel1bh-content"
                id="panel1bh-header">
                <Typography sx={{ width: '100%', flexShrink: 0 }}>MEN'S</Typography>
              </AccordionSummary>

              <AccordionDetails sx={{ p: '0px 16px' }}>
                {mensCategory.map((item) => {
                  return (
                    <Link key={item.id} href={item.path}>
                      <Box
                        onClick={handleDrawerToggle}
                        sx={{ color: 'white', fontSize: '11px', mb: '15px', pl: ' 5px' }}>
                        {item.title}
                      </Box>
                    </Link>
                  );
                })}
              </AccordionDetails>
            </Accordion>
            <Divider color="white" />
            <Accordion
              sx={{ backgroundColor: '#262624', color: 'white', textAlign: 'left' }}
              expanded={expanded === 'panel2'}
              onChange={handleChange('panel2')}
              disableGutters={disable}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                aria-controls="panel2bh-content"
                id="panel2bh-header">
                <Typography sx={{ width: '100%', flexShrink: 0 }}>WOMEN'S</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ p: '0px 16px' }}>
                {womensCategory.map((item) => {
                  return (
                    <Link key={item.id} href={item.path}>
                      <Box
                        onClick={handleDrawerToggle}
                        sx={{ color: 'white', fontSize: '11px', mb: '15px', pl: ' 5px' }}>
                        {item.title}
                      </Box>
                    </Link>
                  );
                })}
              </AccordionDetails>
            </Accordion>
            <Divider color="white" />
            <Accordion
              sx={{ backgroundColor: '#262624', color: 'white', textAlign: 'left' }}
              disableGutters={disable}
              expanded={expanded === 'panel3'}
              onChange={handleChange('panel3')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                aria-controls="panel3bh-content"
                id="panel3bh-header">
                <Typography sx={{ width: '100%', flexShrink: 0 }}>KIDS</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
                  eros, vitae egestas augue. Duis vel est augue.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Divider color="white" />
            <Accordion
              sx={{ backgroundColor: '#262624', color: 'white', textAlign: 'left' }}
              disableGutters={disable}
              expanded={expanded === 'panel4'}
              onChange={handleChange('panel4')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                aria-controls="panel4bh-content"
                id="panel4bh-header">
                <Typography sx={{ width: '100%', flexShrink: 0 }}>BRANDS</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
                  eros, vitae egestas augue. Duis vel est augue.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Divider color="white" />
            <Accordion
              sx={{ backgroundColor: '#262624', color: 'white', textAlign: 'left' }}
              expanded={expanded === 'panel5'}
              onChange={handleChange('panel5')}>
              <Link href="/sale">
                <AccordionSummary
                  onClick={handleDrawerToggle}
                  aria-controls="panel5bh-content"
                  id="panel5bh-header">
                  <Typography sx={{ width: '100%', flexShrink: 0 }}>SALE</Typography>
                </AccordionSummary>
              </Link>
            </Accordion>
            <Divider color="white" />
            <Accordion
              sx={{ backgroundColor: '#262624', color: 'white', textAlign: 'left' }}
              expanded={expanded === 'panel6'}
              onChange={handleChange('panel6')}>
              <Link href="/clerance">
                <AccordionSummary
                  onClick={handleDrawerToggle}
                  aria-controls="panel6bh-content"
                  id="panel6bh-header">
                  <Typography sx={{ width: '100%', flexShrink: 0 }}>CLERANCE</Typography>
                </AccordionSummary>
              </Link>
            </Accordion>
            <Divider color="white" />
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default MobileSideBarMenu;
