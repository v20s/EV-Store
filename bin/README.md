# evstoreproject4413

This is a Spring Boot-based e-commerce project. Follow the steps below to set up and run the project locally.

---

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Java Development Kit (JDK)**: Version 11 or higher.
2. **Eclipse IDE**: Latest version with Spring Tool Suite (STS) plugin installed.
3. **MySQL Workbench**: For database management.
4. **Maven**: For dependency management (usually comes with Eclipse).

---

## Installation

### 1. Install Java Development Kit (JDK)

1. Download and install the latest JDK from [Oracle](https://www.oracle.com/java/technologies/javase-downloads.html) or [OpenJDK](https://openjdk.org/).
2. Set the `JAVA_HOME` environment variable to point to your JDK installation directory.

### 2. Install Eclipse IDE with Spring Tool Suite (STS)

1. Download and install Eclipse IDE from [https://www.eclipse.org/downloads/](https://www.eclipse.org/downloads/).
2. Install the Spring Tool Suite (STS) plugin:
   - Open Eclipse.
   - Go to **Help → Eclipse Marketplace**.
   - Search for "Spring Tool Suite" and install the plugin.

### 3. Install MySQL Workbench

1. Download and install MySQL Workbench from [https://dev.mysql.com/downloads/workbench/](https://dev.mysql.com/downloads/workbench/).
2. Set up a MySQL server if you don’t already have one running.

---

## Project Setup

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/awsaf11/evstoreproject4413.git


### 2. Import the Project into Eclipse
Open Eclipse IDE.

Go to File → Import.

Select Maven → Existing Maven Projects and click Next.

Browse to the cloned repository folder (evstoreproject4413) and select the pom.xml file.

Click Finish to import the project.

Database Setup
1. Create a Database
Open MySQL Workbench and connect to your local MySQL server.

Create a new database:

sql
Copy
CREATE DATABASE evstore;
2. Update Database Configuration
Open the application.properties file in your project (located in src/main/resources).

Update the following properties with your MySQL credentials:

properties
Copy
spring.datasource.url=jdbc:mysql://localhost:3306/evstore
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password
spring.jpa.hibernate.ddl-auto=update
Replace your_mysql_username and your_mysql_password with your MySQL credentials.

Running the Project
1. Install Dependencies
Right-click on the project in Eclipse.

Select Maven → Update Project.

Ensure all dependencies are downloaded.

2. Launch the Application
Navigate to the main application class (usually located in src/main/java/com/example/evstoreproject4413/EvstoreProject4413Application.java).

Right-click on the class and select Run As → Java Application.
