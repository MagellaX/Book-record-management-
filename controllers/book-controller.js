const {BookModel } = require("../models");
const {IssuedBook} = require("../dtos/book-dto");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await BookModel.find();
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getSingleBookById = async (req, res) => {
  try {
    const book = await BookModel.findById(req.params.id);
    res.status(200).json({ success: true, data: book });
  } catch (error) {
    res.status(404).json({ success: false, message: "Book not found" });
  }
};

exports.getAllIssuedBooks = async (req, res) => {
  try {
    const issuedBooks = await BookModel.find({ issuedBook: { $exists: true } }).populate("issuedBook");
    res.status(200).json({ success: true, data: issuedBooks });
  } catch (error) {
    res.status(404).json({ success: false, message: "No books have been issued" });
  }
};

exports.addNewBook = async (req, res) => {
  try {
    const { data } = req.body;
    const book = await BookModel.create(data);
    res.status(200).json({ success: true, data: book });
  } catch (error) {
    res.status(400).json({ success: false, error: "Invalid data provided" });
  }
};

exports.updateBookById = async (req, res) => {
  try {
    const updatedBook = await BookModel.findByIdAndUpdate(req.params.id, req.body.data, { new: true });
    res.status(200).json({ success: true, data: updatedBook });
  } catch (error) {
    res.status(404).json({ success: false, message: "Book not found" });
  }
};
