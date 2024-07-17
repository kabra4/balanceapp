import { Sequelize, Model, DataTypes } from "sequelize";
import sequelize from "./index.js";

export class TaskHistory extends Model {
	public id!: number;
	public taskName!: string;
	public serverId!: string;
	public startTime!: string;
	public endTime!: string;
	public schedule!: string;
	public status!: string;
}

TaskHistory.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		taskName: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		serverId: {
			type: DataTypes.STRING,
			allowNull: true
		},
		startTime: {
			type: DataTypes.DATE,
			allowNull: true
		},
		endTime: {
			type: DataTypes.DATE,
			allowNull: true
		},
		schedule: {
			type: DataTypes.STRING,
			allowNull: false
		},
		status: {
			type: DataTypes.ENUM("Pending", "In progress", "Finished"),
			allowNull: false,
			defaultValue: "Pending" // Default status is 'Pending'
		}
	},
	{
		sequelize,
		tableName: "task_history",
		timestamps: false
	}
);

export default TaskHistory;
