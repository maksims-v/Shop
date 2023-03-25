import { Box, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';

const validationSchema = yup.object({
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
  passwordConfirm: yup.string('Repeat the password').required('Repeat the password'),
});

const Registration = () => {
  const [invalidPass, setInvalidPass] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (values.password !== values.passwordConfirm) {
        setConfirmationMessage(null);
        setInvalidPass('Invalid password');
      } else {
        setInvalidPass(null);
        setConfirmationMessage('Please confirm your email address.');
      }
      console.log(values);
    },
  });

  return (
    <Box sx={{ mt: '100px', width: '100%' }}>
      {' '}
      <Box maxWidth="400px" m="0 auto">
        <form onSubmit={formik.handleSubmit}>
          <Box gap="10px" display="flex" flexDirection="column" alignItems="center">
            {' '}
            <TextField
              sx={{ width: '300px' }}
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              sx={{ width: '300px' }}
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              sx={{ width: '300px' }}
              id="passwordConfirm"
              name="passwordConfirm"
              label="Password confirm"
              type="password"
              value={formik.values.passwordConfirm}
              onChange={formik.handleChange}
              error={formik.touched.passwordConfirm && Boolean(formik.errors.passwordConfirm)}
              helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
            />
            {invalidPass}
            {confirmationMessage}
            <Button
              sx={{ width: '100px' }}
              color="primary"
              variant="contained"
              fullWidth
              type="submit">
              Registration
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Registration;
