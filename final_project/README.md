# Final Project - Book Review Application

This is a complete implementation for the Express + JWT + Session-based Book Review API.

## Run Locally

```bash
cd expressBookReviews/final_project
npm install
npm run dev   # or: npm start
```

Server starts on `http://localhost:5000`.

## Endpoints

### Public
- `GET /` — all books
- `GET /isbn/:isbn` — book by ISBN
- `GET /author/:author` — books by author
- `GET /title/:title` — books by title
- `GET /review/:isbn` — reviews for ISBN

### Async variants (Axios)
- `GET /async/books`
- `GET /async/isbn/:isbn`
- `GET /async/author/:author`
- `GET /async/title/:title`

### Auth
- `POST /customer/register` — { username, password }
- `POST /customer/login` — { username, password } (stores JWT in session)
- `PUT /customer/auth/review/:isbn?review=Your+text`
- `DELETE /customer/auth/review/:isbn`

## Notes
- Users are stored in-memory for demo purposes (not persisted).
- Reviews are stored under each book keyed by username.
