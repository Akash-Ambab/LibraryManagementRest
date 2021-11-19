
module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define('genres', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    genreType: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  });

  return Genre;
};