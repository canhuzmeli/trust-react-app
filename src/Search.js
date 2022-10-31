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
import ReactDOM from 'react-dom';
import Statistics from './Statistics';


const theme = createTheme();

const data2 = '{ "count_transactions": 1002, "count_unique_from": 243, "count_unique_to": 2, "count_to_from_intersection": 0, "unique_from_transaction_ratio": 0.24251497005988024, "mean_timestamp_difference": 227958.0889110889, "median_timestamp_difference": 18440, "mean_median_diff_timestamp": 209518.0889110889, "count_max_repeated_from": 292, "count_max_repeated_to": 1001, "mean_gas_used": 47597.48902195609, "median_gas_used": 25137.5, "mean_median_diff_gas_used": 22459.98902195609, "count_empty_input": 198, "mean_value": 11887.285589908171, "median_value": 0.0, "mean_median_diff_value": 11887.285589908171, "oldest_transaction_age": 1.2, "count_unique_methodid": 41, "active_duration:": 228186047, "newest_transaction_age": 0.2, "max_transaction_value": 11901464.23948, "min_transaction_value": 0.0, "account_value": 339271.32289 }';

export default function Search() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(data.get('account').toString().match("^0x[a-fA-F0-9]{40}$") != null){
      console.log({
        account: data.get('account')                
      });
      ReactDOM.render(<Statistics json_data={data2} />, document.querySelector("#statistics_div"))
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
      </Container>
    </ThemeProvider>
  );
}