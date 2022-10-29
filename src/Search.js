import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import TroubleshootTwoTone from '@mui/icons-material/TroubleshootTwoTone';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Search() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(data.get('account').toString().match("^0x[a-fA-F0-9]{40}$") != null){
      console.log({
        account: data.get('account')        
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <TroubleshootTwoTone />
            </Avatar>
            <Typography component="h1" variant="h5">
              Ethereum Account
            </Typography>
          </Box>

            <Grid component="form" onSubmit={handleSubmit} noValidate container spacing={2}>
              <Grid item xs={10}>
                  <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="account"
                  label="Account"
                  name="account"
                  autoComplete="account"
                  autoFocus
                />
              
              </Grid>
              <Grid item xs={2} >
                
                  <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Search
                </Button>
                
              </Grid>
          </Grid>
        
        
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}