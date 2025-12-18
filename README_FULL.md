# Enhanced Todo — Project README

This document explains the purpose of the project and details every backend route and the main frontend components that interact with those routes.

Project layout
- `backend/` — Express API, controllers, models, passport and JWT handling, middlewares and routes.
- `frontend/` — React + Vite SPA (components, pages, assets).

Environment variables
- Backend (.env):
  - `MONGODB_URL` — MongoDB connection string
  - `JWT_SECRET_KEY` — JWT signing secret
  - `SESSION_SECRET` — express-session secret
  - `FRONTEND_URL` — frontend base URL used by OAuth redirect
  - `PORT` — optional (default 5000)
- Frontend (.env):
  - `VITE_API_URL` — backend base URL (e.g. http://localhost:5000)

How server mounts routes (entry)
- Server entry: `backend/index.js`
- Mounted base paths: `/user`, `/todo`, `/admin`, `/auth`, `/contact`

Backend routes and purpose

1) Authentication / User
- POST /user/signup
  - Controller: `register` (`backend/controller/user.controller.js`)
  - Purpose: Create user account. Validates username/email/password, hashes password, saves user and returns a JWT.
  - Body: { username, email, password }
  - Response: 201 with { message, user, token } or 400/500 with errors

- POST /user/login
  - Controller: `login`
  - Purpose: Authenticate user and return a JWT. Works for regular users and admins (role returned).
  - Body: { email, password }
  - Response: 200 with { message, user/admin, token } or 400/500

- GET /user/logout
  - Controller: `logout`
  - Purpose: Endpoint that returns a logout success message. Client should clear local token/cookies.
  - Response: 200 { message }

2) OAuth
- GET /auth/google
  - Purpose: Start Google OAuth flow via Passport (scope: profile, email)

- GET /auth/google/callback
  - Purpose: OAuth callback. Passport authenticates, server generates JWT via `generateToken` and redirects to `${FRONTEND_URL}welcome?jwt=<token>`

3) Todos (protected — require authentication)
All todo routes use middleware `authenticate` from `backend/middlewares/authorised.js` which reads a JWT from cookie `jwt` or Authorization header `Bearer <token>` and attaches `req.user`.

- POST /todo/create
  - Controller: `createTodo`
  - Purpose: Create a todo for the authenticated user
  - Body: { title, completed }
  - Response: 201 { message, newTodo }

- GET /todo/fetch
  - Controller: `getTodo`
  - Purpose: Fetch all todos owned by the authenticated user
  - Response: 200 { message, todos }

- PUT /todo/update/:id
  - Controller: `updateTodo`
  - Purpose: Update todo fields (title, completed). Only owner can update (admin allowed by role check)
  - Body: { title?, completed? }
  - Response: 200 { message, todo } or 403/404

- DELETE /todo/delete/:id
  - Controller: `deleteTodo`
  - Purpose: Delete a todo; only the owner can delete their todo
  - Response: 200 { message } or 403/404

4) Admin routes (protected + admin-only)
These use `authenticate` then `isAdmin` (`backend/middlewares/isAdmin.js`) which checks `req.user.role === 'admin'`.

- GET /admin/user
  - Controller: `getAllUsers`
  - Purpose: Return list of users with fields: username, email, role
  - Response: 200 [ users ]

- GET /admin/user/:userId/todo
  - Controller: `getTodosByUser`
  - Purpose: Return all todos for a specific user
  - Response: 200 [ todos ]

- PUT /admin/user/:userId/todo/:todoId
  - Controller: `updateUserTodoByAdmin`
  - Purpose: Admin updates a specific user's todo
  - Body: { title?, completed? }
  - Response: 200 { message, todo }

- DELETE /admin/user/:id
  - Controller: `deleteUser`
  - Purpose: Admin deletes a user (server-side prevents deleting self)
  - Response: 200 { message }

- DELETE /admin/user/:userId/todo/:todoId
  - Controller: `deleteTodoByAdmin`
  - Purpose: Admin deletes a specific user's todo
  - Response: 200 { message }

5) Contact / Feedback
- POST /contact/feedback
  - Controller: `feedback` (`backend/controller/contact.controller.js`)
  - Purpose: Accept contact/feedback messages, validates input and stores into `Contact` model
  - Body: { name, email, message }
  - Response: 200 { message }

Middlewares
- `authenticate` (`backend/middlewares/authorised.js`)
  - Verifies JWT from cookie or Authorization header, loads user (without password) and attaches `req.user`.
  - On failure returns 401 and clears cookie `jwt`.

- `isAdmin` (`backend/middlewares/isAdmin.js`)
  - Checks `req.user.role` and returns 403 if not admin.

Models (summary)
- `User` (`backend/model/user.model.js`): username, email, password (stored hashed, select:false), social IDs, role (user|admin), token
- `Todo` (`backend/model/todo.model.js`): title, completed (bool), user (ObjectId ref), createdAt
- `Contact` (`backend/model/contact.model.js`): name, email, message, timestamps

Frontend overview
- `frontend/src` contains React components and pages. The app uses `import.meta.env.VITE_API_URL` to call the API.

Key components and which backend routes they call
- `Signup.jsx`
  - Calls: POST `${VITE_API_URL}/user/signup`, POST `${VITE_API_URL}/user/login`
  - Starts Google OAuth: link to `${VITE_API_URL}/auth/google`
  - Stores JWT in `localStorage` key `jwt` and `role`.

- `Todo.jsx`
  - Calls: GET `${VITE_API_URL}/todo/fetch`, POST `${VITE_API_URL}/todo/create`, PUT `${VITE_API_URL}/todo/update/:id`, DELETE `${VITE_API_URL}/todo/delete/:id`, GET `${VITE_API_URL}/user/logout`
  - Sends Authorization header: `Bearer ${jwt}` (jwt from localStorage)
  - Implements optimistic UI when toggling todo completion and bulk clear of completed tasks (deletes each completed todo via DELETE route).

- `Contact.jsx`
  - Calls: POST `${VITE_API_URL}/contact/feedback` to submit feedback.

- Admin pages (`AdminDashboard.jsx`, `AdminTodos.jsx`)
  - Calls: `/admin` routes for listing users and their todos and for admin updates/deletions.
  - Admin client uses `localStorage.role` for UI; actual authorization enforced server-side.

Running the project (quick)
- Backend:
  1. cd backend
  2. npm install
  3. Create `.env` with required variables
  4. npm run start (or node index.js)

- Frontend:
  1. cd frontend
  2. npm install
  3. Create `.env` with `VITE_API_URL` pointing to backend
  4. npm run dev

Notes and tips
- Always keep `JWT_SECRET_KEY` secure. Tokens are used for protected routes.
- The frontend stores JWT in `localStorage`. For additional security consider HttpOnly cookies and CSRF mitigations.
- Admin checks are enforced server-side. Do not trust client-side role flags for security.

If you want, I can:
- Add a short cURL example for every route,
- Produce a Postman collection JSON for all endpoints,
- Or convert this into `backend/API.md` and `frontend/FRONTEND_README.md`.

