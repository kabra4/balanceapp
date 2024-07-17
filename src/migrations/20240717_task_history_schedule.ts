import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
	up: async (queryInterface: QueryInterface) => {
		// Create ENUM for status
		await queryInterface.sequelize.query(
			`CREATE TYPE "enum_task_history_status" AS ENUM('Pending', 'In progress', 'Finished');`
		);

		await queryInterface.addColumn("task_history", "schedule", {
			type: DataTypes.STRING,
			allowNull: false
		});

		// Adding the status column with the new ENUM type
		await queryInterface.addColumn("task_history", "status", {
			type: "enum_task_history_status",
			allowNull: false,
			defaultValue: "Pending"
		});

		await queryInterface.changeColumn("task_history", "serverId", {
			type: DataTypes.STRING,
			allowNull: true
		});
		await queryInterface.changeColumn("task_history", "taskName", {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		});

		await queryInterface.changeColumn("task_history", "startTime", {
			type: DataTypes.DATE,
			allowNull: true
		});

		await queryInterface.changeColumn("task_history", "endTime", {
			type: DataTypes.DATE,
			allowNull: true
		});
	},

	down: async (queryInterface: QueryInterface) => {
		await queryInterface.removeColumn("task_history", "schedule");
		await queryInterface.removeColumn("task_history", "status");

		// Drop ENUM type
		await queryInterface.sequelize.query(`DROP TYPE "enum_task_history_status";`);

		await queryInterface.changeColumn("task_history", "taskName", {
			type: DataTypes.STRING,
			allowNull: false,
			unique: false
		});

		await queryInterface.changeColumn("task_history", "serverId", {
			type: DataTypes.STRING,
			allowNull: false
		});

		await queryInterface.changeColumn("task_history", "startTime", {
			type: DataTypes.DATE,
			allowNull: false
		});

		await queryInterface.changeColumn("task_history", "endTime", {
			type: DataTypes.DATE,
			allowNull: false
		});
	}
};
