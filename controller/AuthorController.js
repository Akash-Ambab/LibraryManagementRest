const db = require("../models"); // models path depend on your structure
const Author = db.Author;

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const author = {
    authorName: req.body.authorName,
    email: req.body.email,
  };

  Author.create(author)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Author."
      });
    });
};

exports.findAll = (req, res) => {
    // const AuthorName = req.query.AuthorName;
    // var condition = AuthorName ? { AuthorName: { [Op.like]: `%${AuthorName}%` } } : null;
  
    Author.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving Authors."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Author.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message: "Error retrieving Author with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Author.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Author was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Author with id=${id}. Maybe Author was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Author with id=" + id
        });
    });
};


exports.delete = (req, res) => {
    const id = req.params.id;
  
    Author.destroy({
      where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Author was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Author with id=${id}. Maybe Author was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Author with id=" + id
        });
    });
};


exports.deleteAll = (req, res) => {
    Author.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Author were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Authors."
        });
      });
  };

exports.test = (req, res) => {
    res.send({message: `Author were deleted successfully!`})
}