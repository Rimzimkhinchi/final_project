const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = []; // This should be updated when users are registered

const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from header

  if (!token) {
    return res.status(401).json({ message: "Access token is required" });
  }

  jwt.verify(token, 'your_jwt_secret_key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user; // Attach user info to request
    next();
  });
}

const isValid = (username) => {
  // Check if username exists in the users array
  return users.some(user => user.username === username);
}

const authenticatedUser = (username, password) => {
  return users.some(user => user.username === username && user.password === password);
}

// Register a new user
regd_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  if (isValid(username)) {
    return res.status(400).json({ message: "Username already exists." });
  }

  // Add user to the users array
  users.push({ username, password });

  return res.status(201).json({ message: "User registered successfully." });
});

// Only registered users can login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  // Check if the user is valid
  if (!isValid(username)) {
    return res.status(401).json({ message: "Invalid username." });
  }

  // Check if the username and password match
  if (!authenticatedUser(username, password)) {
    return res.status(401).json({ message: "Invalid password." });
  }

  // Create a JWT token
  const token = jwt.sign({ username }, 'your_jwt_secret_key', { expiresIn: '1h' });

  // Send the token in the response
  res.status(200).json({ token });
});

// Add a book review
regd_users.put("/auth/review/:isbn", isAuthenticated, (req, res) => { // Use authentication middleware
  const { isbn } = req.params;
  const { review } = req.body;

  // Check if review and ISBN are provided
  if (!review || !isbn) {
    return res.status(400).json({ message: "Review and ISBN are required." });
  }

  // Check if the book exists
  if (books[isbn]) {
    // Ensure reviews object exists
    if (!books[isbn].reviews) {
      books[isbn].reviews = {};
    }

    // Add or update the review for the given ISBN
    books[isbn].reviews[req.user.username] = review;
    return res.status(200).json({ message: "Review added/updated successfully." });
  } else {
    return res.status(404).json({ message: "Book not found." });
  }
});


regd_users.delete("/auth/review/:isbn", isAuthenticated, (req, res) => {
  const { isbn } = req.params;

  if (!isbn) {
    return res.status(400).json({ message: "ISBN is required." });
  }

  if (books[isbn]) {
    if (books[isbn].reviews[req.user.username]) {
      delete books[isbn].reviews[req.user.username];
      return res.status(200).json({ message: "Review deleted successfully." });
    } else {
      return res.status(404).json({ message: "Review not found for the user." });
    }
  } else {
    return res.status(404).json({ message: "Book not found." });
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;















// const express = require('express');
// const jwt = require('jsonwebtoken');
// let books = require("./booksdb.js");
// const regd_users = express.Router();

// let users = []; // This should be updated when users are registered


// const isAuthenticated = (req, res, next) => {
//   const token = req.headers['authorization'];

//   if (!token) {
//     return res.status(401).json({ message: "Access token is required" });
//   }

//   jwt.verify(token, 'your_jwt_secret_key', (err, user) => {
//     if (err) {
//       return res.status(403).json({ message: "Invalid token" });
//     }
//     req.user = user;
//     next();
//   });
// };






// const isValid = (username) => {
//   // Check if username exists in the users array
//   return users.some(user => user.username === username);
// }

// const authenticatedUser = (username, password) => {
//   return users.some(user => user.username === username && user.password === password);
// }

// // Register a new user
// regd_users.post("/register", (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ message: "Username and password are required." });
//   }

//   if (isValid(username)) {
//     return res.status(400).json({ message: "Username already exists." });
//   }

//   // Add user to the users array
//   users.push({ username, password });

//   return res.status(201).json({ message: "User registered successfully." });
// });

// //only registered users can login
// regd_users.post("/login", (req, res) => {
//   const { username, password } = req.body;

//   // Check if username and password are provided
//   if (!username || !password) {
//     return res.status(400).json({ message: "Username and password are required." });
//   }

//   // Check if the user is valid
//   if (!isValid(username)) {
//     return res.status(401).json({ message: "Invalid username." });
//   }

//   // Check if the username and password match
//   if (!authenticatedUser(username, password)) {
//     return res.status(401).json({ message: "Invalid password." });
//   }

//   // Create a JWT token
//   const token = jwt.sign({ username }, 'your_jwt_secret_key', { expiresIn: '1h' });

//   // Send the token in the response
//   res.status(200).json({ token });
// });

// // Add a book review
// regd_users.put("/auth/review/:isbn", (req, res) => {
//   const { isbn } = req.params;
//   const { review } = req.body;

//   // Check if review and ISBN are provided
//   if (!review || !isbn) {
//     return res.status(400).json({ message: "Review and ISBN are required." });
//   }

//   // Add or update the review for the given ISBN
//   if (books[isbn]) {
//     books[isbn].reviews[req.user.username] = review;
//     return res.status(200).json({ message: "Review added successfully." });
//   } else {
//     return res.status(404).json({ message: "Book not found." });
//   }
// });

// module.exports.authenticated = regd_users;
// module.exports.isValid = isValid;
// module.exports.users = users;


















































// const express = require('express');
// const jwt = require('jsonwebtoken');
// let books = require("./booksdb.js");
// const regd_users = express.Router();

// let users = [];

// const isValid = (username) => {
//   // Check if username exists in the users array
//   return users.some(user => user.username === username);
// }

// const authenticatedUser = (username, password) => {
//   // Check if the username and password match the ones in the users array
//   return users.some(user => user.username === username && user.password === password);
// }


// //only registered users can login
// regd_users.post("/login", (req, res) => {
//   const { username, password } = req.body;

//   // Check if username and password are provided
//   if (!username || !password) {
//     return res.status(400).json({ message: "Username and password are required." });
//   }

//   // Check if the user is valid
//   if (!isValid(username)) {
//     return res.status(401).json({ message: "Invalid username." });
//   }

//   // Check if the username and password match
//   if (!authenticatedUser(username, password)) {
//     return res.status(401).json({ message: "Invalid password." });
//   }

//   // Create a JWT token
//   const token = jwt.sign({ username }, 'your_jwt_secret_key', { expiresIn: '1h' });

//   // Send the token in the response
//   res.status(200).json({ token });
// });


// // Add a book review
// regd_users.put("/auth/review/:isbn", (req, res) => {
//   const { isbn } = req.params;
//   const { review } = req.body;

//   // Check if review and ISBN are provided
//   if (!review || !isbn) {
//     return res.status(400).json({ message: "Review and ISBN are required." });
//   }

//   // Add or update the review for the given ISBN
//   if (books[isbn]) {
//     books[isbn].reviews[req.user.username] = review;
//     return res.status(200).json({ message: "Review added successfully." });
//   } else {
//     return res.status(404).json({ message: "Book not found." });
//   }
// });

// module.exports.authenticated = regd_users;
// module.exports.isValid = isValid;
// module.exports.users = users;







