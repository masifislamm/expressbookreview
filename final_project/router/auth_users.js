const express = require('express');
const jwt = require('jsonwebtoken');
let books = require('./booksdb.js');
const regd_users = express.Router();

// In-memory user store
let users = [];

// Check if username exists
const isValid = (username) => {
  return users.some(u => u.username === username);
};

// Check username/password
const authenticatedUser = (username, password) => {
  return users.some(u => u.username === username && u.password === password);
};

/**
 * TASK 6 - Register new user
 * POST /customer/register
 */
regd_users.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }
  if (isValid(username)) {
    return res.status(409).json({ message: "User already exists" });
  }
  users.push({ username, password });
  return res.status(200).json({ message: "User successfully registered" });
});

/**
 * TASK 7 - Login user (JWT in session)
 * POST /customer/login
 */
regd_users.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!authenticatedUser(username, password)) {
    return res.status(401).json({ message: "Invalid login credentials" });
  }
  let accessToken = jwt.sign({ username }, 'access', { expiresIn: '1h' });
  req.session.authorization = { accessToken, username };
  return res.status(200).json({ message: "Login successful", token: accessToken });
});

/**
 * TASK 8 - Add or modify a review
 * PUT /customer/auth/review/:isbn?review=Your+text
 */
regd_users.put('/auth/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review;
  const username = req.session.authorization?.username;

  if (!username) return res.status(403).json({ message: "Not authenticated" });
  if (!review) return res.status(400).json({ message: "Review text required" });
  if (!books[isbn]) return res.status(404).json({ message: "Book not found" });

  books[isbn].reviews = books[isbn].reviews || {};
  books[isbn].reviews[username] = review;
  return res.status(200).json({ message: "Review added/updated successfully" });
});

/**
 * TASK 9 - Delete a review authored by the logged-in user
 * DELETE /customer/auth/review/:isbn
 */
regd_users.delete('/auth/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.authorization?.username;

  if (!username) return res.status(403).json({ message: "Not authenticated" });
  if (!books[isbn]) return res.status(404).json({ message: "Book not found" });

  if (books[isbn].reviews && books[isbn].reviews[username]) {
    delete books[isbn].reviews[username];
    return res.status(200).json({ message: "Review deleted successfully" });
  } else {
    return res.status(404).json({ message: "No review by this user for this ISBN" });
  }
});

module.exports.authenticated = regd_users;
module.exports.users = users;
