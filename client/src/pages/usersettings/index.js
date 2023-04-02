import { useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Typography, Box, List, ListItem, TextField, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { saveChanges } from '@/state/authSlice';

async function changeUserData(newData) {
  const token = localStorage.getItem('accestoken');
  try {
    const res = await fetch('http://127.0.0.1:1337/api/users/1', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lastName: 'Makc',
        phone: '0000',
      }),
    });
    const data = await res.json();

    return { data };
  } catch (e) {
    return e;
  }
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const UserDashboard = () => {
  const user = useSelector((state) => state.auth.user);

  console.log(user);

  const [value, setValue] = useState(0);
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [surname, setSurname] = useState(user.surname);
  const [country, setCountry] = useState(user.country);
  const [city, setCity] = useState(user.city);
  const [adress, setAdress] = useState(user.adress);
  const [postCode, setPostcode] = useState(user.postCode);
  const [phone, setPhone] = useState(user.phone);

  const dispatch = useDispatch();

  async function saveData() {
    const user2 = await changeUserData();
    console.log(user2);
  }

  const orders = useSelector((state) => state.auth.orders);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        m: '0 auto',
        flexGrow: 1,
        bgcolor: 'background.paper',
        display: 'flex',
        minHeight: 500,
        mt: '100px',
        border: '1px solid black',
        justifyContent: 'spaceBeetwen',
        maxWidth: '70%',
      }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}>
        <Tab label="My profile" {...a11yProps(0)} />
        <Tab label="My orders" {...a11yProps(1)} />
        <Tab label="Delivery address" {...a11yProps(2)} />
        <Tab label="Item Four" {...a11yProps(3)} />
        <Tab label="Item Five" {...a11yProps(4)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <List sx={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            id="standard-basic"
            value={email}
            label="Email"
            variant="outlined"
          />
          <TextField
            onChange={(e) => setName(e.target.value)}
            value={name}
            id="standard-basic"
            label="First Name"
            variant="outlined"
          />
          <TextField
            onChange={(e) => setSurname(e.target.value)}
            id="standard-basic"
            value={surname}
            label="Surname"
            variant="outlined"
          />
          <TextField
            onChange={(e) => setCountry(e.target.value)}
            id="standard-basic"
            value={country}
            label="Country"
            variant="outlined"
          />
          <TextField
            onChange={(e) => setCity(e.target.value)}
            id="standard-basic"
            value={city}
            label="City"
            variant="outlined"
          />
          <TextField
            onChange={(e) => setAdress(e.target.value)}
            id="standard-basic"
            value={adress}
            label="Adress"
            variant="outlined"
          />
          <TextField
            onChange={(e) => setPostcode(e.target.value)}
            id="standard-basic"
            value={postCode}
            label="Post Code"
            variant="outlined"
          />

          <TextField
            sx={{ width: '300px' }}
            onChange={(e) => setPhone(e.target.value)}
            id="standard-basic"
            value={phone}
            label="Phone"
            variant="outlined"
          />
        </List>
        <Button onClick={saveData} variant="contained" color="success">
          Save
        </Button>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {orders.map((item) => (
          <ListItem key={item.id}>
            {item.id}: Type: {item.type}, Brand: {item.brand}, Size: {item.size}, Color:{' '}
            {item.color}
          </ListItem>
        ))}
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
    </Box>
  );
};

export default UserDashboard;
