# Go Todo App

A full-featured Todo application with a Golang backend API and React frontend.

## Project Structure

- `/backend` - Go API server using Gin framework
- `/frontend` - React frontend using TypeScript

## Backend

The backend is a RESTful API built with Go and the Gin framework. It provides endpoints for creating, reading, updating, and deleting todos.

### API Endpoints

- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get a specific todo
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `PATCH /api/todos/:id/toggle` - Toggle the completed status of a todo
- `DELETE /api/todos/:id` - Delete a todo

### Running the Backend

```
cd backend
go mod tidy
go run main.go
```

The server will start on http://localhost:8080

## Frontend

The frontend is built with React, TypeScript, and uses Axios for API requests.

### Features

- Add, edit, delete todos
- Mark todos as complete/incomplete
- Filter todos (All, Active, Completed)
- Clear completed todos
- Count of remaining active todos

### Running the Frontend

```
cd frontend
npm install
npm start
```

The application will start on http://localhost:3000

### Troubleshooting TypeScript Errors

If you encounter TypeScript errors related to React imports:

1. We've configured the project to use React 16 with TypeScript, which requires special handling:
   ```
   npm install @types/react@16.14.45 @types/react-dom@16.9.19 react@16.14.0 react-dom@16.14.0
   ```

2. The project includes a custom React adapter to simplify usage:
   ```typescript
   import React, { useState, useEffect } from './react-adapter';
   ```

3. We've also included declaration files in the `/src/types` directory that help TypeScript understand React components correctly.

4. If you encounter issues with JSX types, check that your tsconfig.json has:
   ```json
   {
     "compilerOptions": {
       "jsx": "react",
       "noImplicitAny": false
     }
   }
   ```

## Development

### Prerequisites

- Go 1.18 or higher
- Node.js 14 or higher
- npm 6 or higher

### Quick Start

You can start both the backend and frontend with a single command:

```
.\start.bat
```

This will start the Go backend on port 8080 and the React frontend on port 3000.

## License

MIT
