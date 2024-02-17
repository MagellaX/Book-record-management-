class IssuedBook {
  constructor(user) {
    const { _id, name, genre, price, publisher, issuedBy, issuedDate, returnDate } = user.issuedBook;
    this._id = _id;
    this.name = name;
    this.genre = genre;
    this.price = price;
    this.publisher = publisher;
    this.issuedBy = issuedBy;
    this.issuedDate = issuedDate;
    this.returnDate = returnDate;
  }
}

module.exports = IssuedBook;
