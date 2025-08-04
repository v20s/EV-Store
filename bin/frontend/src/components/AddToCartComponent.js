import React, { useState } from 'react';
import axios from 'axios';
import { 
  Box, 
  Button, 
  Typography, 
  TextField, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  IconButton,
  Snackbar,
  Alert,
  Paper,
  Divider
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';

const AddToCartComponent = ({ vehicle }) => {
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [customizations, setCustomizations] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  
  const navigate = useNavigate();
  
  // Get JWT token from local storage
  const token = localStorage.getItem('token');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const handleCustomizationsChange = (e) => {
    setCustomizations(e.target.value);
  };

  const handleAddToCart = async () => {
    try {
      // Create cart item DTO
      const cartItemDTO = {
        vehicleId: vehicle.id,
        quantity: quantity,
        customizations: customizations ? JSON.stringify(JSON.parse(customizations)) : null
      };
      
      // Call add to cart API with the JWT token
      await axios.post(`http://localhost:8080/api/cart/add`, cartItemDTO, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Show success message
      setSnackbarMessage('Vehicle added to cart successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      
      // Close dialog
      handleClose();
      
      // Reset form
      setQuantity(1);
      setCustomizations('');
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      setSnackbarMessage('Failed to add vehicle to cart. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);

      // Redirect to login if the token is invalid or expired
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  const handleBuyNow = async () => {
    try {
      let parsedCustomizations = null;
      if (customizations) {
        parsedCustomizations = JSON.parse(customizations);
  
        // If user typed a paint color but not finalImage, do a color-based mapping:
        if (parsedCustomizations.paint && !parsedCustomizations.finalImage) {
          parsedCustomizations.finalImage = colorToImageMap[parsedCustomizations.paint] || null;
        }
      }
      // Add to cart first
      const cartItemDTO = {
        vehicleId: vehicle.id,
        quantity: quantity,
        customizations: customizations ? JSON.stringify(JSON.parse(customizations)) : null
      };
      
      await axios.post(`http://localhost:8080/api/cart/add`, cartItemDTO, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Close dialog
      handleClose();
      
      // Navigate to checkout
      navigate('/checkout');
      
    } catch (error) {
      console.error('Error processing buy now:', error);
      setSnackbarMessage('Failed to process order. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);

      // Redirect to login if the token is invalid or expired
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  return (
    <>
      <Box sx={{ mt: 3 }}>
        <Paper elevation={0} variant="outlined" sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {vehicle?.model} - {vehicle?.trim}
          </Typography>
          
          <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
            ${vehicle?.price?.toLocaleString()}
          </Typography>
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddShoppingCartIcon />}
              fullWidth
              onClick={handleClickOpen}
            >
              Add to Cart
            </Button>
            
            <Button
              variant="outlined"
              color="primary"
              startIcon={<ShoppingCartIcon />}
              fullWidth
              onClick={() => {
                setQuantity(1);
                handleBuyNow();
              }}
            >
              Buy Now
            </Button>
          </Box>
        </Paper>
      </Box>
      
      {/* Add to Cart Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add to Cart</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, py: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body1">Quantity:</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: 1 }}>
                <IconButton onClick={decreaseQuantity} disabled={quantity <= 1} size="small">
                  <RemoveIcon />
                </IconButton>
                <TextField
                  value={quantity}
                  InputProps={{
                    readOnly: true,
                    disableUnderline: true,
                  }}
                  variant="standard"
                  sx={{ 
                    width: '40px', 
                    input: { textAlign: 'center' },
                    '& .MuiInput-underline:before': { borderBottom: 'none' },
                    '& .MuiInput-underline:after': { borderBottom: 'none' },
                  }}
                />
                <IconButton onClick={increaseQuantity} size="small">
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>
            
            <TextField
              label="Customizations (Optional JSON)"
              multiline
              rows={4}
              value={customizations}
              onChange={handleCustomizationsChange}
              placeholder='{"color": "red", "additionalFeatures": ["autopilot", "premium sound"]}'
              helperText="Enter customizations in JSON format or leave blank"
              fullWidth
            />
            
            <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                Vehicle: {vehicle?.model} - {vehicle?.trim}
              </Typography>
              <Typography variant="body2">
                Price: ${vehicle?.price?.toLocaleString()} x {quantity} = ${(vehicle?.price * quantity).toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddToCart} variant="contained" color="primary">
            Add to Cart
          </Button>
          <Button onClick={handleBuyNow} variant="contained" color="secondary">
            Buy Now
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddToCartComponent;