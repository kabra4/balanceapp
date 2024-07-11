import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
	up: async (queryInterface: QueryInterface) => {
		await queryInterface.createTable("task_history", {
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
			taskName: {
				type: DataTypes.STRING,
				allowNull: false
			},
			serverId: {
				type: DataTypes.STRING,
				allowNull: false
			},
			startTime: {
				type: DataTypes.DATE,
				allowNull: false
			},
			endTime: {
				type: DataTypes.DATE,
				allowNull: false
			}
		});
	},
	down: async (queryInterface: QueryInterface) => {
		await queryInterface.dropTable("task_history");
	}
};
