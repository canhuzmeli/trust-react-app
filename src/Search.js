import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect,useCallback } from "react";
import Box from '@mui/material/Box';
import TroubleshootTwoTone from '@mui/icons-material/TroubleshootTwoTone';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import ReactDOM from 'react-dom/client';
import Statistics from './Statistics';
import CircularIndeterminate from './CircularIndeterminate';
import StatusMessage from './StatusMessage';
import ScoreInformation from './ScoreInformation';
import ToggleColorMode from './ToggleColorMode';
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
  GoogleReCaptcha
} from "react-google-recaptcha-v3";



const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const captcha_site_key = "6Lcvg-QiAAAAANcAR9peIWQYW8KsMRElW2k1BwXv";

function showError(error){
  if( error == null || error == ""){
    const error_div = ReactDOM.createRoot(document.getElementById("error_div"));
    error_div.render(
      <p></p>
    );
    //ReactDOM.render(<p></p>, document.querySelector("#error_div"))
  }else{
    const error_div = ReactDOM.createRoot(document.getElementById("error_div"));
    error_div.render(
      <StatusMessage message={error} />
    );
    //ReactDOM.render(<StatusMessage message={error} />, document.querySelector("#error_div"))
  }
}
function showLoading(loading){
  const loading_div = ReactDOM.createRoot(document.getElementById("loading_div"));
  loading_div.render(<CircularIndeterminate />);
  loading ? loading_div.render(<CircularIndeterminate />) :  loading_div.render(<div></div>)
}

export default function Search() {
  const [token, setToken] = useState();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mode, setMode] = React.useState('light');

  useEffect(() => {
    const loadScriptByURL = (id, url, callback) => {
      const isScriptExist = document.getElementById(id);
   
      if (!isScriptExist) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        script.id = id;
        script.onload = function () {
          if (callback) callback();
        };
        document.body.appendChild(script);
      }
   
      if (isScriptExist && callback) callback();
    }
   
    // load the script by passing the URL
    loadScriptByURL("recaptcha-key", `https://www.google.com/recaptcha/api.js?render=${captcha_site_key}`, function () {
      console.log("Script loaded!");
    });
  }, []);



  useEffect(() => {
    showError(error);
  }, [error])
  useEffect(() => {
    showLoading(loading);
  }, [loading])
  
  

  const handleCallback = (childData) =>{
    setMode(childData)

  }
  const colorMode = React.useContext(ColorModeContext);
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true)
    setError(null); 
    const form_data = new FormData(event.currentTarget);
    

    
    //https://70vikclej2.execute-api.us-east-1.amazonaws.com/test/getaccountdata
    if(form_data.get('account').toString().match("^0x[a-fA-F0-9]{40}$") != null){
      
      var obj;
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute(captcha_site_key, { action: 'submit' }).then(token => {
          try{
            
            fetch('/test/getaccountdata?account_id='+form_data.get('account')+'&captcha='+token) 
           .then(response => response.json())
           .catch(err => { 
             console.info(err)    
             setLoading(false)      
             throw new Error("Wallet data not accessible")
                     
           })
           .then(data => {
             setLoading(false) 
             const statistics_div = ReactDOM.createRoot(document.getElementById("statistics_div"));
             statistics_div.render(
               <Statistics json_data={data} />
             );
             const score_div = ReactDOM.createRoot(document.getElementById("score_div"));
             score_div.render(
               <ScoreInformation score={data.score} />
             );
             //ReactDOM.render(<ScoreInformation score={data.score} />, document.querySelector("#score_div"))
           })
           .catch((error) => {
             console.info(error)
             setError("Wallet data not accessible"); 
             setLoading(false)  
           });
           ;
         }catch(err){
           console.info(error)
           setError(err);   
           setLoading(false)  
         }
        });
      });
      
    }else{
      setError("Please enter a valid wallet ID"); 
      setLoading(false)    
    }
  };
  
  return (

    
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="sm">
        <CssBaseline /> 
        <ToggleColorMode parentCallback = {handleCallback} />
                   
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
                <GoogleReCaptcha/>
              </Grid>
            
              </GoogleReCaptchaProvider>
        </Container>
        <StatusMessage />
        <CircularIndeterminate />
        <Statistics  />
        <ScoreInformation />
      </ThemeProvider> 
    </ColorModeContext.Provider>   
  );
}