# To-Do List Application

## Overview

This is a full-stack To-Do List application built with React for the frontend and Express.js for the backend. Users can register, log in, and manage their to-do tasks. The application uses JWT for authentication and MongoDB for data storage.

## Features

- **User Authentication**: Register, log in, and manage sessions using JWT.
- **Task Management**: Add, edit, remove, and view tasks.
- **Validation**: Ensure tasks do not exceed 140 characters and enforce proper content type for requests.
- **Middleware**: Secure routes and manage user access based on authentication.

## Technologies Used

- **Frontend**: React, Axios
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Testing**: Mocha, Chai, Supertest for backend; Jest, React Testing Library for frontend

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (installed and running)

### Setup

#### Backend

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Samuel-Molele/todo-app.git
   ```

2. Navigate to the `Backend` directory

   ```bash
   cd Backend

   

3. Install dependencies

   ```bash
   npm install

   

4. start the server
   ```bash
   npm run dev

  
### Front-end

1. Navigate to the `Frontend/client` directory:
   ```bash
   cd Frontend
   cd client
   ```
2. install dependencies

   ```bash
   npm install

   ```

3. Start the React development server
   ```bash
   npm start
   ``` 
