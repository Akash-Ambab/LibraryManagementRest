const db = require("../models"); // models path depend on your structure
const BookAuthor = db.BookAuthor;

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const book_author = {
    bookId: req.body.bookId,
    authorId: req.body.authorId
  };

  BookAuthor.create(book_author)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the book."
      });
    });
};

exports.findAll = (req, res) => {
    // const bookName = req.query.bookName;
    // var condition = bookName ? { bookName: { [Op.like]: `%${bookName}%` } } : null;
  
    BookAuthor.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving Books."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    BookAuthor.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message: "Error retrieving Book with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    BookAuthor.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Book was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Book with id=${id}. Maybe Book was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Book with id=" + id
        });
    });
};


exports.delete = (req, res) => {
    const id = req.params.id;
  
    BookAuthor.destroy({
      where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Book was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Book with id=${id}. Maybe Book was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Book with id=" + id
        });
    });
};


exports.deleteAll = (req, res) => {
    BookAuthor.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Book were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Books."
        });
      });
  };

exports.test = (req, res) => {
    res.send({message: `Book were deleted successfully!`})
}