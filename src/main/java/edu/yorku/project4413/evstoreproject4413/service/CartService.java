package edu.yorku.project4413.evstoreproject4413.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;

import edu.yorku.project4413.evstoreproject4413.dto.CartDTO;
import edu.yorku.project4413.evstoreproject4413.dto.CartItemDTO;
import edu.yorku.project4413.evstoreproject4413.model.*;
import edu.yorku.project4413.evstoreproject4413.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CartService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;

    public CartDTO getCart(Long userId) {
        Optional<Cart> cartOptional = cartRepository.findByUser_UserId(userId); 

        if (cartOptional.isPresent()) {
            Cart cart = cartOptional.get();
            List<CartItems> cartItems = cartItemRepository.findByCartCartId(cart.getCartId());

            CartDTO cartDTO = new CartDTO();
            cartDTO.setCartId(cart.getCartId());
            cartDTO.setUserId(cart.getUser().getUserId()); 

            List<CartItemDTO> itemDTOs = cartItems.stream().map(item -> {
            	
                CartItemDTO dto = new CartItemDTO();
                dto.setCartItemId(item.getItemId());  // dynamic item id to delete the added to cart item specefically
                dto.setVehicleId(item.getVehicleId());
                dto.setQuantity(item.getQuantity());
                dto.setCustomizations(item.getCustomizations());
                dto.setPrice(item.getPrice());
                
                return dto;
            }).collect(Collectors.toList());

            cartDTO.setItems(itemDTOs);
            return cartDTO;
        } else {
            // Fetch user entity
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

            Cart newCart = new Cart();
            newCart.setUser(user);  // 
            newCart.setCreatedAt(new Date());
            cartRepository.save(newCart);

            CartDTO cartDTO = new CartDTO();
            cartDTO.setCartId(newCart.getCartId());
            cartDTO.setUserId(newCart.getUser().getUserId());  
            cartDTO.setItems(new ArrayList<>());
            return cartDTO;
        }
    }

    @Transactional
    public CartDTO addToCart(Long userId, CartItemDTO itemDTO) {
        Cart cart = cartRepository.findByUser_UserId(userId) 
                .orElseGet(() -> {
                    User user = userRepository.findById(userId)
                            .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

                    Cart newCart = new Cart();
                    newCart.setUser(user); 
                    newCart.setCreatedAt(new Date());
                    return cartRepository.save(newCart);
                });

        Vehicle vehicle = vehicleRepository.findById(itemDTO.getVehicleId())
                .orElseThrow(() -> new RuntimeException("Vehicle not found with ID: " + itemDTO.getVehicleId()));

        BigDecimal vehiclePrice = vehicle.getPrice();
        if (vehiclePrice == null) {
            throw new RuntimeException("Price not set for vehicle ID: " + itemDTO.getVehicleId());
        }

        CartItems cartItem = new CartItems();
        cartItem.setCart(cart);
        cartItem.setVehicleId(vehicle.getVehicleId());
        cartItem.setQuantity(itemDTO.getQuantity());
        cartItem.setCustomizations(itemDTO.getCustomizations());
        cartItem.setPrice(itemDTO.getPrice()); //  use price sent from frontend
        System.out.println("Saving cart item with price: " + itemDTO.getPrice());

        cartItemRepository.save(cartItem);
        
        return getCart(userId);
    }

    @Transactional
    public CartDTO removeFromCartByItemId(Long userId, Long cartItemId) {
        Optional<Cart> cartOptional = cartRepository.findByUser_UserId(userId);
        if (cartOptional.isPresent()) {
            Cart cart = cartOptional.get();

            CartItems cartItem = cartItemRepository.findById(cartItemId)
                    .orElseThrow(() -> new RuntimeException("Cart item not found"));

            if (!cartItem.getCart().getCartId().equals(cart.getCartId())) {
                throw new RuntimeException("Cart item does not belong to this user's cart.");
            }

            cartItemRepository.deleteById(cartItemId);
            return getCart(userId);
        } else {
            throw new RuntimeException("Cart not found for user ID: " + userId);
        }
    }


    @Transactional
    public void clearCart(Long userId) {
        Optional<Cart> cartOptional = cartRepository.findByUser_UserId(userId); 

        if (cartOptional.isPresent()) {
            Cart cart = cartOptional.get();
            List<CartItems> cartItems = cartItemRepository.findByCartCartId(cart.getCartId());
            cartItemRepository.deleteAll(cartItems);
        } else {
            throw new RuntimeException("Cart not found for user ID: " + userId);
        }
    }

    @Transactional
    public void checkout(Long userId) {
        Optional<Cart> cartOptional = cartRepository.findByUser_UserId(userId); 
        if (cartOptional.isEmpty()) {
            throw new RuntimeException("Cart not found for user ID: " + userId);
        }

        Cart cart = cartOptional.get();
        List<CartItems> cartItems = cartItemRepository.findByCartCartId(cart.getCartId());

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty! Cannot checkout.");
        }

        // Fetch existing user from DB
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        // Calculate total price
        BigDecimal totalAmount = cartItems.stream()
                .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Create Order
        Orders order = new Orders();
        order.setUser(user);
        order.setTotalAmount(totalAmount);
        order.setOrderStatus("Pending");
        order.setPaymentMethod("Credit Card");
        order.setCreatedAt(LocalDateTime.now());

        // Convert Cart Items to Order Items
        List<OrderItems> orderItemList = new ArrayList<>();
        ObjectMapper objectMapper = new ObjectMapper();

        for (CartItems cartItem : cartItems) {
            Vehicle vehicle = vehicleRepository.findById(cartItem.getVehicleId())
                    .orElseThrow(() -> new RuntimeException("Vehicle not found"));

            OrderItems orderItem = new OrderItems();
            orderItem.setOrder(order);
            orderItem.setVehicle(vehicle);
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(cartItem.getPrice());

            try {
                orderItem.setCustomizations(objectMapper.writeValueAsString(
                        cartItem.getCustomizations() != null ? cartItem.getCustomizations() : "{}"
                ));
            } catch (JsonProcessingException e) {
                throw new RuntimeException("Failed to serialize customizations", e);
            }

            orderItemList.add(orderItem);
        }

        // Save order and order items
        order.setOrderItems(orderItemList);
        orderRepository.save(order);

        // Clear cart after checkout
        cartItemRepository.deleteAll(cartItems);
    }
}
