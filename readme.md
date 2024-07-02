#  [Car Wash Booking System](https://car-wash-booking-system-ten.vercel.app/)

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [API Endpoints](#api-endpoints)

## Project Overview

The Car Wash Booking System offers a complete solution for efficiently managing car wash services. Customers can conveniently book car wash appointments online, while administrators have the tools to manage bookings, services, and availability. Developed with Node.js, Express.js, TypeScript, and Mongoose, the system ensures scalability and maintainability, leveraging modern web technologies and essential configurations.

## Features
* Register Users
* Administer Services and Slots (admin only)
* Book Services with Slot Selection
* Modify and Remove Services (admin only)

## Technologies Used

- **Node.js**: JavaScript runtime built on Chrome's V8 engine.
- **Express.js**: Fast and minimalist web framework for Node.js.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript.
- **npm**: Node package manager for dependency management.

## Setup and Installation

Follow these steps to set up and run the project locally:

### Installation and run the application

1. Clone The Repository:
   ```sh
   git https://github.com/binshahed/car-wash-booking-system-server.git
   ```
2. Change Directory
   ```sh
   cd car-wash-booking-system-server 
   ```
3. Install Dependency
   ```sh
   npm install
   ```
4. Run Project
   ```sh
   npm run start:dev
## API Endpoints

### User Routes

1. **User Registration**
   - **Endpoint:** `POST /api/auth/signup`
   - **Description:** Register a new user with personal details and credentials.

2. **User Login**
   - **Endpoint:** `POST /api/auth/login`
   - **Description:** Authenticate an existing user and return a JWT token.

### Service Routes

3. **Create Service (Admin Only)**
   - **Endpoint:** `POST /api/services`
   - **Description:** Add a new car wash service.

4. **Get Service Details**
   - **Endpoint:** `GET /api/services/:id`
   - **Description:** Retrieve details of a specific car wash service.

5. **Get All Services**
   - **Endpoint:** `GET /api/services`
   - **Description:** Retrieve a list of all available car wash services.

6. **Update Service (Admin Only)**
   - **Endpoint:** `PUT /api/services/:id`
   - **Description:** Update details of a specific service.

7. **Delete Service (Admin Only)**
   - **Endpoint:** `DELETE /api/services/:id`
   - **Description:** Soft delete a specific service.

### Slot Routes

8. **Create Slot (Admin Only)**
   - **Endpoint:** `POST /api/services/slots`
   - **Description:** Add new booking slots for a service.

9. **Check Slot Availabilityt**
   - **Endpoint: GET /api/slots/availability
   - **Description: Query available slots with date and serviceId parameters.

### Booking Routes

10. **Book a Service (Only Accessible by User)**
    - **Endpoint:** `POST /api/bookings`
    - **Description:** Book a car wash service.

11. **Get All Bookings (Only Accessible by Admin)**
    - **Endpoint:** `GET /api/bookings`
    - **Description:** Retrieve all bookings.

12. **Get User's Bookings (Only Accessible by User)**
    - **Endpoint:** `GET /api/my-bookings`
    - **Description:** Retrieve bookings made by the authenticated user.
