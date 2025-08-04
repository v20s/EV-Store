// src/components/Checkout.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  TextField, 
  Button, 
  Divider, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  FormControl, 
  FormLabel 
} from '@mui/material';
import { Header } from './SharedComponents';

const Checkout = () => {
  const [cart, setCart] = useState({ items: [] });
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  
  const navigate = useNavigate();
  
  // Get user ID from local storage
  const userId = localStorage.getItem('userId') || 1; // Default to 1 for testing

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:8080/api/cart/${userId}`);
      setCart(data);
      
      // Fetch detailed information for each vehicle in the cart
      if (data.items && data.items.length > 0) {
        let total = 0;
        
        for (const item of data.items) {
          const vehicleResponse = await axios.get(`http://localhost:8080/vehicles/${item.vehicleId}`);
          const vehicle = vehicleResponse.data;
          
          // Add vehicle details to the item
          item.vehicle = vehicle;
          
          // Calculate total amount
          total += vehicle.price * item.quantity;
		  total += vehicle.price * item.quantity;
		          }
		          
		          setTotalAmount(total);
		        }
		        
		        setLoading(false);
		      } catch (error) {
		        console.error('Error fetching cart:', error);
		        setLoading(false);
		      }
		    };

		    const handleInputChange = (e) => {
		      const { name, value } = e.target;
		      setFormData({
		        ...formData,
		        [name]: value
		      });
		    };

		    const handlePaymentMethodChange = (e) => {
		      setPaymentMethod(e.target.value);
		    };

		    const handleSubmit = async (e) => {
		      e.preventDefault();
		      
		      try {
		        // Create checkout DTO
		        const checkoutDTO = {
		          userId: userId,
		          paymentMethod: paymentMethod
		        };
		        
		        // Call checkout API
		        const response = await axios.post('http://localhost:8080/api/orders/checkout', checkoutDTO);
		        
		        // Redirect to order confirmation with the order ID
		        navigate(`/order-confirmation/${response.data.orderId}`);
		        
		      } catch (error) {
		        console.error('Error during checkout:', error);
		        alert('There was an error processing your order. Please try again.');
		      }
		    };

		    const handleBackToCart = () => {
		      navigate('/cart');
		    };

		    if (loading) {
		      return (
		        <Box sx={{ textAlign: 'center', p: 4 }}>
		          <Typography variant="h5">Loading checkout...</Typography>
		        </Box>
		      );
		    }

		    // Redirect to cart if cart is empty
		    if (cart.items.length === 0) {
		      navigate('/cart');
		      return null;
		    }

		    return (
		      <>
		        <Header />
		        <Box sx={{ maxWidth: 1200, margin: '0 auto', p: 3 }}>
		          <Typography variant="h4" sx={{ mb: 3 }}>Checkout</Typography>
		          
		          <form onSubmit={handleSubmit}>
		            <Grid container spacing={3}>
		              <Grid item xs={12} md={8}>
		                {/* Customer Information */}
		                <Paper sx={{ p: 3, mb: 3 }}>
		                  <Typography variant="h6" sx={{ mb: 2 }}>Customer Information</Typography>
		                  <Grid container spacing={2}>
		                    <Grid item xs={12} sm={6}>
		                      <TextField
		                        required
		                        fullWidth
		                        label="First Name"
		                        name="firstName"
		                        value={formData.firstName}
		                        onChange={handleInputChange}
		                      />
		                    </Grid>
		                    <Grid item xs={12} sm={6}>
		                      <TextField
		                        required
		                        fullWidth
		                        label="Last Name"
		                        name="lastName"
		                        value={formData.lastName}
		                        onChange={handleInputChange}
		                      />
		                    </Grid>
		                    <Grid item xs={12}>
		                      <TextField
		                        required
		                        fullWidth
		                        label="Email"
		                        name="email"
		                        type="email"
		                        value={formData.email}
		                        onChange={handleInputChange}
		                      />
		                    </Grid>
		                  </Grid>
		                </Paper>
		                
		                {/* Shipping Information */}
		                <Paper sx={{ p: 3, mb: 3 }}>
		                  <Typography variant="h6" sx={{ mb: 2 }}>Shipping Information</Typography>
		                  <Grid container spacing={2}>
		                    <Grid item xs={12}>
		                      <TextField
		                        required
		                        fullWidth
		                        label="Address"
		                        name="address"
		                        value={formData.address}
		                        onChange={handleInputChange}
		                      />
		                    </Grid>
		                    <Grid item xs={12} sm={6}>
		                      <TextField
		                        required
		                        fullWidth
		                        label="City"
		                        name="city"
		                        value={formData.city}
		                        onChange={handleInputChange}
		                      />
		                    </Grid>
		                    <Grid item xs={12} sm={3}>
		                      <TextField
		                        required
		                        fullWidth
		                        label="State"
		                        name="state"
		                        value={formData.state}
		                        onChange={handleInputChange}
		                      />
		                    </Grid>
		                    <Grid item xs={12} sm={3}>
		                      <TextField
		                        required
		                        fullWidth
		                        label="Zip Code"
		                        name="zipCode"
		                        value={formData.zipCode}
		                        onChange={handleInputChange}
		                      />
		                    </Grid>
		                  </Grid>
		                </Paper>
		                
		                {/* Payment Information */}
		                <Paper sx={{ p: 3 }}>
		                  <Typography variant="h6" sx={{ mb: 2 }}>Payment Information</Typography>
		                  
		                  <FormControl component="fieldset" sx={{ mb: 3 }}>
		                    <FormLabel component="legend">Payment Method</FormLabel>
		                    <RadioGroup
		                      name="paymentMethod"
		                      value={paymentMethod}
		                      onChange={handlePaymentMethodChange}
		                    >
		                      <FormControlLabel value="Credit Card" control={<Radio />} label="Credit Card" />
		                      <FormControlLabel value="PayPal" control={<Radio />} label="PayPal" />
		                      <FormControlLabel value="Bank Transfer" control={<Radio />} label="Bank Transfer" />
		                    </RadioGroup>
		                  </FormControl>
		                  
		                  {paymentMethod === 'Credit Card' && (
		                    <Grid container spacing={2}>
		                      <Grid item xs={12}>
		                        <TextField
		                          required
		                          fullWidth
		                          label="Card Number"
		                          name="cardNumber"
		                          value={formData.cardNumber}
		                          onChange={handleInputChange}
		                          placeholder="XXXX XXXX XXXX XXXX"
		                        />
		                      </Grid>
		                      <Grid item xs={12} sm={6}>
		                        <TextField
		                          required
		                          fullWidth
		                          label="Expiry Date"
		                          name="expiryDate"
		                          value={formData.expiryDate}
		                          onChange={handleInputChange}
		                          placeholder="MM/YY"
		                        />
		                      </Grid>
		                      <Grid item xs={12} sm={6}>
		                        <TextField
		                          required
		                          fullWidth
		                          label="CVV"
		                          name="cvv"
		                          value={formData.cvv}
		                          onChange={handleInputChange}
		                          placeholder="XXX"
		                        />
		                      </Grid>
		                    </Grid>
		                  )}
		                </Paper>
		              </Grid>
		              
		              {/* Order Summary */}
		              <Grid item xs={12} md={4}>
		                <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
		                  <Typography variant="h6" sx={{ mb: 2 }}>Order Summary</Typography>
		                  
		                  {cart.items.map((item, index) => (
		                    <Box key={index} sx={{ mb: 2 }}>
		                      <Grid container spacing={1}>
		                        <Grid item xs={8}>
		                          <Typography variant="body2">
		                            {item.vehicle?.model} ({item.quantity})
		                          </Typography>
		                        </Grid>
		                        <Grid item xs={4} sx={{ textAlign: 'right' }}>
		                          <Typography variant="body2">
		                            ${(item.vehicle?.price * item.quantity).toLocaleString()}
		                          </Typography>
		                        </Grid>
		                      </Grid>
		                    </Box>
		                  ))}
		                  
		                  <Divider sx={{ my: 2 }} />
		                  
		                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
		                    <Typography>Subtotal</Typography>
		                    <Typography>${totalAmount.toLocaleString()}</Typography>
		                  </Box>
		                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
		                    <Typography>Shipping</Typography>
		                    <Typography>Free</Typography>
		                  </Box>
		                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
		                    <Typography>Tax (8%)</Typography>
		                    <Typography>${(totalAmount * 0.08).toFixed(2)}</Typography>
		                  </Box>
		                  
		                  <Divider sx={{ my: 2 }} />
		                  
		                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
		                    <Typography variant="h6">Total</Typography>
		                    <Typography variant="h6">
		                      ${(totalAmount * 1.08).toFixed(2)}
		                    </Typography>
		                  </Box>
		                  
		                  <Button 
		                    variant="contained" 
		                    color="primary" 
		                    fullWidth 
		                    size="large"
		                    type="submit"
		                    sx={{ mb: 2 }}
		                  >
		                    Place Order
		                  </Button>
		                  
		                  <Button 
		                    variant="outlined" 
		                    fullWidth
		                    onClick={handleBackToCart}
		                  >
		                    Back to Cart
		                  </Button>
		                </Paper>
		              </Grid>
		            </Grid>
		          </form>
		        </Box>
		      </>
		    );
		  };

		  export default Checkout;