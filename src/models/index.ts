import { Sequelize } from "sequelize";
import { config } from "../config";

const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPassword, {
	host: config.dbHost,
	port: config.dbPort,
	dialect: "postgres",
	logging: false,
	define: {
		timestamps: false
	}
});

export default sequelize;
