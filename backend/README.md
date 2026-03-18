# UberClone Backend API Documentation

## User Registration Endpoint

### Endpoint URL
```
POST /user/register
```

---

## Description
The user registration endpoint allows new users to create an account in the UberClone application. It validates user input, checks for existing users, hashes the password, and returns a JWT token upon successful registration.

---

## Request

### Method
`POST`

### Content-Type
```
application/json
```

### Request Body

```json
{
  "fullName": {
    "firstName": "string",
    "lastName": "string"
  },
  "email": "string",
  "phoneNo": "string",
  "password": "string"
}
```

### Required Fields

| Field | Type | Validation Rules | Description |
|-------|------|------------------|-------------|
| `fullName.firstName` | String | Minimum 3 characters | User's first name |
| `fullName.lastName` | String | - | User's last name (optional in request, but recommended) |
| `email` | String | Valid email format, Unique | User's email address |
| `phoneNo` | String | Minimum 10 characters | User's contact number |
| `password` | String | Minimum 6 characters | User's password (will be hashed) |

### Example Request

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "phoneNo": "9876543210",
  "password": "secure123"
}
```

---

## Response

### Success Response (Status: 200 OK)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "phoneNo": "9876543210",
    "socketID": null
  }
}
```

---

## User Login Endpoint

### Endpoint URL
```
POST /user/login
```

---

## Description
The user login endpoint allows existing users to authenticate with their email and password. It validates user input, checks credentials, and returns a JWT token upon successful login.

---

## Request

### Method
`POST`

### Content-Type
```
application/json
```

### Request Body

```json
{
  "email": "string",
  "password": "string"
}
```

### Required Fields

| Field | Type | Validation Rules | Description |
|-------|------|------------------|-------------|
| `email` | String | Valid email format | User's email address |
| `password` | String | Minimum 6 characters | User's password |

### Example Request

```json
{
  "email": "john.doe@example.com",
  "password": "secure123"
}
```

---

## Response

### Success Response (Status: 200 OK)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "phoneNo": "9876543210",
    "socketID": null
  }
}
```

---

## Status Codes

| Status Code | Description | Scenario |
|-------------|-------------|----------|
| **200** | OK - User logged in successfully | Credentials valid, JWT token generated and returned |
| **400** | Bad Request | Validation errors |
| **401** | Unauthorized | Invalid email or password |
| **500** | Internal Server Error | Server-side error during login |

---

## Error Responses

### 400 Bad Request - Validation Errors

```json
{
  "error": [
    {
      "msg": "Invalid Email",
      "param": "email"
    },
    {
      "msg": "Name must be atleat 3 charcater",
      "param": "fullName.firstName"
    },
    {
      "msg": "Contact no must be valid",
      "param": "phoneNo"
    },
    {
      "msg": "Name must be atleat 6 charcater",
      "param": "password"
    }
  ]
}
```

### 400 Bad Request - Missing Required Fields

```json
{
  "error": "All fields are required"
}
```

### 400 Bad Request - User Already Exists

```json
{
  "message": "user already exist"
}
```

### 500 Internal Server Error

```json
{
  "message": "Error message describing the server error"
}
```

---

## Validation Rules Breakdown

### Email Validation
- Must be a valid email format (e.g., user@domain.com)
- Must be unique in the database

### First Name Validation
- Minimum 3 characters required
- Must not be empty

### Phone Number Validation
- Minimum 10 characters required
- Must be unique in the database

### Password Validation
- Minimum 6 characters required
- Will be hashed using bcrypt before storage

---

## Security Features

1. **Password Hashing**: Passwords are hashed using bcrypt with 10 salt rounds before storage
2. **JWT Authentication**: A JWT token is generated upon successful registration for user authentication
3. **Validation**: All input fields are validated using express-validator
4. **Unique Constraints**: Email and phone number must be unique across users

---

## Response Examples

### Scenario 1: Successful Registration (Status: 200)

**Request:**
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "phoneNo": "9876543210",
  "password": "secure123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWY5ZWI2YzhjZTBkYjAxMjM0NTY3ODkiLCJpYXQiOjE3MTA3NjU0MDh9.abc123xyz",
  "user": {
    "_id": "65f9eb6c8ce0db012345678",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "phoneNo": "9876543210",
    "socketID": null
  }
}
```

---

### Scenario 2: Validation Error - Invalid Email (Status: 400)

**Request:**
```json
{
  "fullName": {
    "firstName": "Jane",
    "lastName": "Smith"
  },
  "email": "invalid-email",
  "phoneNo": "9876543210",
  "password": "secure123"
}
```

**Response:**
```json
{
  "error": [
    {
      "value": "invalid-email",
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

---

### Scenario 3: Validation Error - Short Password (Status: 400)

**Request:**
```json
{
  "fullName": {
    "firstName": "Mike",
    "lastName": "Johnson"
  },
  "email": "mike.johnson@example.com",
  "phoneNo": "9876543210",
  "password": "123"
}
```

**Response:**
```json
{
  "error": [
    {
      "value": "123",
      "msg": "Name must be atleat 6 charcater",
      "param": "password",
      "location": "body"
    }
  ]
}
```

---

### Scenario 4: Validation Error - Short First Name (Status: 400)

**Request:**
```json
{
  "fullName": {
    "firstName": "Jo",
    "lastName": "Doe"
  },
  "email": "jo@example.com",
  "phoneNo": "9876543210",
  "password": "secure123"
}
```

**Response:**
```json
{
  "error": [
    {
      "value": "Jo",
      "msg": "Name must be atleat 3 charcater",
      "param": "fullName.firstName",
      "location": "body"
    }
  ]
}
```

---

### Scenario 5: Validation Error - Invalid Phone Number (Status: 400)

**Request:**
```json
{
  "fullName": {
    "firstName": "Sarah",
    "lastName": "Williams"
  },
  "email": "sarah@example.com",
  "phoneNo": "987654",
  "password": "secure123"
}
```

**Response:**
```json
{
  "error": [
    {
      "value": "987654",
      "msg": "Contact no must be valid",
      "param": "phoneNo",
      "location": "body"
    }
  ]
}
```

---

### Scenario 6: User Already Exists (Status: 400)

**Request:**
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "phoneNo": "9876543215",
  "password": "secure123"
}
```

**Response:**
```json
{
  "message": "user already exist"
}
```

---

### Scenario 7: Missing Required Field (Status: 400)

**Request:**
```json
{
  "fullName": {
    "firstName": "Alex",
    "lastName": "Brown"
  },
  "email": "alex.brown@example.com",
  "phoneNo": "9876543210"
}
```

**Response:**
```json
{
  "error": "All fields are required"
}
```

---

### Scenario 8: Server Error (Status: 500)

**Response:**
```json
{
  "message": "connect ECONNREFUSED 127.0.0.1:27017"
}
```

---

## Example Usage

### Using cURL

```bash
curl -X POST http://localhost:3000/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "phoneNo": "9876543210",
    "password": "secure123"
  }'
```

### Using JavaScript Fetch

```javascript
const registerUser = async () => {
  const response = await fetch('http://localhost:3000/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fullName: {
        firstName: 'John',
        lastName: 'Doe'
      },
      email: 'john.doe@example.com',
      phoneNo: '9876543210',
      password: 'secure123'
    })
  });

  const data = await response.json();
  console.log(data);
};
```

---

## Notes

- The `lastName` field in the schema requires a minimum length of 5 characters (based on UserModel.js), but the route validation doesn't enforce this currently
- Ensure environment variable `JWT_SECRET` is set in your .env file for token generation
- The API expects JSON format for all requests
- CORS and other security headers should be configured at the application level
