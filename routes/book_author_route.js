module.exports = app => {
    const BookAuthor = require("../controller/BookAuthorController");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", BookAuthor.create);

    // Retrieve all BookAuthor
    router.get("/", BookAuthor.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:id", BookAuthor.findOne);

    // Update a Tutorial with id
    router.put("/:id", BookAuthor.update);

    // Delete a Tutorial with id
    router.delete("/:id", BookAuthor.delete);

    // Create a new Tutorial
    router.delete("/", BookAuthor.deleteAll);

    app.use('/api/BookAuthor', router);
};