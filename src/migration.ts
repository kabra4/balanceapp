import { Umzug, SequelizeStorage } from "umzug";
import sequelize from "./models/index";
import { Sequelize } from "sequelize";

const umzug = new Umzug({
	migrations: {
		glob: "src/migrations/*.ts",
		resolve: ({ name, path, context }) => {
			const migration = require(path || "");
			return {
				name,
				up: async () => migration.up(context, Sequelize),
				down: async () => migration.down(context, Sequelize)
			};
		}
	},
	context: sequelize.getQueryInterface(),
	storage: new SequelizeStorage({ sequelize }),
	logger: console
});

export const up = async () => {
	await sequelize.authenticate();
	return umzug.up();
};

export const down = async () => {
	await sequelize.authenticate();
	return umzug.down();
};
