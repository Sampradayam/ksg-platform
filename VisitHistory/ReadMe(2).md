# Visit History System – MERN Backend

This module implements an **immutable Visit History (audit log) system** for a MERN stack tourism application.  
It tracks all completed and cancelled visits, preserves a full status timeline, and enforces role-based access.

---

## Features

- Append-only visit status history (audit-safe)
- Full status timeline with timestamp and actor
- Role-based access control
- Reporting- and troubleshooting-friendly data model
- Enforced valid status transitions

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Existing Authentication & RBAC middleware (assumed)

---

## Data Models

### Visit (`visits` collection)

Represents the **current state** of a visit.

Fields:
- `touristId`
- `packageId`
- `scheduledDate`
- `currentStatus`
- `createdAt`, `updatedAt`

---

### VisitHistory (`visit_histories` collection)

Represents the **immutable event log**.

Fields:
- `visitId`
- `touristId`
- `status`
- `changedAt`
- `actor` (`ADMIN` or `SYSTEM`)
- `reason` (optional)
- `metadata` (IP, user-agent)

⚠️ **Never updated or deleted**

---

## Status Lifecycle

