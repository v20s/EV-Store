import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Button, 
  Divider, 
  Chip,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Header } from './SharedComponents';

const OrderConfirmation = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { orderId } = useParams();
  const navigate = useNavigate();
  
  // Get user ID from local storage
  const userId = localStorage.getItem('userId') || 1; // Default to 1 for testing

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      
      // Fetch order details
      const { data: orders } = await axios.get(`http://localhost:8080/api/orders/${userId}`);
      
      // Find the specific order
      const currentOrder = orders.find(order => order.orderId.toString() === orderId);
      
      if (!currentOrder) {
        setError('Order not found');
        setLoading(false);
        return;
      }
      
      // Fetch vehicle details for each order item
      for (const item of currentOrder.items) {
        const vehicleResponse = await axios.get(`http://localhost:8080/vehicles/${item.vehicleId}`);
        item.vehicle = vehicleResponse.data;
      }
      
      setOrder(currentOrder);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching order details:', error);
      setError('Failed to fetch order details');
      setLoading(false);
    }
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleViewOrders = () => {
    navigate('/orders');
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', p: 4 }}>
        <Typography variant="h5">Loading order details...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', p: 4 }}>
        <Typography variant="h5" color="error">{error}</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleContinueShopping}
          sx={{ mt: 2 }}
        >
          Continue Shopping
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Header />
      <Box sx={{ maxWidth: 1200, margin: '0 auto', p: 3 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            textAlign: 'center',
            mb: 4
          }}
        >
          <CheckCircleIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
          <Typography variant="h4" sx={{ mb: 1 }}>Order Confirmed!</Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Thank you for your purchase. Your order has been successfully placed.
          </Typography>
          <Chip 
            label={`Order #${order.orderId}`} 
            color="primary" 
            sx={{ fontSize: '1rem', py: 2, px: 1 }} 
          />
        </Paper>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Order Items</Typography>
              
              {order.items.map((item, index) => (
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
                          <pre style={{ fontSize: '0.75rem' }}>
                            {JSON.stringify(JSON.parse(item.customizations), null, 2)}
                          </pre>
                        </Box>
                      )}
                    </Grid>
                    <Grid item xs={3} sx={{ textAlign: 'right' }}>
                      <Typography variant="h6">
                        ${item.price?.toLocaleString()}
                      </Typography>
                      <Typography variant="body2">
                        Qty: {item.quantity}
                      </Typography>
                      <Typography variant="body2">
                        Total: ${(item.price * item.quantity).toLocaleString()}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Order Summary</Typography>
              
              <List disablePadding>
                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Order Number" />
                  <Typography variant="body2">{order.orderId}</Typography>
                </ListItem>
                
                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Order Date" />
                  <Typography variant="body2">
                    {new Date().toLocaleDateString()}
                  </Typography>
                </ListItem>
                
                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Order Status" />
                  <Chip 
                    label={order.orderStatus} 
                    color={order.orderStatus === 'Pending' ? 'warning' : 'success'} 
                    size="small" 
                  />
                </ListItem>
                
                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Payment Method" />
                  <Typography variant="body2">{order.paymentMethod}</Typography>
                </ListItem>
                
                <Divider sx={{ my: 2 }} />
                
                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Subtotal" />
                  <Typography variant="body2">${order.totalAmount.toLocaleString()}</Typography>
                </ListItem>
                
                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Shipping" />
                  <Typography variant="body2">Free</Typography>
                </ListItem>
                
                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Tax" />
                  <Typography variant="body2">Included</Typography>
                </ListItem>
                
                <Divider sx={{ my: 1 }} />
                
                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText primary={<Typography variant="h6">Total</Typography>} />
                  <Typography variant="h6">${order.totalAmount.toLocaleString()}</Typography>
                </ListItem>
              </List>
            </Paper>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button 
                variant="contained"
                color="primary"
                size="large"
                onClick={handleContinueShopping}
                fullWidth
              >
                Continue Shopping
              </Button>
              
              <Button
                variant="outlined"
                onClick={handleViewOrders}
                fullWidth
              >
                View All Orders
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default OrderConfirmation;