# API Contract Documentation

## Base URL

```
Development: http://localhost:5000/api
Production: https://api.ksg-platform.com/api
```

## Authentication

All protected endpoints require JWT token in header:

```
Authorization: Bearer <token>
```

## Response Format

### Success Response

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

## HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `422` - Validation Error
- `500` - Internal Server Error

---

## Identity Module (Auth/Users/RBAC)

### Authentication

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "phone": "+1234567890"
}

Response: 201
{
  "success": true,
  "data": {
    "user": { "id": "...", "name": "...", "email": "..." },
    "token": "jwt-token"
  }
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}

Response: 200
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "jwt-token"
  }
}
```

#### Get Current User

```http
GET /api/auth/me
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "data": {
    "id": "...",
    "name": "...",
    "email": "...",
    "role": "user"
  }
}
```

#### Logout

```http
POST /api/auth/logout
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "message": "Logged out successfully"
}
```

### User Management

#### Get User Profile

```http
GET /api/users/:id
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "data": {
    "id": "...",
    "name": "...",
    "email": "...",
    "phone": "...",
    "createdAt": "..."
  }
}
```

#### Update User Profile

```http
PUT /api/users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name",
  "phone": "+1234567890"
}

Response: 200
{
  "success": true,
  "data": { ... }
}
```

---

## Courses Module

### Get All Courses

```http
GET /api/courses?page=1&limit=10&category=vedic

Response: 200
{
  "success": true,
  "data": {
    "courses": [ ... ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "pages": 5
    }
  }
}
```

### Get Course by ID

```http
GET /api/courses/:id

Response: 200
{
  "success": true,
  "data": {
    "id": "...",
    "title": "...",
    "description": "...",
    "instructor": "...",
    "duration": "...",
    "modules": [ ... ]
  }
}
```

### Create Course (Admin)

```http
POST /api/courses
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "title": "Vedic Mathematics",
  "description": "...",
  "category": "vedic",
  "duration": "8 weeks",
  "instructor": "..."
}

Response: 201
{
  "success": true,
  "data": { ... }
}
```

### Enroll in Course

```http
POST /api/courses/:id/enroll
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "message": "Enrolled successfully",
  "data": { "enrollmentId": "..." }
}
```

---

## Admissions Module

### Submit Application

```http
POST /api/admissions/apply
Authorization: Bearer <token>
Content-Type: application/json

{
  "courseId": "...",
  "personalInfo": { ... },
  "academicInfo": { ... },
  "documents": [ ... ]
}

Response: 201
{
  "success": true,
  "data": {
    "applicationId": "...",
    "status": "pending"
  }
}
```

### Get Application Status

```http
GET /api/admissions/:applicationId
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "data": {
    "id": "...",
    "status": "under_review",
    "submittedAt": "...",
    "updatedAt": "..."
  }
}
```

---

## Helpline Module

### Create Ticket

```http
POST /api/helpline/tickets
Authorization: Bearer <token>
Content-Type: application/json

{
  "subject": "Issue with course access",
  "category": "technical",
  "priority": "medium",
  "description": "..."
}

Response: 201
{
  "success": true,
  "data": {
    "ticketId": "...",
    "status": "open"
  }
}
```

### Get Ticket

```http
GET /api/helpline/tickets/:id
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "data": {
    "id": "...",
    "subject": "...",
    "status": "open",
    "messages": [ ... ]
  }
}
```

---

## Festivals Module

### Get All Festivals

```http
GET /api/festivals?upcoming=true

Response: 200
{
  "success": true,
  "data": {
    "festivals": [
      {
        "id": "...",
        "name": "...",
        "date": "...",
        "description": "...",
        "location": "..."
      }
    ]
  }
}
```

### Register for Festival

```http
POST /api/festivals/:id/register
Authorization: Bearer <token>
Content-Type: application/json

{
  "attendees": 2,
  "specialRequirements": "..."
}

Response: 201
{
  "success": true,
  "data": {
    "registrationId": "...",
    "confirmationCode": "..."
  }
}
```

---

## Tourism Module

### Get Destinations

```http
GET /api/tourism/destinations?region=south

Response: 200
{
  "success": true,
  "data": {
    "destinations": [ ... ]
  }
}
```

### Book Tour

```http
POST /api/tourism/bookings
Authorization: Bearer <token>
Content-Type: application/json

{
  "destinationId": "...",
  "date": "2026-03-15",
  "travelers": 4,
  "packageType": "premium"
}

Response: 201
{
  "success": true,
  "data": {
    "bookingId": "...",
    "totalAmount": 5000,
    "status": "confirmed"
  }
}
```

---

## Content Module

### Get Content

```http
GET /api/content?type=article&category=culture

Response: 200
{
  "success": true,
  "data": {
    "content": [ ... ]
  }
}
```

### Create Content (Admin)

```http
POST /api/content
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "title": "...",
  "type": "article",
  "category": "culture",
  "body": "...",
  "tags": ["vedic", "culture"]
}

Response: 201
{
  "success": true,
  "data": { ... }
}
```

---

## AI Module

### Get AI Recommendations

```http
POST /api/ai/recommendations
Authorization: Bearer <token>
Content-Type: application/json

{
  "context": "courses",
  "userPreferences": { ... }
}

Response: 200
{
  "success": true,
  "data": {
    "recommendations": [ ... ]
  }
}
```

### Chat with AI Assistant

```http
POST /api/ai/chat
Authorization: Bearer <token>
Content-Type: application/json

{
  "message": "Tell me about Vedic mathematics",
  "conversationId": "..."
}

Response: 200
{
  "success": true,
  "data": {
    "response": "...",
    "conversationId": "..."
  }
}
```

---

## Admin Module

### Get Dashboard Stats

```http
GET /api/admin/dashboard
Authorization: Bearer <admin-token>

Response: 200
{
  "success": true,
  "data": {
    "users": { "total": 1000, "active": 750 },
    "courses": { "total": 50, "enrolled": 2500 },
    "revenue": { "total": 50000, "thisMonth": 5000 }
  }
}
```

### Manage Users

```http
GET /api/admin/users?page=1&limit=20&role=user

Response: 200
{
  "success": true,
  "data": {
    "users": [ ... ],
    "pagination": { ... }
  }
}
```

---

## Rate Limiting

- 100 requests per 15 minutes per IP
- 1000 requests per hour for authenticated users
- Headers included in response:
  - `X-RateLimit-Limit`
  - `X-RateLimit-Remaining`
  - `X-RateLimit-Reset`

## Versioning

API version is included in URL: `/api/v1/...`

Current version: `v1`

## Deprecation Policy

- 6 months notice before deprecation
- Deprecated endpoints return `X-API-Deprecated` header
- Migration guide provided in documentation

## Support

For API issues or questions:
- Email: api-support@ksg-platform.com
- Slack: #api-support
- Documentation: https://docs.ksg-platform.com
