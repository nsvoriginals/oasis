import React from 'react';
import { Button, Box, Typography, AppBar, Toolbar } from '@mui/material';
import styled from 'styled-components';

const StartButton = styled(Button)`
  padding: 15px 30px;
  background-color: #8c51fe;
  color: white;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #6a3bcf;
  }
`;

type LandingPageProps = {
  onStart: () => void;
};

const Landing: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <Box
      sx={{
        height: '400vh', // Twice the screen height
        width: '100vw',
        fontFamily: 'Heming',
        display: 'flex',
        flexDirection: 'column',
        overflowY:'hidden'
      }}
    >

      {/* Navbar */}
      <AppBar
        position="static"
        sx={{
          background: 'transparent',
          boxShadow: 'none',
          marginTop: '20px',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Logo and Title */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="./public/logo1.png" alt="logo" style={{ height: '40px', width: '40px' }} />
            <Typography variant="h5" sx={{ textAlign: 'center' }}>
              Oasis
            </Typography>
          </Box>

          {/* Navbar Links */}
          <Box sx={{ display: 'flex', gap: '20px', textAlign: 'center' }}>
            <Typography variant="body1" sx={{ fontSize: '20px', color: 'black' }}>
              Features
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '20px', color: 'black' }}>
              About
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '20px', color: 'black' }}>
              Docs
            </Typography>
          </Box>

          {/* Login and Register Buttons */}
          <Box sx={{ display: 'flex', gap: '15px' }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#8C51FE',
                color: 'white',
                paddingX: '20px',
                paddingY: '10px',
                borderRadius: '8px',
              }}
              onClick={() => console.log('Navigating to login')}
            >
              Login
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#8C51FE',
                color: 'white',
                paddingX: '20px',
                paddingY: '10px',
                borderRadius: '8px',
              }}
              onClick={() => console.log('Navigating to register')}
            >
              Register
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Landing Hero Section */}
      <Box
        id="hero"
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '110px',
        }}
      >
        {/* Hero Title */}
        <Typography
          variant="h1"
          sx={{
            textAlign: 'center',
            fontSize: { xs: '70px', sm: '105px' },
            lineHeight: 1.2,
            width: '90vw',
          }}
        >
          Virtual spaces <br />
          <span style={{ color: '#8C51FE', fontSize: '125px' }}>Re-imagined for</span> <br />
          collaborations
        </Typography>

        {/* Hero Subtitle */}
        <Typography variant="h4" sx={{ color: 'black', marginTop: '10px', fontSize: '24px' }}>
          Connect. Create. Collaborate
        </Typography>
        <Typography variant="h3" sx={{ color: 'black', fontSize: '14px' }}>
          Anywhere
        </Typography>
        <Button
          variant="contained"
          onClick={onStart}
          sx={{
            backgroundColor: '#8C51FE',
            color: 'white',
            paddingX: '30px',
            paddingY: '10px',
            borderRadius: '8px',
            marginTop: '30px',
            fontSize: '18px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#6A3BCF',
            },
          }}
        >
          Start Room
        </Button>
      </Box>

      {/* Additional Content Section */}
      <Box
        id="extra-content"
        sx={{
          width: '100%',
          flex: 1,
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5">Additional Content Here</Typography>
      </Box>
    </Box>
  );
};

export default Landing;
