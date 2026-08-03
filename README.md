# 🏥 Hospital Management Microservices

A robust, containerized microservices application for managing hospital authentication, doctor profiles, and appointments. The project is designed with a service-oriented architecture using Node.js, Express, TypeScript, MySQL, and Drizzle ORM, all orchestrated via Docker Compose.

---

## 🏗️ Architecture Overview

The system consists of the following components:

1. **API Gateway (Port 3000)**: The single entry point for all client requests. It handles routing and reverse proxying to downstream microservices and enforces JWT authentication for protected routes.
2. **Auth Service (Port 3001)**: Manages user registration, login, and profile retrieval. It uses JWT for authentication and MySQL for data persistence.
3. **Doctor Service (Port 3002)**: Manages doctor profiles, qualifications, and availability status.
4. **Appointment Service (Port 3003)**: Manages appointment bookings, schedules, updates, and cancellations. It interacts with the Doctor Service and Auth Service to validate doctor and patient details.
5. **Notification Service (Stub)**: Place for future implementation of notification features (currently placeholder).
6. **Databases**:
   - `mysql-auth` (Port 3307): Database for the Auth Service.
   - `mysql-doctor` (Port 3308): Database for the Doctor Service.
   - `mysql-appointment` (Port 3309): Database for the Appointment Service.

---

## 🛠️ Tech Stack

*   **Runtime**: Node.js (v22)
*   **Language**: TypeScript
*   **Web Framework**: Express
*   **Database**: MySQL 8.0
*   **ORM**: Drizzle ORM
*   **Containerization**: Docker & Docker Compose
*   **API Gateway Proxying**: `http-proxy-middleware`

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your machine:
*   [Docker](https://www.docker.com/get-started) (including Docker Compose)
*   [Node.js](https://nodejs.org/) (v22 or later, optional for running locally without Docker)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd hospital-microservices
   ```

2. **Environment Variables:**
   Ensure each microservice has its `.env` file configured. The repository includes default configurations suitable for Docker Compose:
   *   **API Gateway**: `api-gateway/.env`
   *   **Auth Service**: `auth-service/.env`
   *   **Doctor Service**: `doctor-service/.env`
   *   **Appointment Service**: `appointment-service/.env`

3. **Build and Run with Docker Compose:**
   Run the following command in the root directory to spin up all services and MySQL databases:
   ```bash
   docker-compose up --build
   ```

4. **Initialize Databases (Migrations/Schema Push):**
   To push the database schema using Drizzle ORM, run the following commands for each respective service (run locally or within the container context):
   ```bash
   # For Auth Service
   cd auth-service && npm run push
   
   # For Doctor Service
   cd ../doctor-service && npm run push
   
   # For Appointment Service
   cd ../appointment-service && npm run push
   ```

---

## 🔌 API Endpoints Reference

All client interactions should go through the **API Gateway** (`http://localhost:3000`).

### 🔑 Authentication (`/api/auth`)

| Method | Endpoint | Description | Auth Required | Request Body |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Register a new user | No | `{ "name": "...", "email": "...", "password": "..." }` |
| **POST** | `/api/auth/login` | Authenticate and obtain JWT | No | `{ "email": "...", "password": "..." }` |
| **GET** | `/api/auth/profile` | Retrieve the authenticated user's profile | Yes (Bearer Token) | None |

### 🥼 Doctor Management (`/api/doctors`)

*All doctor service endpoints accessed via the gateway require JWT Authentication.*

| Method | Endpoint | Description | Auth Required | Request Body / Params |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/api/doctors` | Add a new doctor profile | Yes (Bearer Token) | `{ "userId": 1, "specialization": "...", "experience": 5, "licenseNumber": "..." }` |
| **GET** | `/api/doctors` | Retrieve all doctors | Yes (Bearer Token) | None |
| **GET** | `/api/doctors/:id` | Retrieve a specific doctor by ID | Yes (Bearer Token) | `id` (URL Parameter) |
| **DELETE**| `/api/doctors/:id` | Remove a doctor profile | Yes (Bearer Token) | `id` (URL Parameter) |

### 📅 Appointment Management (`/api/appointments`)

| Method | Endpoint | Description | Auth Required | Request Body / Params |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/api/appointments` | Book a new appointment | No | `{ "patientId": 1, "doctorId": 2, "appointmentDate": "YYYY-MM-DD..." }` |
| **GET** | `/api/appointments` | Retrieve all appointments | No | None |
| **GET** | `/api/appointments/:id` | Retrieve an appointment by ID | No | `id` (URL Parameter) |
| **PUT** | `/api/appointments/:id` | Update appointment details | No | `{ "appointmentDate": "..." }` |
| **DELETE**| `/api/appointments/:id` | Cancel/delete an appointment | No | `id` (URL Parameter) |

---

## 🗄️ Database Schemas

### Users Table (`auth_db`)
*   `id`: Integer (Auto-increment, Primary Key)
*   `name`: Varchar(100) (Not Null)
*   `email`: Varchar(255) (Unique, Not Null)
*   `password`: Varchar(255) (Not Null)
*   `created_at`: Timestamp (Default Now)

### Doctors Table (`doctor_db`)
*   `id`: Integer (Auto-increment, Primary Key)
*   `user_id`: Integer (Not Null)
*   `specialization`: Varchar(100) (Not Null)
*   `experience`: Integer (Not Null)
*   `license_number`: Varchar(50) (Not Null)
*   `is_available`: Boolean (Default True)
*   `created_at`: Timestamp (Default Now)
*   `updated_at`: Timestamp (Default Now)

### Appointments Table (`appointment_db`)
*   `id`: Integer (Auto-increment, Primary Key)
*   `patient_id`: Integer (Not Null)
*   `doctor_id`: Integer (Not Null)
*   `appointment_date`: Timestamp (Not Null)
*   `status`: Enum('BOOKED', 'CANCELLED') (Default 'BOOKED')
*   `created_at`: Timestamp (Default Now)
*   `updated_at`: Timestamp (Default Now, On Update Now)

---

## 🪵 Project Structure

```text
hospital-microservices/
├── api-gateway/            # API Gateway routing requests to downstream microservices
├── auth-service/           # User authentication and registration service
├── doctor-service/         # Doctor profiling and management service
├── appointment-service/    # Booking management service
├── notification-service/   # Placeholder notification service
├── docker-compose.yml      # Orchestrates microservices and DB containers
├── package.json            # Root level dependency definition
└── README.md               # Project documentation
```

---

## 🔍 Troubleshooting

*   **API 404 Errors on Gateway**: Ensure path rewrites on the API gateway correspond correctly to how the target microservice exposes its routes. For instance, if `auth-service` mounts routes directly on `/` (e.g. `/login`), the API Gateway must strip or rewrite `/api/auth` correctly when forwarding.
*   **Database connection issues**: Ensure that MySQL containers are fully initialized and healthy before the services attempt to query them. The services depend on MySQL containers using the `depends_on` flag in docker-compose.
