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

## Postman Documentation

**LOGIN**
<img width="699" height="435" alt="Screenshot 2026-04-19 163201" src="https://github.com/user-attachments/assets/3a7d8331-7648-49d8-9262-c49d8ccef286" />


**SIGNUP**
<img width="699" height="441" alt="Screenshot 2026-04-19 163130" src="https://github.com/user-attachments/assets/2b607fca-9f54-4d21-a420-513af6426737" />


**DELETE TASK**
<img width="701" height="401" alt="Screenshot 2026-04-19 164103" src="https://github.com/user-attachments/assets/c81041c2-99df-4024-a335-ce94b61242a0" />


**UPDATE TASK**
<img width="699" height="393" alt="Screenshot 2026-04-19 163849" src="https://github.com/user-attachments/assets/987a98c6-b42e-403d-9e9a-480345614864" />


**GET ALL TASK**
<img width="697" height="402" alt="Screenshot 2026-04-19 163448" src="https://github.com/user-attachments/assets/cd361bb2-6c93-4776-9d6e-222094450ad4" />


**CREATE TASK**
<img width="692" height="394" alt="Screenshot 2026-04-19 163420" src="https://github.com/user-attachments/assets/b48c47b6-a462-43eb-a68c-c7f39f11472b" />
