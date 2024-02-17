const express = require("express");
const router = express.Router();

const { BookModel } = require("../models");
const bookController = require("../controllers/book-controller");

// Define routes
router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getSingleBookById);
router.get("/issued/by-user", bookController.getAllIssuedBooks);
router.post("/", bookController.addNewBook);
router.put("/:id", bookController.updateBookById);

module.exports = router;
