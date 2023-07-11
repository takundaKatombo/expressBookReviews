const express = require('express');

let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username)=>{
  let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}


public_users.post("/register", (req, res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});});

// Get the book list available in the shop

var Promise = require('promise');
public_users.get('/', function (req, res) {
  //  {};
  //Write your code here
  
    return new Promise((resolve, reject) => {
       require("./booksdb.js").done(function (res) {
        try {
          resolve(res.send(JSON.stringify(res)));
        } catch (error) {
          reject(error)
        }
       })
      // try {
      //     resolve(res.send(JSON.stringify(books)));

      // } catch (error) {
      //   reject(error);
      // }
    })
  
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  //Write your code here
  let isbnNum = req.params.isbn;

  return res.send(JSON.stringify(books[isbnNum]));
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  //Write your code here
  let requestedAuthor = req.params.author;
  let authorBooks = {};
  Object.keys(books).forEach((key) => {
    if (books[key].author ===requestedAuthor) {
      authorBooks[key] = books[key];
    }
  });
  return res.send(JSON.stringify(authorBooks));
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  //Write your code here
let requestedTitle = req.params.title;
  let titleBooks = {};
  Object.keys(books).forEach((key) => {
    if (books[key].title ===requestedTitle) {
      titleBooks[key] = books[key];
    }
  });
  return res.send(JSON.stringify(titleBooks));});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  //Write your code here
 let isbnNum = req.params.isbn;

  return res.send(JSON.stringify(books[isbnNum].reviews));
});

module.exports.general = public_users;
