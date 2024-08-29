# Django eCommerce Application

A comprehensive eCommerce application built with Django and PostgreSQL, designed to manage online store operations efficiently. It features a PostgreSQL database and integrates with Cloudinary for media storage. The application follows a modular architecture for clear and maintainable code organization.

## Core Features

The application provides CRUD operations for managing various entities within the system:

- **Products**: Manage product listings, categories, and images.
- **Users**: Register, authenticate, and manage user profiles.
- **Orders**: Handle customer orders and track order status.
- **Order Items**: Manage individual items within each order.
- **Payments**: Store and manage user payment details.
- **User Addresses**: Manage shipping and billing addresses for users.

### Additional Features

- **User Registration and Authentication**: Secure login and registration functionality with JWT authentication.
- **API Documentation**: Auto-generated API documentation using DRF Spectacular.
- **Media Storage**: Integration with Cloudinary for handling product images and other media.
- **CORS Support**: Handle cross-origin requests using `corsheaders`.
- **Dockerization**: The application is Dockerized for consistent local development and production environments.

## Technologies Used

- **Django**: Core framework for building the application.
- **Django REST Framework (DRF)**: Toolkit for building Web APIs.
- **rest_framework_simplejwt**: JSON Web Token authentication for DRF.
- **corsheaders**: Middleware for handling Cross-Origin Resource Sharing (CORS).
- **drf_spectacular**: Tool for generating OpenAPI 3.0 schemas for DRF.
- **cloudinary**: Cloud-based media management and image optimization.
- **cloudinary_storage**: Django storage backend for Cloudinary.
- **PostgreSQL**: Relational database for storing application data.
- **Docker**: Containerization of the application to ensure a consistent environment in both development and production.

## ER Diagram
Here is the Entity-Relationship diagram of the DataBase

![ER-Diagram](https://raw.githubusercontent.com/ChristianDev47/E-commerce/refs/heads/master/Backend/doc/database/ER_Diagram.png)