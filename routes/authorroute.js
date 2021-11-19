module.exports = app => {
    const Author = require("../controller/AuthorController");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", Author.create);

    // Retrieve all Author
    router.get("/", Author.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:id", Author.findOne);

    // Update a Tutorial with id
    router.put("/:id", Author.update);

    // Delete a Tutorial with id
    router.delete("/:id", Author.delete);

    // Create a new Tutorial
    router.delete("/", Author.deleteAll);

    app.use('/api/Author', router);
};