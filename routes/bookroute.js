module.exports = app => {
    const Book = require("../controller/BookController");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", Book.create);

    // Retrieve all Book
    router.get("/", Book.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:id", Book.findOne);

    // Update a Tutorial with id
    router.put("/:id", Book.update);

    // Delete a Tutorial with id
    router.delete("/:id", Book.delete);

    // Create a new Tutorial
    router.delete("/", Book.deleteAll);

    app.use('/api/Book', router);
};