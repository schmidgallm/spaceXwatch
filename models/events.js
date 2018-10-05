module.exports = function(sequelize, DataTypes) {
	
    const Events = sequelize.define("Events", {
      name: {
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
      },
	  
	  desc: {
        type: DataTypes.STRING(2000),
        allowNull: false,
        validate: {
          len: [1]
        }
      },
	  
	  lat: {
        type: DataTypes.DECIMAL(9,6),
        allowNull: false,
        validate: {
          len: [1],
		  isNumeric: true
        }
      },
	  
	  lon: {
        type: DataTypes.DECIMAL(9,6),
        allowNull: false,
        validate: {
          len: [1],
		  isNumeric: true
        }
      }
	  
	  
    });
  
    Events.associate = function(models) {
		
		Events.belongsTo(models.GeoDataSet, {
			foreignKey: {
			  allowNull: false,
			},
      });
      
    };
  
    return Events;
  };