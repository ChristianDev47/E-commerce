# Fullstack E-Commerce Application

This project is a fully self-designed and implemented full-stack application for managing online e-commerce activities. It encompasses both a backend API and a frontend interface, each built with modern technologies to create a robust, scalable, and user-friendly system.

## Project Overview

The system consists of two main components:

1. **Backend - E-Commerce API**:
   - Implemented with **Django** and **Django REST Framework (DRF)**, this RESTful API handles server-side operations, including request processing, data management, and database interactions.
   - The application is built using a modular approach with **Django apps**, allowing the functionalities to be divided into independent and reusable components, facilitating maintenance and scalability.
   - It utilizes a **PostgreSQL** database for data storage, ensuring integrity and efficiency in query operations.
   - The API is developed following REST principles, meaning that each endpoint is assigned to a specific operation (such as retrieving, creating, updating, or deleting resources) and uses HTTP methods (GET, POST, PUT, DELETE) to interact with the data.
   - It offers CRUD operations for managing users, products, categories, orders, and more, along with user authentication and authorization features, using **JSON Web Tokens (JWT)** for secure communication.
   
   For detailed information on the backend, including setup and technologies used, refer to the [E-Commerce API Documentation](https://github.com/ChristianDev47/E-commerce/blob/master/Backend/README.md).

2. **Frontend - E-Commerce Frontend**:
   - Built with **React** and **TypeScript**, the frontend provides a responsive and dynamic user interface.
   - It includes functionalities such as user registration, login, product browsing, cart management, and profile updates.
   - The frontend utilizes **Tailwind CSS** for styling, **React Hook Form** for form handling, and **Zod** for data validation.
   - It integrates seamlessly with the backend API to fetch and manipulate data in real-time.

   For more details on the frontend, including setup instructions and technologies used, check out the [E-Commerce Frontend Documentation](https://github.com/ChristianDev47/E-commerce/blob/master/Frontend/README.md).

## Core Features

- **User Authentication**: Secure user registration, login, and logout managed through the backend API.
- **Product Management**: Browse products, view detailed product information, and add items to the cart.
- **Cart Management**: Manage cart items including adding, removing, and adjusting quantities.
- **Order Management**: Review cart contents, proceed to checkout, and complete purchases.
- **Profile Management**: Update user profile information, manage addresses, and view order history.
- **Responsive Design**: Ensures a seamless user experience across all device types, from desktops to mobile phones.
- **Real-Time Notifications**: Provides feedback on actions such as adding items to the cart or updating profiles.
- **API Documentation and Testing**: Comprehensive API documentation and integration tests for backend reliability.
- **Dockerization**: Both frontend and backend are containerized using Docker for consistent development and production environments.

## Technologies Used

### Backend:
- **Django**: Core framework for building the application.
- **Django REST Framework (DRF)**: Toolkit for building web APIs.
- **PostgreSQL**: Relational database for storing persistent data.
- **Cloudinary**: Media management and optimization service.
- **rest_framework_simplejwt**: JWT authentication for secure user management.
- **corsheaders**: Middleware for handling cross-origin requests.
- **drf_spectacular**: Tool for generating OpenAPI schemas for DRF.
- **Docker**: Containerization for consistent development and production environments.


### Frontend:
- **React**: Core library for building the user interface.
- **TypeScript**: Enhances code quality and maintainability with static typing.
- **Tailwind CSS**: Utility-first CSS framework for efficient styling.
- **React Hook Form**: Simplifies form handling and validation.
- **Zod**: Schema validation library for ensuring data integrity.
- **React Hot Toast**: Provides real-time notifications and feedback to users.
- **Owl Carousel**: Touch-friendly carousel for displaying product images.
- **react-inner-image-zoom**: Allows image zoom functionality for better product views.

## Project Structure

- **Backend**: Manages all server-side logic, including API endpoints, database operations, and authentication.
- **Frontend**: Provides a dynamic, responsive user interface, interacting with the backend API to display and manage data.

Each component of the project is modular, facilitating easy maintenance, scaling, and future enhancements.

This project demonstrates a comprehensive full-stack approach to building a modern e-commerce application, utilizing some of the most effective tools and frameworks in web development.


## Demo

You can see the application in action here: [Ecomtren Live Demo](https://e-commerce-nine-ebon.vercel.app/).

![Ecomtren](https://raw.githubusercontent.com/ChristianDev47/E-commerce/refs/heads/master/Frontend/public/images/ecomtren.webp)

