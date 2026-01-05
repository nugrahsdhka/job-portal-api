# 🚀 Job Portal API (Main Gateway)

> **RESTful Backend API** for a job marketplace platform, built with **Node.js**, **TypeScript**, and **Microservices Architecture**.

![NodeJS](https://img.shields.io/badge/Node.js-20232A?style=for-the-badge\&logo=node.js\&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge\&logo=typescript\&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge\&logo=Prisma\&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge\&logo=mysql\&logoColor=white)
![RabbitMQ](https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge\&logo=rabbitmq\&logoColor=white)

---

## 📖 About the Project

This project acts as the **Main API Gateway** for the Job Portal system. It handles:

* User Authentication & Authorization
* Job Posting & Application Management
* Data Persistence (MySQL)
* **Event Publishing** to background workers via RabbitMQ

Unlike a traditional monolith, this API **offloads heavy tasks** (such as sending emails) to a separate **Go microservice**, ensuring the main application remains fast and non-blocking.

---

## 🔗 Microservices Ecosystem

This repository is part of a larger system:

* 🟢 **Producer (This Repo)**: Node.js API (handles HTTP requests and publishes events)
* 🔵 **Consumer (Worker)**: **Go Notification Service** – processes background tasks (email notifications)

---

## 🏗️ System Architecture

The system follows an **Event-Driven Architecture** for handling notifications.

```mermaid
graph TD
    User[👤 Client / Postman] -->|HTTP POST /apply| API[🟢 Node.js API]
    API -->|Save Data| DB[(🗄️ MySQL)]
    API -->|Publish Event| MQ[🟠 RabbitMQ]
    MQ -->|Consume Message| Go[🔵 Go Worker Service]
    Go -->|Send Email| SMTP[📧 Mailtrap / SMTP]
```

---

## ✨ Key Features

### 🔐 Authentication & Security

* JWT-based authentication
* Password hashing with Bcrypt
* Role-Based Access Control (RBAC): **EMPLOYER** vs **APPLICANT**

### 💼 Core Business Logic

* Many-to-Many relationship between Users and Jobs
* Validation to prevent duplicate job applications
* Ownership checks: only job owners can view applicants

### ⚡ Performance & Scalability

* Asynchronous processing using RabbitMQ
* Non-blocking notification handling
* Layered architecture (Controller → Service → Repository)

---

## 🛠️ Tech Stack

| Component      | Technology               |
| -------------- | ------------------------ |
| Runtime        | Node.js                  |
| Language       | TypeScript (Strict Mode) |
| Framework      | Express.js               |
| Database       | MySQL                    |
| ORM            | Prisma                   |
| Message Broker | RabbitMQ (amqplib)       |
| Authentication | JWT + Bcrypt             |

---

## 📂 Project Structure

```plaintext
src/
├── config/             # Environment configuration
├── controllers/        # HTTP request handlers
│   ├── authController.ts
│   └── jobController.ts
├── services/           # Business logic layer
│   ├── authService.ts
│   ├── jobService.ts
│   ├── applicationService.ts
│   └── notificationService.ts  # RabbitMQ producer
├── middlewares/        # Authentication & validation
│   └── authMiddleware.ts
├── routes/             # API routes
│   ├── authRoutes.ts
│   └── jobRoutes.ts
└── server.ts           # Application entry point
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js v16+
* MySQL Database
* RabbitMQ Server (Local or CloudAMQP)

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/nugrahsdhka/job-portal-api.git
cd job-portal-api
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
DATABASE_URL="mysql://root:@localhost:3306/job_portal_db"
JWT_SECRET="your_secret_key"

# RabbitMQ Connection
RABBITMQ_URL="amqps://user:pass@host/vhost"
```

---

### 4️⃣ Database Setup

```bash
npx prisma db push
```

---

### 5️⃣ Run the Server

```bash
npm run dev
```

---

## 🔌 API Endpoints

### 👤 Authentication

| Method | Endpoint             | Description              | Auth |
| ------ | -------------------- | ------------------------ | ---- |
| POST   | `/api/auth/register` | Register new user        | ❌    |
| POST   | `/api/auth/login`    | Login & get JWT          | ❌    |
| GET    | `/api/auth/profile`  | Get current user profile | ✅    |

### 💼 Jobs & Applications

| Method | Endpoint                   | Description                         | Auth         |
| ------ | -------------------------- | ----------------------------------- | ------------ |
| GET    | `/api/jobs`                | Get all jobs                        | ❌            |
| POST   | `/api/jobs`                | Create a new job                    | ✅ (Employer) |
| POST   | `/api/jobs/:id/apply`      | Apply to job & trigger notification | ✅            |
| GET    | `/api/jobs/:id/applicants` | View job applicants                 | ✅ (Owner)    |

---

## 🔮 Future Improvements

* [x] Microservices Integration
* [x] Event-Driven Email Notifications
* [ ] CV Upload (File Storage)
* [ ] Unit Testing (Jest)
* [ ] Dockerization (Docker Compose)

---

Built to demonstrate **Polyglot Programming**, **Event-Driven Architecture**, and **Microservices Design Skills**.
