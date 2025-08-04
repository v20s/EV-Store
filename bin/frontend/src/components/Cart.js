import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Paper, Grid, Divider, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Header, CheckoutButton } from './SharedComponents';

const Cart = () => {
  const [cart, setCart] = useState({ items: [] });
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null); // State to store user_id
  const navigate = useNavigate();

  // Get JWT token from local storage
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      alert('Please log in to view your cart.');
      navigate('/login'); // Redirect to the login page
      return;
    }

    fetchCart();
    fetchUserId(); // Fetch user_id when the component mounts
  }, [token]);

  const fetchUserId = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/users/id', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserId(response.data.user_id); // Set user_id from the response
    } catch (error) {
      console.error('Error fetching user ID:', error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  const fetchCart = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:8080/api/cart/my-cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let total = 0;

      if (data.items && data.items.length > 0) {
        // Fetch vehicle details in parallel
        const vehiclePromises = data.items.map(item =>
          axios.get(`http://localhost:8080/api/vehicles/${item.vehicleId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        );

        const vehicleResponses = await Promise.all(vehiclePromises);

        vehicleResponses.forEach((res, index) => {
          const vehicle = res.data;
          data.items[index].vehicle = vehicle;
		  total += data.items[index].price * data.items[index].quantity;
        });
      }

      setCart(data);
      setTotalAmount(total);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setLoading(false);

      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };


  const handleRemoveItem = async (cartItemId) => {
    try {
      await axios.delete(`http://localhost:8080/api/cart/remove-item/${cartItemId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCart();
    } catch (error) {
      console.error('Error removing item from cart:', error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };


  const handleClearCart = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/cart/clear`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCart(); // Refresh cart after clearing
    } catch (error) {
      console.error('Error clearing cart:', error);

      // Redirect to login if the token is invalid or expired
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', p: 4 }}>
        <Typography variant="h5">Loading your cart...</Typography>
      </Box>
    );
  }

  return (
    <>
      <Header />
      <Box sx={{ maxWidth: 1200, margin: '0 auto', p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          <ShoppingCartIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Shopping Cart
        </Typography>

        {cart.items.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Your cart is empty</Typography>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => navigate('/')}
            >
              Continue Shopping
            </Button>
          </Paper>
        ) : (
          <>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Paper sx={{ p: 2 }}>
                  {cart.items.map((item, index) => (
                    <Box key={index}>
                      {index > 0 && <Divider sx={{ my: 2 }} />}
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={3}>
                          {item.vehicle && (
                            <img 
                              src={item.vehicle.cover_image} 
                              alt={item.vehicle.model} 
                              style={{ width: '100%', height: 'auto' }}
                            />
                          )}
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h6">
                            {item.vehicle?.model} - {item.vehicle?.trim}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Paint: {item.vehicle?.paint}, Interior: {item.vehicle?.interior}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Wheels: {item.vehicle?.wheels}
                          </Typography>
                          
                          {/* Display customizations if available */}
                          {item.customizations && (
                            <Box sx={{ mt: 1 }}>
                              <Typography variant="body2" color="text.secondary">
                                Customizations:
                              </Typography>
							  {(() => {
							    let custom = item.customizations;
							    if (typeof custom === "string") {
							      try {
							        custom = JSON.parse(custom);
							      } catch (e) {
							        console.error("Failed to parse customizations:", e);
							        custom = {};
							      }
							    }
							    return (
							      <>
							        {custom.paint && (
							          <Typography variant="body2" color="text.secondary">
							            Paint: {custom.paint}
							          </Typography>
							        )}
							        {custom.tire && (
							          <Typography variant="body2" color="text.secondary">
							            Tires: {custom.tire}
							          </Typography>
							        )}
							      </>
							    );
							  })()}

                            </Box>
                          )}
                        </Grid>
                        <Grid item xs={2} sx={{ textAlign: 'right' }}>
						<Typography variant="h6">
						  ${item.price?.toLocaleString()}
						</Typography>

                          <Typography variant="body2">
                            Qty: {item.quantity}
                          </Typography>
                        </Grid>
                        <Grid item xs={1} sx={{ textAlign: 'right' }}>
                          <IconButton 
                            color="error" 
                            onClick={() => handleRemoveItem(item.cartItemId)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Box>
                  ))}
                </Paper>
                <Box sx={{ mt: 2, textAlign: 'right' }}>
                  <Button 
                    variant="outlined" 
                    color="error" 
                    onClick={handleClearCart}
                    sx={{ mr: 2 }}
                  >
                    Clear Cart
                  </Button>
                  <Button 
                    variant="outlined" 
                    onClick={() => navigate('/')}
                  >
                    Continue Shopping
                  </Button>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Order Summary</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Subtotal ({cart.items.length} items)</Typography>
                    <Typography>${totalAmount.toLocaleString()}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Shipping</Typography>
                    <Typography>Free</Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h6">Total</Typography>
                    <Typography variant="h6">${totalAmount.toLocaleString()}</Typography>
                  </Box>
                  {userId && <CheckoutButton userId={userId} />} {/* Render CheckoutButton only if userId is available */}
				  <Button
				    variant="contained"
				    color="primary"
				    fullWidth
				    sx={{ mt: 2 }}
				    onClick={() => {
						console.log(" cart.items at click time:", cart.items);
				      const vehicles = cart.items.map((item) => ({
				        modelName: item.vehicle.model,
				        color: item.vehicle.paint || "N/A",
				        tire: item.vehicle.wheels || "N/A",
				        carImage: item.vehicle.cover_image || "",
				        price: item.vehicle.price || 0,
				        quantity: item.quantity || 1
				      }));

				      const shippingCost = 4.99;
				      const taxAmount = (totalAmount * 0.13).toFixed(2);
				      const total = (totalAmount * 1.13 + shippingCost).toFixed(2);
					  
					  console.log("Navigating to checkout with vehicles:", cart.items);
					  console.log("Vehicles being passed:", cart.items.map(item => ({
					    modelName: item.vehicle.model,
					    color: item.vehicle.paint || "N/A",
					    tire: item.vehicle.wheels || "N/A",
					    carImage: item.vehicle.cover_image || "",
					    quantity: item.quantity,
					    price: item.vehicle.price
					  })));
					  

					  navigate("/checkout", {
					    state: {
					      vehicles: cart.items.map(item => ({
					        modelName: item.vehicle.model,
							modelName: item.vehicle.model,
							  color: item.customizations?.paint || item.vehicle.paint || "N/A",
							  tire: item.customizations?.tire || item.vehicle.wheels || "N/A",
							  carImage: item.vehicle.cover_image || "",
							  quantity: item.quantity,
							price: item.price || item.vehicle.price 
					      })),
					      promoCode: "",
					    }
				      });
				    }}
				  >
				    Proceed to Payment
				  </Button>

				
                </Paper>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </>
  );
};

export default Cart;