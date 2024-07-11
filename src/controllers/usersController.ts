import { Request, Response } from "express";
import { User } from "../models/User.js";
import { Op } from "sequelize";

export const updateBalance = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { amount } = req.body;

	if (typeof amount !== "number" || isNaN(amount)) {
		return res.status(400).send("Invalid amount.");
	}

	try {
		const user = await User.findByPk(id);
		if (!user) {
			return res.status(404).send("User not found.");
		}

		const updatedUser = await user.increment("balance", {
			by: amount,
			where: { balance: { [Op.gte]: -amount } }
		});
		// I couldn't make it to return error if increment method hasn't executed
		// when i run test with 10000 concurrent requests, all of them return success
		// even if half of them doesn't satisfy increment's where clause
		res.send({ message: "Balance updated successfully.", balance: updatedUser.balance });
	} catch (error) {
		console.error("Update error:", error);
		res.status(500).send("An unexpected error occurred.");
	}
};
