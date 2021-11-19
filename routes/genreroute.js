module.exports = app => {
    const Genre = require("../controller/GenreController");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", Genre.create);

    // Retrieve all Genre
    router.get("/", Genre.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:id", Genre.findOne);

    // Update a Tutorial with id
    router.put("/:id", Genre.update);

    // Delete a Tutorial with id
    router.delete("/:id", Genre.delete);

    // Create a new Tutorial
    router.delete("/", Genre.deleteAll);

    app.use('/api/Genre', router);
};