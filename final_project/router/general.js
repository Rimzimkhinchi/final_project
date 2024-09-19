const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');







// Async-await example to get the list of books
// const getBooksAsync = async () => {
//   try {
//     const response = await axios.get('http://localhost:5000/'); // Corrected URL
//     console.log('Books list:', response.data);
//     return response.data; // Handle the data as needed
//   } catch (error) {
//     console.error('Error fetching the list of books:', error.message);
//     throw error;
//   }
// };

// Call the async function
// getBooksAsync();
//-------------------------------------------------------------------------------------//
// // Async-await example to get the list of books
const getBooksAsyncdets = async (isbn) => {
  try {
    const response = await axios.get(`http://localhost:5000/isbn/${isbn}`); // Corrected URL
    console.log('Books fetching by title:', response.data);
    return response.data; // Handle the data as needed
  } catch (error) {
    console.error('Error fetching the list of books:', error.message);
    throw error;
  }
};

// // Call the async function
getBooksAsyncdets(1);
// // Promise callback example to get the list of books
const getBooksWithPromise = (isbn) => {
  axios.get(`http://localhost:5000/isbn/${isbn}`) // Corrected URL
    .then((response) => {
      console.log('Books fetching by title:', response.data);
    })
    .catch((error) => {
      console.error('Error fetching the list of books:', error.message);
    });
};

// // Call the function
getBooksWithPromise(1);

const getBooksByAuthorAsync = async (author) => {
 
};
const getBooksByAuthorWithPromise = (author) => {
  
};

//--------------------------------------------------------------------------------//

const getBooksByAuthorAsyn = async (author) => {
  try {
    const response = await axios.get(`http://localhost:5000/books/author/${author}`);
    console.log('Books by author:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching books by author:', error.message);
    throw error;
  }
};

getBooksByAuthorAsync('Hans Christian Andersen');

const getBooksByAuthorWithPromis = (author) => {
  axios.get(`http://localhost:5000/books/author/${author}`)
    .then((response) => {
      console.log('Books by author:', response.data);
    })
    .catch((error) => {
      console.error('Error fetching books by author:', error.message);
    });
};

getBooksByAuthorWithPromise('Hans Christian Andersen');

//------------------------------------------------------------------------------//

// Register a new user
// public_users.post("/register", (req, res) => {
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

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  return res.status(200).json(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  
  if (book) {
    return res.status(200).json(book);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

// Get book details based on author
// public_users.get('/author/:author', function (req, res) {
//   const authorName = req.params.author;
//   let booksByAuthor = [];

//   for (let key in books) {
//     if (books[key].author.toLowerCase() === authorName.toLowerCase()) {
//       booksByAuthor.push(books[key]);
//     }
//   }

//   if (booksByAuthor.length > 0) {
//     res.json(booksByAuthor);
//   } else {
//     res.status(404).json({ message: "No books found by this author" });
//   }
// });

// Get all books based on title
// public_users.get('/title/:title', function (req, res) {
//   const title = req.params.title;
//   let booksByTitle = [];

//   for (let key in books) {
//     if (books[key].title.toLowerCase() === title.toLowerCase()) {
//       booksByTitle.push(books[key]);
//     }
//   }

//   if (booksByTitle.length > 0) {
//     res.json(booksByTitle);
//   } else {
//     res.status(404).json({ message: "No books found with this title" });
//   }
// });

// // Get book review
// public_users.get('/review/:isbn', function (req, res) {
//   const isbn = req.params.isbn;

//   if (books[isbn]) {
//     const reviews = books[isbn].reviews;
//     res.json(reviews);
//   } else {
//     res.status(404).json({ message: "Book not found with this ISBN" });
//   }
// });

module.exports.general = public_users;



















