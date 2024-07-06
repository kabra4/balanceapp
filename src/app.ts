import express from "express";
import { User } from "./models/User";
import { up } from "./migration";
import sequelize from "./models";
import { Op } from "sequelize";

const app = express();
app.use(express.json());

app.post("/user/:id/balance", async (req, res) => {
	const { id } = req.params;
	const { amount } = req.body;

	try {
		// Perform a conditional update directly
		const result = await User.update(
			{ balance: sequelize.literal(`balance + ${amount}`) },
			{
				where: {
					id: id,
					balance: { [Op.gte]: -amount } // Ensure balance will not go below zero
				}
			}
		);

		if (result[0] > 0) {
			// result[0] is the number of affected rows
			res.send({ message: "Balance updated successfully." });
		} else {
			res.status(400).send("Insufficient balance or user not found.");
		}
	} catch (error) {
		console.error("Update error:", error);
		res.status(500).send("An unexpected error occurred.");
	}
});

export default app;

const run = async () => {
	await up();
	await User.findOrCreate({
		where: { id: 1 },
		defaults: { balance: 10000 }
	});

	app.listen(3000, () => console.log(`Server running on http://localhost:3000`));
};

run().catch(console.error);
