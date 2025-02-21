# Resume Parser API

A Node.js REST API that leverages Google's Gemini AI to parse and analyze resumes. The service provides authentication endpoints and resume management functionality.

## Features

- User authentication with JWT
- Resume parsing using Gemini AI
- Resume storage and retrieval
- MongoDB integration for data persistence
- Secure API endpoints

## Prerequisites

Before running this application, make sure you have:

- Node.js (v14 or higher)
- MongoDB installed and running
- Google Cloud account with Gemini API access
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/hackman01/gemini-resume
cd gemini-resume
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
JWT_SECRET=your_jwt_secret_key
MONGODB_URI=your_mongodb_connection_string
GEMINI_KEY=your_gemini_api_key
```

4. Start the server:
```bash
npm start
```

The server will start running on `http://localhost:8000`

## API Endpoints

### Authentication

#### Sign Up
- **URL:** `/api/auth/signup`
- **Method:** `POST`
- **Request Body:**
```json
{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
}
```
- **Success Response:** `201 Created`

#### Sign In
- **URL:** `/api/auth/signin`
- **Method:** `POST`
- **Request Body:**
```json
{
    "email": "user@example.com",
    "password": "password123"
}
```
- **Success Response:** `200 OK`
```json
{
    "token": "jwt_token_here",
    "user": {
        "id": "user_id",
        "email": "user@example.com",
        "name": "John Doe"
    }
}
```

### Resume Operations

#### Parse Resume
- **URL:** `/api/resume/parse-resume`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer <jwt_token>`
- **Request Body:** `multipart/form-data`
  - File field: `resume`
- **Success Response:** `200 OK`

#### Find Resume
- **URL:** `/api/resume/find-resume?name=<matching name>`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <jwt_token>`

- **Success Response:** `200 OK`

## Error Handling

The API uses standard HTTP status codes for error handling:

- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Security

- JWT authentication for protected routes
- Password hashing
- Environment variables for sensitive data
- Input validation and sanitization

