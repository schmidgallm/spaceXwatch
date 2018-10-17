
module.exports = function(sequelize, Sequelize) {

	const User = sequelize.define('user', {
		id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
		username: {type:Sequelize.STRING,allowNull: false, validate: { len: [1] }},
		email: {type:Sequelize.STRING, allowNull: false,  validate: { isEmail: { msg: "Must be a valid email address" } }},
		password : {type: Sequelize.STRING,allowNull: false, validate: { len: [6] } }, 
		last_login: {type: Sequelize.DATE},
        status: {type: Sequelize.ENUM('active','inactive'),defaultValue:'active' }
});

User.associate = function(models) {
      // Associating Users with other tables
      User.hasMany(models.GeoDataSet, {
        onDelete: "cascade"
      });
    };

	return User;
}
