# 🚗 EV Store Project 4413

[![Spring Boot](https://img.shields.io/badge/Backend-Spring%20Boot-brightgreen)](https://spring.io/projects/spring-boot)  
[![React](https://img.shields.io/badge/Frontend-React-blue)](https://reactjs.org/)  
[![Database: MySQL](https://img.shields.io/badge/Database-MySQL-blueviolet)](https://www.mysql.com/)  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)  

> This is a full-stack e-commerce application built using Spring Boot for the backend and React.js for the frontend. It allows users to browse and purchase electric vehicle-related products. The backend communicates with a MySQL database, and the project is structured for easy development using Maven and Eclipse (with Spring Tool Suite).

---

## 🖼️ UI Preview

| Image | Description |
|:----:|:------------|
| <img src="Overview/assests/Homepage.png" alt="Homepage" width="300"/> | Modern EV-themed homepage with login, signup, and guest browse. |
| <img src="Overview/assests/RegisterationInterface.png" alt="Registration Interface" width="300"/> | Secure sign-up form for personal details with a back-to-login link. |
| <img src="Overview/assests/VehicleCatalogue.png" alt="Vehicle Catalog" width="300"/> | Catalog view with filters and neatly organized vehicle cards. |
| <img src="Overview/assests/VehiclePage.png" alt="Vehicle Page" width="300"/> | Detailed vehicle page with specs, customization, and chatbot. |
| <img src="Overview/assests/FeatureDetails.png" alt="Features Details Button" width="300"/> | Button that pops up detailed specs for the selected model. |
| <img src="Overview/assests/CompareVehicles.png" alt="Compare Vehicles" width="300"/> | Comparison modal highlighting differences between models. |
| <img src="Overview/assests/Review.png" alt="Review Submission Popup" width="300"/> | Popup for submitting and reading customer reviews. |
| <img src="Overview/assests/Payment.png" alt="Payment Page" width="300"/> | Clean checkout form for secure credit-card payments. |
| <img src="Overview/assests/Cart.png" alt="Cart Page" width="300"/> | Cart overview with item summary and quick actions. |
| <img src="Overview/assests/Checkout.png" alt="Checkout Page" width="300"/> | Form for shipping details with order summary sidebar. |
| <img src="Overview/assests/Confrimation.png" alt="Order Confirmation Page" width="300"/> | Simple confirmation screen with next-step instructions. |
| <img src="Overview/assests/PersonalInfo.png" alt="Profile Settings Page" width="300"/> | User profile settings for personal info and password. |
| <img src="Overview/assests/OrderHistory.png" alt="Order History Page" width="300"/> | History page showing a breakdown of past orders. |
| <img src="Overview/assests/AdminDashboard.png" alt="Admin Dashboard" width="300"/> | Admin control center for reports, orders, users, and vehicles. |

---

## ✨ Features

<details>
<summary>🔑 Authentication & Security</summary>

- User registration & login with JWT-based RBAC  
- BCrypt password hashing & HTTPS-only communication :contentReference[oaicite:12]{index=12}  
</details>

<details>
<summary>🚗 Vehicle Catalog</summary>

- Browse, filter, sort, and compare electric vehicles  
- “Hot Deals” highlights and 360°/zoom features :contentReference[oaicite:13]{index=13}  
</details>

<details>
<summary>🛒 Shopping Cart & Checkout</summary>

- Add, update, remove items; dynamic price updates  
- Secure credit-card checkout flow :contentReference[oaicite:14]{index=14}  
</details>

<details>
<summary>💸 Loan Calculator</summary>

- Province-specific tax & financing estimator  
- Monthly/biweekly/weekly breakdown :contentReference[oaicite:15]{index=15}  
</details>

<details>
<summary>💬 Real-Time Chatbot</summary>

- In-app support bot for vehicle specs & order help :contentReference[oaicite:16]{index=16}  
</details>

<details>
<summary>✍️ Reviews & Ratings</summary>

- Submit and view customer reviews & star ratings :contentReference[oaicite:17]{index=17}  
</details>

<details>
<summary>📊 Admin Dashboard</summary>

- Manage vehicles, orders, users & generate sales reports :contentReference[oaicite:18]{index=18}  
</details>

---

## 🛠️ Tech Stack

<details>
<summary>Backend</summary>

- Java 11+, Spring Boot, Spring Security, Spring Data JPA  
- MySQL, Redis caching  
</details>

<details>
<summary>Frontend</summary>

- React.js (Hooks), Axios for API calls  
- Plain CSS for responsive design  
</details>

<details>
<summary>Infrastructure</summary>

- Docker & Docker Compose  
- AWS (ECS/Elastic Beanstalk, RDS, S3 + CloudFront)  
- GitHub Actions CI/CD  
</details>

---

## ⚙️ Installation & Setup

### 🔧 Prerequisites
- **Java 11+** & **Maven**  
- **Eclipse IDE** (or IntelliJ) with **Spring Tool Suite** plugin  
  1. In Eclipse: _Help → Eclipse Marketplace…_  
  2. Search **Spring Tool Suite** and install the plugin.  
- **MySQL Server** & **MySQL Workbench**  
  - Download Workbench: https://dev.mysql.com/downloads/workbench/  
- **Node.js** & **npm**  
- **Git**

---

### 🏗️ Backend (Spring Boot)

1. **Clone the repository**  
   ```bash
   git clone https://github.com/v20s/EV-Store.git
   cd evstoreproject4413
2. Configure the MySQL database
   ```bash
   CREATE DATABASE evstore;
3. Load the provided dump: https://github.com/v20s/EV-Store/main/Dump20250318.sql
4. Edit src/main/resources/application.properties:
   ```bash
   spring.datasource.url=jdbc:mysql://localhost:3306/evstore
   spring.datasource.username=YOUR_DB_USER
   spring.datasource.password=YOUR_DB_PASS
   spring.jpa.hibernate.ddl-auto=update
5. Run the Spring Boot app
   - Locate EvstoreProject4413Application.java under src/main/java/com/example/evstoreproject4413/
   - Right-click → Run As → Java Application
   - The backend will start at: http://localhost:8080
  
---

### 🌐 Frontend (React)

1. Locate the frontend folder
   ```bash
   cd frontend
2. Install dependencies
   ```bash
   npm install
3. Start the development server
   ```bash
   npm start
4. The UI will be available at http://localhost:3000

---

## 🎬 Live Version - (❗️Temporarily Shut)

▶️ [Visit the Live App](https://evstoreproject4413.com/)

---
   

