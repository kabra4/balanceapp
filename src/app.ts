import express from "express";
import { User } from "./models/User";
import { up } from "./migration";
import sequelize from "./models";

const app = express();
app.use(express.json());

app.post("/user/:id/balance", async (req, res) => {
	const { id } = req.params;
	const { amount } = req.body;

	const transaction = await sequelize.transaction();
	try {
		let user = await User.findByPk(id, { transaction });
		if (user && user.balance + amount >= 0) {
			user.balance += amount;
			await user.save({ transaction });
			await transaction.commit();
			res.send(user);
		} else {
			await transaction.rollback();
			res.status(400).send("Insufficient balance");
		}
	} catch (error) {
		await transaction.rollback();
		if (error instanceof Error) {
			res.status(500).send(error.message);
		} else {
			res.status(500).send("An unexpected error occurred");
		}
	}
});

const run = async () => {
	await up();
	await User.findOrCreate({
		where: { id: 1 },
		defaults: { balance: 10000 }
	});

	app.listen(3000, () => console.log(`Server running on http://localhost:3000`));
};

run().catch(console.error);
