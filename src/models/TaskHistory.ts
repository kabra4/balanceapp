import { Sequelize, Model, DataTypes } from "sequelize";
import sequelize from "./index.js";

export class TaskHistory extends Model {
	//public id!: number;
	//public taskName!: string;
	//public serverId!: string;
	//public startTime!: string;
}
export class User extends Model {
	public id!: number;
	public balance!: number;
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
	},
	{
		sequelize,
		tableName: "task_history",
		timestamps: false // Assuming we are managing timestamps manually
	}
);

export default TaskHistory;
