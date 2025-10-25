# 📚 Express Book Reviews - Final Project

## Overview
This is a complete Express.js REST API for managing book reviews. The project implements **all 13 required tasks** worth **30 points total**.

---

## 🎯 Project Requirements & Implementation

### ✅ General Users (10 Points)
- **Task 1** (2pts): Get all books - `GET /`
- **Task 2** (2pts): Get book by ISBN - `GET /isbn/:isbn`
- **Task 3** (2pts): Get books by Author - `GET /author/:author`
- **Task 4** (2pts): Get books by Title - `GET /title/:title`
- **Task 5** (2pts): Get book reviews - `GET /review/:isbn`

### ✅ User Registration & Authentication (6 Points)
- **Task 6** (3pts): Register new user - `POST /customer/register`
- **Task 7** (3pts): Login as registered user - `POST /customer/login`

### ✅ Registered Users (4 Points)
- **Task 8** (2pts): Add/Modify review - `PUT /customer/auth/review/:isbn?review=text`
- **Task 9** (2pts): Delete review - `DELETE /customer/auth/review/:isbn`

### ✅ Async/Promises with Axios (10 Points)
- **Task 10** (2pts): Get all books (async) - `GET /async/books`
- **Task 11** (2pts): Search by ISBN (Promises) - `GET /async/isbn/:isbn`
- **Task 12** (2pts): Search by Author (async) - `GET /async/author/:author`
- **Task 13** (2pts): Search by Title (async) - `GET /async/title/:title`

---

## 🚀 How to Run

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm start
```
Or:
```bash
node index.js
```

Server will run on: **http://localhost:5000**

---

## 🧪 Testing All 13 Tasks

### Option 1: Visual Web Interface (Recommended) ⭐
Open the test file in your browser:
```
test.html
```

This provides:
- ✅ Visual representation of all 13 tasks
- 🎯 Real-time score tracking (0-30 points)
- 🔘 Individual test buttons for each task
- 🚀 "Run All Tests" button to test everything at once
- 📊 Detailed success/error messages

### Option 2: API Testing Tools
Use **Postman**, **Thunder Client**, or **curl** to test endpoints manually.

---

## 📋 API Endpoints

### General User Endpoints (No Auth Required)

#### 1. Get All Books
```http
GET http://localhost:5000/
```

#### 2. Get Book by ISBN
```http
GET http://localhost:5000/isbn/9780007350803
```

#### 3. Get Books by Author
```http
GET http://localhost:5000/author/J.R.R. Tolkien
```

#### 4. Get Books by Title
```http
GET http://localhost:5000/title/1984
```

#### 5. Get Book Reviews
```http
GET http://localhost:5000/review/9780007350803
```

### User Registration & Authentication

#### 6. Register New User
```http
POST http://localhost:5000/customer/register
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123"
}
```

#### 7. Login
```http
POST http://localhost:5000/customer/login
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123"
}
```

### Authenticated Endpoints (Requires Login)

#### 8. Add/Modify Review
```http
PUT http://localhost:5000/customer/auth/review/9780007350803?review=Amazing book!
Cookie: connect.sid=<session-cookie>
```

#### 9. Delete Review
```http
DELETE http://localhost:5000/customer/auth/review/9780007350803
Cookie: connect.sid=<session-cookie>
```

### Async/Promise Endpoints

#### 10. Get All Books (Async)
```http
GET http://localhost:5000/async/books
```

#### 11. Search by ISBN (Promises)
```http
GET http://localhost:5000/async/isbn/9780439064873
```

#### 12. Search by Author (Async)
```http
GET http://localhost:5000/async/author/George Orwell
```

#### 13. Search by Title (Async)
```http
GET http://localhost:5000/async/title/Harry Potter and the Chamber of Secrets
```

---

## 📚 Sample Books Database

The project includes 4 sample books:

1. **The Hobbit** by J.R.R. Tolkien (ISBN: 9780007350803)
2. **Harry Potter and the Chamber of Secrets** by J.K. Rowling (ISBN: 9780439064873)
3. **To Kill a Mockingbird** by Harper Lee (ISBN: 9780061120084)
4. **1984** by George Orwell (ISBN: 9780451524935)

---

## 🔒 Authentication Flow

1. **Register** a new user (Task 6)
2. **Login** with credentials (Task 7) - receives JWT token in session
3. **Access protected routes** (Tasks 8 & 9) using session cookie
4. Session expires after 1 hour

---

## 🏗️ Project Structure

```
final_project/
├── index.js                 # Main server file
├── package.json            # Dependencies & scripts
├── test.html              # Visual test interface ⭐
├── test_all_tasks.js      # Node.js test script
├── README.md              # This file
└── router/
    ├── general.js         # General user routes (Tasks 1-5, 10-13)
    ├── auth_users.js      # Authenticated routes (Tasks 6-9)
    └── booksdb.js         # In-memory book database
```

---

## 🛠️ Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **JWT** - Token-based authentication
- **express-session** - Session management
- **Axios** - HTTP client for async/promise tasks

---

## ✨ Features

✅ RESTful API design  
✅ JWT authentication  
✅ Session management  
✅ In-memory data storage  
✅ Async/await patterns  
✅ Promise-based requests  
✅ Error handling  
✅ Comprehensive testing interface  

---

## 📊 Scoring Breakdown

| Category | Tasks | Points |
|----------|-------|--------|
| General Users | 1-5 | 10 |
| Auth & Registration | 6-7 | 6 |
| Registered Users | 8-9 | 4 |
| Async/Promises | 10-13 | 10 |
| **TOTAL** | **13** | **30** |

---

## 🎉 Success Criteria

All 13 tasks should:
- ✅ Return correct HTTP status codes
- ✅ Return proper JSON responses
- ✅ Handle errors gracefully
- ✅ Implement authentication correctly
- ✅ Use async/await or promises as specified

---

## 📝 Notes

- Users are stored in memory (will reset on server restart)
- Reviews are stored per-user and can be modified/deleted
- Session expires after 1 hour of inactivity
- All endpoints return JSON responses

---

## 👨‍💻 Development

To add more books, edit `router/booksdb.js`:
```javascript
books["ISBN"] = {
  title: "Book Title",
  author: "Author Name",
  reviews: {}
};
```

---

## 🐛 Troubleshooting

**Server won't start:**
- Ensure port 5000 is not in use
- Run `npm install` to install dependencies

**Authentication fails:**
- Check that you've registered the user first
- Verify the session cookie is being sent

**Test page doesn't work:**
- Ensure server is running on port 5000
- Check browser console for CORS errors

---

## 📞 Support

If you encounter any issues:
1. Check that the server is running
2. Verify all dependencies are installed
3. Open `test.html` in your browser to visually test all endpoints

---

**🎓 Final Project - 30/30 Points Available**
