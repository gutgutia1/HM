import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { tokenUpdate } from '../../store/authReducer';
const defaultTheme = createTheme();
const SignIn = (props) => {
  const navigate = useNavigate();
  // const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('P12345'); // State variable for email input
  const [password, setPassword] = useState('Piyush@12345'); // State variable for password input
  const [error, setError] = useState(''); // State variable for displaying error message
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/v1/auth/login', {
        "employeeId": email,
        "password": password,
      });

      if (response.status === 200) {
        dispatch(tokenUpdate(response?.data?.token));
        navigate('/HeatRegister');
        console.log('response.headers', response.headers);
        const setCookieHeader = response.headers['set-cookie'];
        if (setCookieHeader) {
          // Split the cookie header if there are multiple cookies
          const cookies = setCookieHeader.split(', ');
          console.log('Cookie:', cookies);

          // Now you can access and parse individual cookies
          cookies.forEach(cookie => {
            console.log('Cookie:', cookie);
          });
        } else {
          console.log('blank');
        }
      } else {
        // Login failed, display an error message
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
      setError(error.message)
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
export default SignIn;