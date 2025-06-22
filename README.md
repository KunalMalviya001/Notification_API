# 📬 Notification Feed API

A scalable backend API built with Node.js, Express.js, and MongoDB to handle notifications for user interactions like follows, likes, and comments. Includes authentication, real-time updates with Socket.IO, and a modular RESTful design.

---

## 🚀 Features

### Core Functionality
- 🔐 JWT Authentication (register/login)
- 👥 Follow notifications
- ❤️ Like notifications
- 💬 Comment notifications
- 📰 Notification feed endpoint (most recent first)
- ✅ Mark as read/unread
- 🔁 Pagination support

### Bonus Features
- ⚡ Real-time notifications via Socket.IO
- 📦 Bulk mark all as read
- 🔕 Notification preferences (optional)
- 🔢 Unread notification count
- 🔒 Rate limiting/throttling (optional)

---

## 📂 Project Structure


notification_API_Assignment
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── notificationController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── Notification.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── notificationRoutes.js
│   └── utils/
│       └── generateToken.js
├── .env
├── .gitignore
├── package.json
├── README.md
└── server.js


---

## 🛠️ Tech Stack

- Node.js (v14+)
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Socket.IO for real-time updates
- dotenv for environment config

---

## 🧪 Setup Instructions

### 1. Clone the repo

bash:-

git clone https://github.com/your-username/notification_API_Assignment.git
cd notification_API_Assignment

### 2. Install dependencies

bash :-

npm install

### 3. Create `.env` file

env :-

PORT=5000
MONGO_URI=mongodb://localhost:27017/notification_api
JWT_SECRET=your_jwt_secret


### 4. Run the app

bash :-

npm run dev
# or
npm start

---

## 📫 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a user     |
| POST   | `/api/auth/login`    | Login and get token |

### 🔔 Notification Routes (Protected)

Add `Authorization: Bearer <token>` header.

| Method | Endpoint                          | Description                   |
| ------ | --------------------------------- | ----------------------------- |
| GET    | `/api/notifications`              | Get paginated notifications   |
| PATCH  | `/api/notifications/:id/read`     | Mark one as read              |
| PATCH  | `/api/notifications/read-all`     | Mark all as read              |
| GET    | `/api/notifications/unread-count` | Get unread notification count |

---

## 📦 Real-Time Notifications (Socket.IO)

* Connect to: `ws://localhost:5000`
* Events:

  * `register` (userId) – Register user socket
  * `send-notification` (receiverId, notification) – Push real-time alert
  * `notification` – Server emits this event to clients

---

## 📄 Environment Variables

| Variable     | Description                 |
| ------------ | --------------------------- |
| `PORT`       | Server port (default: 5000) |
| `MONGO_URI`  | MongoDB connection string   |
| `JWT_SECRET` | Secret key for JWT          |

---

## 📬 Sample Postman Collection

A sample collection is available to test the API.

POSTMAN LINK :-  https://.postman.co/workspace/My-Workspace~82b9f799-7c05-41f6-8e56-035bc1d77b95/collection/36549778-58c7e330-7399-4192-bc43-ad358c1e4b92?action=share&creator=36549778

To use:

* Open Postman
* Click **Import**
* Upload the JSON file
