import { useState } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Container, 
  Paper, 
  Grid, 
  Link,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { userApiStore } from '../api/apiStore';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { signup, loading } = userApiStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await signup(formData.username, formData.email, formData.password);
    
    if (result.success) {
      navigate('/login');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', bgcolor: '#f0f2f5' }}>
      <Container maxWidth="lg">
        <Grid container component={Paper} elevation={6} sx={{ borderRadius: 4, overflow: 'hidden' }}>
          
          <Grid item xs={12} sm={8} md={6} sx={{ p: { xs: 4, md: 8 }, bgcolor: 'white' }}>
            <Box component="form" noValidate onSubmit={handleSubmit}>
              <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                Create Account
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Join our community today.
              </Typography>

              <TextField
                margin="normal"
                required
                fullWidth
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={formData.username}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
              />

              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label={
                  <Typography variant="caption">
                    I agree to the Terms of Service and Privacy Policy.
                  </Typography>
                }
                sx={{ mt: 1 }}
              />

              <Button
                type="submit"
                disabled={loading}
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: 'bold', borderRadius: 2 }}
              >
                {loading ? 'Creating...' : 'Sign Up'}
              </Button>

              <Grid container justifyContent="center">
                <Grid item>
                  <Link href="#" variant="body2" sx={{ textDecoration: 'none', fontWeight: 600 }}>
                    Already have an account? Sign In
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default RegisterPage;