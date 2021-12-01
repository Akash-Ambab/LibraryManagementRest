const db = require("../models"); // models path depend on your structure
const Book = db.Book;
const Author = db.Author;
const BookAuthor = db.BookAuthor;

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const book = {
        bookName: req.body.bookName,
        description: req.body.description,
        authorId: req.body.authorId,
        genre: req.body.genre,
        price: req.body.price,
        language: req.body.language,
        totalPages: req.body.totalPages,
        rating: req.body.rating,
        edition: req.body.edition,
        publication: req.body.publication,
        released_on: req.body.released_on
    };

    checkAuthor(book.authorId).then(isUnique => {
        if (isUnique) {
            Book.create(book)
            .then(data => {
                addToBookAuthor(data.id, book.authorId);
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                    err.message || "Some error occurred while creating the book."
                });
            });
        }

        else {
            res.status(500).send({
                message: "Author Not Exist"
            });
        }
    });
    
};

const checkAuthor = (authorId) => {
    return Author.count({ where: { id: authorId } })
            .then(count => {
                if (count != 0) {
                    return true;
                }
                return false;
            });
}

const addToBookAuthor = (bookId, authorId) => {
    BookAuthor.create({
        bookId: bookId,
        authorId: authorId
    })
}

const updateToBookAuthor = (bookId, authorId) => {
    BookAuthor.update({
        authorId: authorId
    }, {
        where: { bookId: bookId }
    })
}

exports.findAll = (req, res) => {
    // const bookName = req.query.bookName;
    // var condition = bookName ? { bookName: { [Op.like]: `%${bookName}%` } } : null;

    // const search = req.query.search;
    // var condition = search ? { 
    //         bookName: { [Op.like]: `%${search}%` },
    //         $or: {
    //            id: { [Op.like]: `%${search}%` }
    //         }
    // } : null;

    Book.findAll()
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

    Book.findByPk(id)
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

    // Book.update(req.body, {
    //     where: { id: id }
    // })
    // .then(num => {
    //     if (num == 1) {
    //         res.send({
    //             message: "Book was updated successfully."
    //         });
    //     } else {
    //         res.send({
    //             message: `Cannot update Book with id=${id}. Maybe Book was not found or req.body is empty!`
    //         });
    //     }
    // })
    // .catch(err => {
    //     res.status(500).send({
    //         message: "Error updating Book with id=" + id
    //     });
    // });

    checkAuthor(req.body.authorId).then(isUnique => {
        if (isUnique) {
            Book.update(req.body, {
                where: { id: id }
            })
            .then(num => {
                if (num == 1) {
                    updateToBookAuthor(id, req.body.authorId);
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
                    message:
                    err.message || "Some error occurred while creating the book."
                });
            });
        }
        else {
            res.status(500).send({
                message: "Author Not Exist"
            });
        }
    });
};


exports.delete = (req, res) => {
    const id = req.params.id;

    Book.destroy({
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
    Book.destroy({
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
    res.send({ message: `Book were deleted successfully!` })
}