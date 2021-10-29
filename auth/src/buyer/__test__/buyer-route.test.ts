import { app } from "../../app";
import request from "supertest";
import { Buyer } from "../buyer-model";

describe("When signing up", () => {
  it("throws error for duplicate emails", async () => {
    const email = "test1@mail.ru";
    const password = "1234";
    const personalId = "12";
    await request(app)
      .post("/api/buyer")
      .send({ email, password, personalId })
      .expect(201);

    const response = await request(app)
      .post("/api/buyer")
      .send({ email, password, personalId })
      .expect(400);

    expect(response.text).toBe("email already exists");
  });

  it("saves user in the database", async () => {
    const email = "test1@mail.ru";
    const password = "1234";
    const personalId = "12";
    const response = await request(app)
      .post("/api/buyer")
      .send({ email, password, personalId })
      .expect(201);

    const buyer = await Buyer.findById(response.body._id);

    expect(buyer).toBeDefined();
  });
});
