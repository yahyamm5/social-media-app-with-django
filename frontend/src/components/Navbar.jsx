import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Avatar, 
  Container, 
  Menu, 
  MenuItem, 
  IconButton, 
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  // State to track the element that opens the menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" color="inherit" elevation={0} sx={{ borderBottom: '1px solid #dbdbdb' }}>
      <Container maxWidth="md">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: 0 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', fontFamily: 'serif' }}>
            SocialApp
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton 
              onClick={handleClick} 
              sx={{ p: 0 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: '#1976d2' }}>U</Avatar>
            </IconButton>

            <Menu
              id="account-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose} 
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}

            >
              <MenuItem sx={{ fontSize: '0.9rem', fontWeight: 600 }}>
                <Button onClick={() => navigate("/feed")} sx={{color:"black"}} >Profile</Button>
              </MenuItem>
              <MenuItem  sx={{ fontSize: '0.9rem' }}>
                <Button sx={{color:"black"}} >Signup</Button>
              </MenuItem>
              <MenuItem sx={{ fontSize: '0.9rem' }}>
                <Button sx={{color:"black"}} >Login</Button>
              </MenuItem>
              <Box sx={{ borderTop: '1px solid #eee', my: 1 }} />
              <MenuItem sx={{ fontSize: '0.9rem', color: 'error.main' }}>
                <Button  sx={{color: 'error.main'}}>Logout</Button>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;