import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import TroubleshootTwoTone from '@mui/icons-material/TroubleshootTwoTone';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import ReactDOM from 'react-dom';
import Statistics from './Statistics';
import CircularIndeterminate from './CircularIndeterminate';
import StatusMessage from './StatusMessage';
import ScoreInformation from './ScoreInformation';
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
  GoogleReCaptcha
} from "react-google-recaptcha-v3";





const captcha_site_key = "6Lcvg-QiAAAAANcAR9peIWQYW8KsMRElW2k1BwXv";
const theme = createTheme();

function showError(error){
  if( error == null || error == ""){
    ReactDOM.render(<p></p>, document.querySelector("#error_div"))
  }else{
    ReactDOM.render(<StatusMessage message={error} />, document.querySelector("#error_div"))
  }
}
function showLoading(loading){
  loading ? ReactDOM.render(<CircularIndeterminate />, document.querySelector("#loading_div")) : ReactDOM.render(<div></div>, document.querySelector("#loading_div"))
}

export default function Search() {
  const [token, setToken] = useState();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    showError(error);
  }, [error])
  useEffect(() => {
    showLoading(loading);
  }, [loading])
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true)
    setError(null); 
    const form_data = new FormData(event.currentTarget);
    form_data.append("g-recaptcha-response", token)
    //https://70vikclej2.execute-api.us-east-1.amazonaws.com/test/getaccountdata
    if(form_data.get('account').toString().match("^0x[a-fA-F0-9]{40}$") != null){
      console.log({
        account: form_data.get('account'), 
        c_token: form_data.get('g-recaptcha-response')                
      });
      var obj;
      try{
         fetch('/test/getaccountdata?account_id='+form_data.get('account')+'&captcha='+form_data.get('g-recaptcha-response')) 
        .then(response => response.json())
        .catch(err => {     
          setLoading(false)      
          throw new Error("Wallet data not accessible")
                  
        })
        .then(data => {
          setLoading(false) 
          ReactDOM.render(<Statistics json_data={data} />, document.querySelector("#statistics_div"))
          ReactDOM.render(<ScoreInformation score={data.score} />, document.querySelector("#score_div"))
        })
        .catch((error) => {
          setError("Wallet data not accessible"); 
          setLoading(false)  
        });
        ;
      }catch(err){
        setError(err);   
        setLoading(false)  
      }
    }else{
      setError("Please enter a valid wallet ID"); 
      setLoading(false)    
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
              Ethereum Address
            </Typography>
          </Box>
          <GoogleReCaptchaProvider reCaptchaKey={captcha_site_key}>
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
              <GoogleReCaptcha
                onVerify={token => {
                  setToken(token)
                }}
              />
            </Grid>
          
            </GoogleReCaptchaProvider>
      </Container>
    </ThemeProvider>    
  );
}