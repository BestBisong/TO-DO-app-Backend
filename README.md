## Install Dependencies
npm install

## Configure Environment Variables
Create a .env file in the root directory and add:

DATABASE_HOST=your_host
DATABASE_PORT=your_port
DATABASE_USER=your_user
DATABASE_PASSWORD=your_password
DATABASE_NAME=your_database
JWT_SECRET=your_secret


## Running the Application
npm run dev

## The server will run on:
http://localhost:3000

| Method | Endpoint     | Description                 |
| ------ | ------------ | --------------------------- |
| POST   | /auth/signup | Register a new user         |
| POST   | /auth/login  | Login and receive JWT token |
| GET    | /todos       | Retrieve all user tasks     |
| POST   | /todos       | Create a new task           |
| PATCH  | /todos/:id   | Update a task               |
| DELETE | /todos/:id   | Delete a task               |
