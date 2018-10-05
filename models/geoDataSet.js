module.exports = function(sequelize, DataTypes) {
	
    const GeoDataSet = sequelize.define("GeoDataSet", {
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
			},
      });
	  
		GeoDataSet.hasMany(models.Events, {
			onDelete: "cascade"
      });
      
    };
  
    return GeoDataSet;
  };