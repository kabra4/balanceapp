import { DataTypes, Model } from "sequelize";
import sequelize from "./index";

export class User extends Model {
	public id!: number;
	public balance!: number;
}

User.init(
	{
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
	},
	{
		sequelize,
		tableName: "users"
	}
);
