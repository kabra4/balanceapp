import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
	up: async (queryInterface: QueryInterface) => {
		await queryInterface.createTable("users", {
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
			balance: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0
			}
		});
	},
	down: async (queryInterface: QueryInterface) => {
		await queryInterface.dropTable("users");
	}
};
