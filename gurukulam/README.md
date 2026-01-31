# Admin Approval Workflow – Backend API

This project is a **backend-only Node.js API** that implements an **Admin Approval / Rejection workflow with audit logging**.

It is designed for **controlled scheduling use cases** such as visit requests, enrollments, or any admin-reviewed request.

---

## 🚀 Features

* Admin-only approve / reject API
* Mandatory rejection reason
* Strict status transition validation
* Transaction-safe updates
* Immutable audit logging
* Clean, scalable folder structure
* No frontend / UI dependency

---

## 🛠 Tech Stack

* Node.js (18+)
* Express.js
* PostgreSQL
* JWT-based authentication (placeholder)
* SQL transactions

---

## 📁 Project Structure

```
src/
├── app.js
├── server.js
│
├── config/
│   └── database.js
│
├── routes/
│   └── index.js
│
├── middleware/
│   ├── auth.middleware.js
│   ├── admin.middleware.js
│   └── error.middleware.js
│
├── modules/
│   ├── approval/
│   │   ├── approval.routes.js
│   │   ├── approval.controller.js
│   │   ├── approval.service.js
│   │   ├── approval.status.js
│   │   └── approval.validator.js
│   │
│   └── audit/
│       └── audit.service.js
│
└── utils/
    └── transaction.js
```

---

## ⚙️ Setup Instructions (Ubuntu / Linux)

### 1️⃣ Install Dependencies

```bash
npm install
```

---

### 2️⃣ Create Environment File

```bash
cp .env.example .env
```

Example `.env`:

```env
PORT=3000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=app_db
```

---

### 3️⃣ Setup PostgreSQL

```bash
sudo apt install postgresql postgresql-contrib -y
sudo systemctl start postgresql
```

Create database:

```bash
sudo -u postgres psql
CREATE DATABASE app_db;
\q
```

---

### 4️⃣ Run the Server

```bash
node src/server.js
```

Server should start on:

```
http://localhost:3000
```

---

## 🔐 API Authentication

Authentication is handled via middleware.

> ⚠️ The current `auth.middleware.js` uses a **mock user** for simplicity.
> Replace it with real JWT verification for production.

Example injected user:

```js
{
  id: "admin-uuid",
  role: "ADMIN"
}
```

---

## 📌 API Endpoint

### Approve / Reject Request

**POST**

```
/api/admin/approvals/:id/decision
```

#### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <JWT_TOKEN>"
}
```

#### Approve Request

```json
{
  "decision": "APPROVED"
}
```

#### Reject Request

```json
{
  "decision": "REJECTED",
  "reason": "Slot not available"
}
```

---

## 🔄 Status Rules

Allowed transitions:

* `PENDING → APPROVED`
* `PENDING → REJECTED`

❌ Any other transition is rejected.

Once approved or rejected, the request **cannot be modified**.

---

## 🧾 Audit Logging

Every admin action is logged with:

* Admin ID
* Action (APPROVED / REJECTED)
* Previous status
* New status
* Rejection reason (if any)
* Timestamp
* IP address

Audit logs are **immutable**.

---

## ❌ Out of Scope

* Notifications (Email / SMS)
* Bulk approvals
* UI / Frontend

---

## 🧠 Best Practices Followed

* Thin controllers
* Business logic in services
* Centralized status validation
* Transactional consistency
* Admin-only enforcement at API level

---

## 📦 Before Sharing as ZIP

Remove:

* `node_modules/`
* `.env`

Include:

* `.env.example`
* `README.md`

Create zip:

```bash
zip -r backend-project.zip backend-project \
  -x "*/node_modules/*" \
  -x "*.env"
```

---

## 🚀 Possible Enhancements

* Real JWT authentication
* RBAC policy engine
* Notification service
* Unit tests (Jest)
* Docker support
* NestJS migration

---

## 📄 License

This project is for internal / educational use.
