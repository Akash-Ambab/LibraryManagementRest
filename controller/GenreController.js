const db = require("../models"); // models path depend on your structure
const Genre = db.Genre;

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const genre = {
    genreType: req.body.genreType,
  };

  Genre.create(genre)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Genre."
      });
    });
};

exports.findAll = (req, res) => {
    // const GenreName = req.query.GenreName;
    // var condition = GenreName ? { GenreName: { [Op.like]: `%${GenreName}%` } } : null;
  
    Genre.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving Genres."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Genre.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message: "Error retrieving Genre with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Genre.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Genre was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Genre with id=${id}. Maybe Genre was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Genre with id=" + id
        });
    });
};


exports.delete = (req, res) => {
    const id = req.params.id;
  
    Genre.destroy({
      where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Genre was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Genre with id=${id}. Maybe Genre was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Genre with id=" + id
        });
    });
};


exports.deleteAll = (req, res) => {
    Genre.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Genre were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Genres."
        });
      });
  };

exports.test = (req, res) => {
    res.send({message: `Genre were deleted successfully!`})
}