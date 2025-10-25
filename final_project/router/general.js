const express = require('express');
const axios = require('axios');
let books = require('./booksdb.js');
let public_users = express.Router();

/**
 * TASK 1 - Get all books
 */
public_users.get('/', function (req, res) {
  return res.status(200).send(JSON.stringify(books, null, 4));
});

/**
 * TASK 2 - Get book by ISBN
 */
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book) {
    return res.status(200).send(book);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

/**
 * TASK 3 - Get books by author
 */
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  const booksByAuthor = Object.values(books).filter(b => (b.author||'').toLowerCase() === author.toLowerCase());
  if (booksByAuthor.length > 0) {
    return res.status(200).send(booksByAuthor);
  } else {
    return res.status(404).json({ message: "No books found for this author" });
  }
});

/**
 * TASK 4 - Get books by title
 */
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  const booksByTitle = Object.values(books).filter(b => (b.title||'').toLowerCase() === title.toLowerCase());
  if (booksByTitle.length > 0) {
    return res.status(200).send(booksByTitle);
  } else {
    return res.status(404).json({ message: "No books found with this title" });
  }
});

/**
 * TASK 5 - Get reviews for a book
 */
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book && book.reviews) {
    return res.status(200).send(book.reviews);
  } else {
    return res.status(404).json({ message: "No reviews found" });
  }
});

/**
 * TASKS 10–13 - Async/Await or Promises version using Axios
 * These call back into this service to demonstrate async flows.
 */

// Task 10 - Get all books (async)
public_users.get('/async/books', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:5000/');
    return res.status(200).send(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books" });
  }
});

// Task 11 - Get by ISBN (Promises)
public_users.get('/async/isbn/:isbn', (req, res) => {
  const { isbn } = req.params;
  axios.get(`http://localhost:5000/isbn/${isbn}`)
    .then(response => res.status(200).send(response.data))
    .catch(err => res.status(500).json({ message: "Error fetching book by ISBN" }));
  });

// Task 12 - Get by Author (async)
public_users.get('/async/author/:author', async (req, res) => {
  try {
    const { author } = req.params;
    const response = await axios.get(`http://localhost:5000/author/${author}`);
    return res.status(200).send(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books by author" });
  }
});

// Task 13 - Get by Title (async)
public_users.get('/async/title/:title', async (req, res) => {
  try {
    const { title } = req.params;
    const response = await axios.get(`http://localhost:5000/title/${title}`);
    return res.status(200).send(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books by title" });
  }
});

module.exports.general = public_users;
