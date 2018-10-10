
module.exports = function (sequelize, DataTypes) {

  const GeoDataSet = sequelize.define("GeoDataSet", {
    /*
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    */
    

    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  GeoDataSet.associate = function(models) {

  GeoDataSet.belongsTo(models.user, {
  	foreignKey: {
      allowNull: true,
      defaultValue: 0
  	},
    });

  GeoDataSet.hasMany(models.Events, {
  	onDelete: "cascade"
    });

  };

  return GeoDataSet;
};
