const db = require("../models"); // models path depend on your structure

module.exports = (sequelize, DataTypes) => {
    const BookAuthor = sequelize.define('book_author', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
    }, {timestamps: false});
  
    return BookAuthor;
  };