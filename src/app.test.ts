import request from "supertest";
import app from "./app"; // Import the Express application
import { User } from "./models/User";

const runTestRequests = async () => {
	const results = [];
	for (let i = 0; i < 10000; i++) {
		results.push(request(app).post("/user/1/balance").send({ amount: -2 }));
	}
	return Promise.allSettled(results);
};

describe("Concurrent balance updates", () => {
	beforeAll(async () => {
		await User.findOrCreate({
			where: { id: 1 },
			defaults: { balance: 10000 }
		});
	});

	test("should handle 10,000 concurrent requests correctly", async () => {
		const responses = await runTestRequests();
		const successResponses = responses.filter(
			(res) => res.status === "fulfilled" && res.value.status === 200
		).length;
		const errorResponses = responses.filter(
			(res) => res.status === "fulfilled" && res.value.status === 400
		).length;
		const internal = responses.filter(
			(res) => res.status === "fulfilled" && res.value.status === 500
		).length;

		console.log(`Success responses: ${successResponses}`);
		console.log(`error responses: ${errorResponses}`);
		console.log(`internal responses: ${internal}`);

		expect(successResponses).toBeGreaterThanOrEqual(5000);
		expect(errorResponses).toBeGreaterThanOrEqual(5000);
		expect(successResponses + errorResponses).toEqual(10000);
	}, 30000); // Increase timeout as this might take longer
});
