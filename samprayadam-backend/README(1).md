# Visitor Request Notification Backend

This backend service allows an admin to approve or reject visitor requests and automatically sends confirmation or rejection notifications via Email and/or SMS.  
The notification process is asynchronous, event-driven, and does not block the admin action.

---

## Features

- Admin approval/rejection API
- Asynchronous Email & SMS notifications
- Event-driven architecture using Redis queues
- Automatic retry on notification failure
- Notification attempt logging
- Simple single-service backend

---

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- Redis
- BullMQ

---

## Project Structure

