# Chat App Backend

This is the backend for a real-time chat application built using **Node.js** and **Socket.IO**. It provides API endpoints for user authentication, message handling, and real-time communication using WebSockets.

## Features

- User authentication (JWT-based)
- Secure password hashing with bcrypt
- Real-time messaging using Socket.IO
- RESTful API for user and chat data management
- Cross-Origin Resource Sharing (CORS) enabled
- Environment variable configuration with dotenv

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16.x or later recommended)
- [MongoDB](https://www.mongodb.com/) (running instance)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/nihalshameem/chat-app-backend.git
cd chat-app-backend
```

### Install Dependencies

```bash
npm install
```

### Set Up Environment Variables

Create a `.env` file in the project root and add the following variables:

```env
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
```

Replace `your-mongodb-connection-string` and `your-jwt-secret` with your actual MongoDB connection string and a secret key for JWT.

### Start the Server

- Start in production mode:

  ```bash
  npm start
  ```

- Start in development mode (with hot reloading):

  ```bash
  npm run dev
  ```

The server will start on the port specified in the `.env` file (default is `5000`).

## API Endpoints

### Authentication

- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Log in a user and receive a JWT

### Users

- **GET** `/api/users` - Get a list of all users (requires authentication)

### Chat

- **GET** `/api/chats` - Retrieve chat history
- **POST** `/api/chats` - Create a new chat message

## Real-Time Messaging

The backend uses **Socket.IO** for real-time communication. Clients can connect to the server to send and receive messages in real-time. Example events include:

- `message` - Send a message
- `join-room` - Join a chat room
- `user-connected` - Notify when a user connects

## Technologies Used

- **Node.js** - Backend runtime
- **Express** - Web framework
- **Socket.IO** - Real-time communication
- **MongoDB** - Database
- **JWT** - Authentication
- **bcrypt.js** - Password hashing
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing

## Project Structure

```plaintext
chat-app-backend/
├── server.js          # Entry point
├── config/            # Configuration files
├── controllers/       # Route controllers
├── models/            # Mongoose schemas
├── routes/            # API routes
├── middlewares/       # Middleware functions
└── utils/             # Utility functions
```

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue to suggest improvements or report bugs.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

Special thanks to the open-source community for providing amazing tools and resources.
