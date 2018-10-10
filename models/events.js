module.exports = function(sequelize, DataTypes) {
	
    const Events = sequelize.define("Events", {
       name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },

    flightNumber: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
	  unique: {
		args: true,
		msg: 'Event found in database'
		}
    },

    flightYear: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    image: {
      type: DataTypes.STRING,
    },

    desc: {
      type: DataTypes.STRING(2000),
    },

    lat: {
      type: DataTypes.DECIMAL(9, 6),
      allowNull: false,
      validate: {
        len: [1]
      }
    },

    lon: {
      type: DataTypes.DECIMAL(9, 6),
      allowNull: false,
      validate: {
        len: [1]
      }
    }

  });

  Events.associate = function (models) {

    Events.belongsTo(models.GeoDataSet, {
      foreignKey: {
        allowNull: false,
      },
    });

  };

  return Events;
};