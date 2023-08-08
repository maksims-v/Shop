import { Stack, Button } from '@mui/material';

const CustomButton = ({ children, toggleButton }) => {
  return (
    <Stack>
      <Button onClick={toggleButton} size="large" sx={buttonStyle} variant="outlined">
        {children}
      </Button>
    </Stack>
  );
};

export default CustomButton;

const buttonStyle = {
  width: '150px',
  borderRadius: '1px',
  height: '30px',
  fontSize: '13px',
  color: 'black',
  borderColor: '#cecece',
  fontWeight: 'bold',
};
