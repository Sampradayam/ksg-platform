# Smoke Test Guide

## Overview

Smoke tests are quick, high-level tests to verify that critical functionality works after deployment. Run these tests after every deployment to production or staging.

**Time to Complete:** ~10-15 minutes

---

## Pre-Test Checklist

- [ ] Application is deployed and accessible
- [ ] Database is connected and healthy
- [ ] Environment variables are configured
- [ ] Test user accounts are available

---

## Test Environments

| Environment | URL | Purpose |
|-------------|-----|---------|
| Local | http://localhost:5173 | Development |
| Staging | https://staging.ksg-platform.com | Pre-production |
| Production | https://ksg-platform.com | Live |

---

## Critical Path Tests

### 1. Application Health

#### Backend Health Check

```bash
curl https://api.ksg-platform.com/health

Expected Response:
{
  "status": "ok",
  "timestamp": "...",
  "database": "connected"
}
```

**Status:** ⬜ Pass / ⬜ Fail

#### Frontend Loads

- Navigate to homepage
- Verify page loads without errors
- Check browser console for errors
- Verify assets (images, CSS) load

**Status:** ⬜ Pass / ⬜ Fail

---

### 2. Authentication Flow

#### User Registration

1. Navigate to `/signup`
2. Fill registration form:
   - Name: Test User
   - Email: test+{timestamp}@example.com
   - Password: TestPass123!
   - Phone: +1234567890
3. Submit form
4. Verify success message
5. Check email for verification (if applicable)

**Expected:** User created successfully, redirected to dashboard/login

**Status:** ⬜ Pass / ⬜ Fail

#### User Login

1. Navigate to `/login`
2. Enter credentials:
   - Email: test@example.com
   - Password: TestPass123!
3. Submit form
4. Verify redirect to dashboard
5. Check JWT token in localStorage/cookies

**Expected:** Successful login, user dashboard visible

**Status:** ⬜ Pass / ⬜ Fail

#### Protected Route Access

1. While logged in, navigate to `/profile`
2. Verify profile page loads
3. Logout
4. Try accessing `/profile` again
5. Verify redirect to login

**Expected:** Protected routes require authentication

**Status:** ⬜ Pass / ⬜ Fail

---

### 3. Core Module Tests

#### Courses Module

**Browse Courses**
1. Navigate to `/courses`
2. Verify course list displays
3. Check pagination works
4. Test search/filter functionality

**Status:** ⬜ Pass / ⬜ Fail

**View Course Details**
1. Click on a course
2. Verify course details page loads
3. Check all course information displays
4. Verify enrollment button visible

**Status:** ⬜ Pass / ⬜ Fail

**Enroll in Course** (Authenticated)
1. Login as test user
2. Navigate to a course
3. Click "Enroll" button
4. Verify enrollment confirmation
5. Check course appears in "My Courses"

**Status:** ⬜ Pass / ⬜ Fail

---

#### Admissions Module

**Submit Application**
1. Login as test user
2. Navigate to `/admissions/apply`
3. Fill application form
4. Upload required documents
5. Submit application
6. Verify confirmation message

**Status:** ⬜ Pass / ⬜ Fail

**Check Application Status**
1. Navigate to `/admissions/status`
2. Verify application appears in list
3. Check status is displayed correctly

**Status:** ⬜ Pass / ⬜ Fail

---

#### Helpline Module

**Create Support Ticket**
1. Login as test user
2. Navigate to `/helpline`
3. Click "Create Ticket"
4. Fill form:
   - Subject: Test ticket
   - Category: Technical
   - Description: Test description
5. Submit ticket
6. Verify ticket created

**Status:** ⬜ Pass / ⬜ Fail

**View Ticket**
1. Navigate to ticket list
2. Click on created ticket
3. Verify ticket details display
4. Try adding a message
5. Verify message appears

**Status:** ⬜ Pass / ⬜ Fail

---

#### Festivals Module

**Browse Festivals**
1. Navigate to `/festivals`
2. Verify festival list displays
3. Check upcoming festivals highlighted
4. Test filter by date/location

**Status:** ⬜ Pass / ⬜ Fail

**Register for Festival**
1. Login as test user
2. Select a festival
3. Click "Register"
4. Fill registration form
5. Submit registration
6. Verify confirmation

**Status:** ⬜ Pass / ⬜ Fail

---

#### Tourism Module

**Browse Destinations**
1. Navigate to `/tourism`
2. Verify destination list displays
3. Check images load correctly
4. Test search functionality

**Status:** ⬜ Pass / ⬜ Fail

**Book Tour**
1. Login as test user
2. Select a destination
3. Choose tour package
4. Fill booking form
5. Submit booking
6. Verify booking confirmation

**Status:** ⬜ Pass / ⬜ Fail

---

### 4. Admin Module (Admin User)

**Admin Dashboard Access**
1. Login as admin user
2. Navigate to `/admin`
3. Verify dashboard loads
4. Check statistics display

**Status:** ⬜ Pass / ⬜ Fail

**User Management**
1. Navigate to `/admin/users`
2. Verify user list displays
3. Test search/filter
4. Try viewing user details

**Status:** ⬜ Pass / ⬜ Fail

---

### 5. API Tests

#### Authentication Endpoints

```bash
# Register
curl -X POST https://api.ksg-platform.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "API Test User",
    "email": "apitest@example.com",
    "password": "TestPass123!"
  }'

# Login
curl -X POST https://api.ksg-platform.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "apitest@example.com",
    "password": "TestPass123!"
  }'

# Get Current User
curl -X GET https://api.ksg-platform.com/api/auth/me \
  -H "Authorization: Bearer <token>"
```

**Status:** ⬜ Pass / ⬜ Fail

#### Courses Endpoints

```bash
# Get All Courses
curl -X GET https://api.ksg-platform.com/api/courses

# Get Course by ID
curl -X GET https://api.ksg-platform.com/api/courses/<course-id>
```

**Status:** ⬜ Pass / ⬜ Fail

---

### 6. Performance Tests

#### Page Load Times

Test with browser DevTools Network tab:

- Homepage: < 2 seconds
- Course listing: < 3 seconds
- Course details: < 2 seconds
- Dashboard: < 2 seconds

**Status:** ⬜ Pass / ⬜ Fail

#### API Response Times

```bash
# Test API response time
curl -w "@curl-format.txt" -o /dev/null -s https://api.ksg-platform.com/api/courses
```

Expected: < 500ms for most endpoints

**Status:** ⬜ Pass / ⬜ Fail

---

### 7. Database Connectivity

#### Check Database Connection

```bash
# From backend container/server
npm run db:check

# Or manual check
mongo mongodb://localhost:27017/ksg-platform --eval "db.stats()"
```

**Expected:** Connection successful, database accessible

**Status:** ⬜ Pass / ⬜ Fail

---

### 8. Error Handling

#### 404 Page

1. Navigate to `/non-existent-page`
2. Verify 404 page displays
3. Check navigation still works

**Status:** ⬜ Pass / ⬜ Fail

#### API Error Handling

```bash
# Test invalid endpoint
curl https://api.ksg-platform.com/api/invalid

# Test unauthorized access
curl https://api.ksg-platform.com/api/admin/users
```

**Expected:** Proper error messages, correct status codes

**Status:** ⬜ Pass / ⬜ Fail

---

### 9. Security Tests

#### HTTPS Enforcement

1. Try accessing http://ksg-platform.com
2. Verify redirect to https://

**Status:** ⬜ Pass / ⬜ Fail

#### CORS Configuration

```bash
# Test CORS from different origin
curl -H "Origin: https://malicious-site.com" \
  https://api.ksg-platform.com/api/courses
```

**Expected:** CORS headers properly configured

**Status:** ⬜ Pass / ⬜ Fail

#### SQL Injection Prevention

Try submitting forms with SQL injection attempts:
- `' OR '1'='1`
- `'; DROP TABLE users; --`

**Expected:** Inputs sanitized, no errors

**Status:** ⬜ Pass / ⬜ Fail

---

### 10. Mobile Responsiveness

#### Test on Mobile Devices

1. Open site on mobile device or use DevTools mobile emulation
2. Test navigation menu
3. Verify forms are usable
4. Check images scale properly
5. Test touch interactions

**Status:** ⬜ Pass / ⬜ Fail

---

## Test Results Summary

| Test Category | Status | Notes |
|---------------|--------|-------|
| Application Health | ⬜ | |
| Authentication | ⬜ | |
| Courses Module | ⬜ | |
| Admissions Module | ⬜ | |
| Helpline Module | ⬜ | |
| Festivals Module | ⬜ | |
| Tourism Module | ⬜ | |
| Admin Module | ⬜ | |
| API Tests | ⬜ | |
| Performance | ⬜ | |
| Database | ⬜ | |
| Error Handling | ⬜ | |
| Security | ⬜ | |
| Mobile | ⬜ | |

---

## Failure Protocol

If any test fails:

1. **Document the failure**
   - Screenshot/error message
   - Steps to reproduce
   - Environment details

2. **Assess severity**
   - Critical: Blocks core functionality
   - High: Major feature broken
   - Medium: Minor feature issue
   - Low: Cosmetic issue

3. **Take action**
   - Critical: Rollback deployment immediately
   - High: Create hotfix branch
   - Medium: Create bug ticket
   - Low: Add to backlog

4. **Notify team**
   - Post in #incidents channel
   - Tag relevant module owner
   - Update status page (if applicable)

---

## Automated Smoke Tests

For CI/CD integration, run automated smoke tests:

```bash
# Backend smoke tests
cd backend
npm run test:smoke

# Frontend smoke tests
cd frontend
npm run test:smoke

# Full smoke test suite
npm run smoke-test
```

---

## Test Credentials

### Test Users

| Role | Email | Password |
|------|-------|----------|
| User | test.user@example.com | TestUser123! |
| Admin | test.admin@example.com | TestAdmin123! |
| Instructor | test.instructor@example.com | TestInstructor123! |

**Note:** Change passwords after testing in production!

---

## Monitoring & Alerts

After smoke tests pass, verify monitoring:

- [ ] Application monitoring active (New Relic, Datadog, etc.)
- [ ] Error tracking configured (Sentry, Rollbar, etc.)
- [ ] Uptime monitoring running (Pingdom, UptimeRobot, etc.)
- [ ] Log aggregation working (CloudWatch, Loggly, etc.)

---

## Sign-off

**Tester:** ___________________  
**Date:** ___________________  
**Environment:** ___________________  
**Overall Status:** ⬜ Pass / ⬜ Fail  

**Notes:**
_______________________________________________
_______________________________________________
_______________________________________________

---

## Next Steps

- [ ] Document any issues found
- [ ] Create tickets for failures
- [ ] Update runbook if needed
- [ ] Schedule follow-up tests
- [ ] Notify stakeholders of deployment status
