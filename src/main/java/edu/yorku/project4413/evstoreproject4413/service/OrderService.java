package edu.yorku.project4413.evstoreproject4413.service;
import java.math.BigDecimal;


import com.fasterxml.jackson.databind.ObjectMapper;
import edu.yorku.project4413.evstoreproject4413.dto.CartDTO;
import edu.yorku.project4413.evstoreproject4413.dto.CartItemDTO;
import edu.yorku.project4413.evstoreproject4413.dto.CheckoutDTO;
import edu.yorku.project4413.evstoreproject4413.dto.OrderDTO;
import edu.yorku.project4413.evstoreproject4413.dto.OrderItemDTO;
import edu.yorku.project4413.evstoreproject4413.model.Orders;
import edu.yorku.project4413.evstoreproject4413.model.OrderItems;
import edu.yorku.project4413.evstoreproject4413.model.Vehicle;
import edu.yorku.project4413.evstoreproject4413.repository.OrderItemRepository;
import edu.yorku.project4413.evstoreproject4413.repository.OrderRepository;
import edu.yorku.project4413.evstoreproject4413.repository.UserRepository;
import edu.yorku.project4413.evstoreproject4413.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import edu.yorku.project4413.evstoreproject4413.model.User;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private CartService cartService;
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;  // For JSON conversion

    
    public List<OrderDTO> getUserOrders(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        List<Orders> orders = orderRepository.findByUser_UserId(user.getUserId());


        return orders.stream().map(order -> {
            OrderDTO orderDTO = new OrderDTO();
            orderDTO.setOrderId(order.getOrderId());
            orderDTO.setUserId(order.getUser().getUserId());
            orderDTO.setTotalAmount(order.getTotalAmount());
            orderDTO.setOrderStatus(order.getOrderStatus());
            orderDTO.setPaymentMethod(order.getPaymentMethod());

            // Convert OrderItems to DTO
            List<OrderItemDTO> items = order.getOrderItems().stream().map(item -> {
                OrderItemDTO itemDTO = new OrderItemDTO();
                itemDTO.setVehicleId(item.getVehicle().getVehicleId());
                itemDTO.setQuantity(item.getQuantity());
                itemDTO.setPrice(item.getPrice());

                // Convert JSON String to Object
                try {
                    itemDTO.setCustomizations(objectMapper.readTree(item.getCustomizations()).toString());
                } catch (Exception e) {
                    itemDTO.setCustomizations("{}");  // Default empty JSON
                }

                return itemDTO;
            }).collect(Collectors.toList());

            orderDTO.setItems(items);
            return orderDTO;
        }).collect(Collectors.toList());
    }
    
    @Transactional
    public void completeCheckout(User user, double totalAmount, double taxAmount, double shippingCost, List<CartItemDTO> items) {
        Orders order = new Orders();
        order.setUser(user);
        order.setTotalAmount(BigDecimal.valueOf(totalAmount));
        order.setOrderStatus("Pending");
        order.setPaymentMethod("Card");
        order.setCreatedAt(LocalDateTime.now());

        orderRepository.save(order);

        List<OrderItems> orderItems = items.stream().map(item -> {
            Vehicle vehicle = vehicleRepository.findById(item.getVehicleId())
                    .orElseThrow(() -> new RuntimeException("Vehicle not found with ID: " + item.getVehicleId()));

            OrderItems orderItem = new OrderItems();
            orderItem.setVehicle(vehicle);
            orderItem.setQuantity(item.getQuantity());
            orderItem.setPrice(item.getPrice());

            try {
                Map<String, Object> fullCustomizations = item.getCustomizations();
                fullCustomizations.put("taxAmount", taxAmount);
                fullCustomizations.put("shippingCost", shippingCost);

                String customizations = objectMapper.writeValueAsString(fullCustomizations);
                orderItem.setCustomizations(customizations);
            } catch (Exception e) {
                orderItem.setCustomizations("{}");
            }

            orderItem.setOrder(order);
            return orderItem;
        }).collect(Collectors.toList());

        order.setOrderItems(orderItems);
        orderItemRepository.saveAll(orderItems);

        cartService.clearCart(user.getUserId());
    }





    
    @Transactional
    public OrderDTO checkout(CheckoutDTO checkoutDTO) {
        Long userId = checkoutDTO.getUserId();
        String paymentMethod = checkoutDTO.getPaymentMethod();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        CartDTO cartDTO = cartService.getCart(userId);
        if (cartDTO.getItems() == null || cartDTO.getItems().isEmpty()) {
            throw new RuntimeException("Cannot checkout with an empty cart.");
        }

        BigDecimal totalAmount = cartDTO.getItems().stream()
                .map(item -> {
                    Vehicle vehicle = vehicleRepository.findById(item.getVehicleId())
                            .orElseThrow(() -> new RuntimeException("Vehicle not found with ID: " + item.getVehicleId()));
                    return vehicle.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
                })
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Create and Save Order First
        Orders order = new Orders();
        order.setUser(user);
        order.setTotalAmount(totalAmount);
        order.setOrderStatus("Pending");
        order.setPaymentMethod(paymentMethod);
        order.setCreatedAt(LocalDateTime.now());
        orderRepository.save(order);

        // Convert Cart Items to Order Items
        List<OrderItems> orderItems = cartDTO.getItems().stream().map(item -> {
            Vehicle vehicle = vehicleRepository.findById(item.getVehicleId())
                    .orElseThrow(() -> new RuntimeException("Vehicle not found with ID: " + item.getVehicleId()));

            OrderItems orderItem = new OrderItems();
            orderItem.setVehicle(vehicle);
            orderItem.setQuantity(item.getQuantity());
            orderItem.setPrice(vehicle.getPrice());

            // Convert Map to JSON String before saving
            try {
                String customizations = objectMapper.writeValueAsString(item.getCustomizations());
                orderItem.setCustomizations(customizations);
            } catch (Exception e) {
                orderItem.setCustomizations("{}");  // Default empty JSON
            }

            orderItem.setOrder(order);
            return orderItem;
        }).collect(Collectors.toList());

        order.setOrderItems(orderItems);
        orderItemRepository.saveAll(orderItems);

        // Clear the cart
        cartService.clearCart(userId);

        // Create response DTO
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setOrderId(order.getOrderId());
        orderDTO.setUserId(order.getUser().getUserId());
        orderDTO.setTotalAmount(order.getTotalAmount());
        orderDTO.setOrderStatus(order.getOrderStatus());
        orderDTO.setPaymentMethod(order.getPaymentMethod());

        orderDTO.setItems(orderItems.stream().map(item -> {
            OrderItemDTO itemDTO = new OrderItemDTO();
            itemDTO.setVehicleId(item.getVehicle().getVehicleId());
            itemDTO.setQuantity(item.getQuantity());
            itemDTO.setPrice(item.getPrice());

            // Deserialize JSON to String for DTO
            try {
                itemDTO.setCustomizations(objectMapper.readTree(item.getCustomizations()).toString());
            } catch (Exception e) {
                itemDTO.setCustomizations("{}");
            }

            return itemDTO;
        }).collect(Collectors.toList()));

        return orderDTO;
    }
}
